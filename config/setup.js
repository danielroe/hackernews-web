const { join } = require('path');
const webpack = require('webpack');
const ExtractText = require('extract-text-webpack-plugin');
const SWPrecache = require('sw-precache-webpack-plugin');
const Clean = require('clean-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const HTML = require('html-webpack-plugin');
const OfflineHTML = require('./sw-html');

const uglify = require('./uglify');
const babel = require('./babel');

const root = join(__dirname, '..');

module.exports = isProd => {
	// base plugins array
	const plugins = [
		new Clean(['dist'], { root }),
		new OfflineHTML(),
		new HTML({
			filename: '../view.html',
			template: 'src/index.html'
		}),
		new Copy([
			{ context: 'src/static/', from: '**/*.*' },
			{ context: 'src/server/', from: '**/*', to: '../' }
		]),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development')
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				babel,
				postcss: [
					require('autoprefixer')({ browsers: ['last 3 version'] })
				]
			}
		})
	];

	if (isProd) {
		babel.presets.push('babili');

		plugins.push(
			new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
			new webpack.optimize.UglifyJsPlugin(uglify),
			new ExtractText('styles.[hash].css'),
			new SWPrecache({
				minify: true,
				filename: 'sw.js',
				stripPrefix: 'dist',
				dontCacheBustUrlsMatching: /./,
				staticFileGlobs: ['dist/static/**'],
				navigateFallback: '/static/index.html',
				staticFileGlobsIgnorePatterns: [/\.map$/]
			})
		);
	} else {
		// dev only
		plugins.push(
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin()
		);
	}

	return plugins;
};
