import { h, render } from 'preact';
import './index.sass';

if (process.env.NODE_ENV === 'production') {
	const App = require('./views').default;
	render(<App />, document.body);

	// cache all assets if browser supports serviceworker
	if ('serviceWorker' in navigator && location.protocol === 'https:') {
		navigator.serviceWorker.register('/sw.js');
	}

	// add Google Analytics
	// (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	// (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	// m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	// })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
	// ga('create', 'UA-XXXXXXXX-X', 'auto');
	// ga('send', 'pageview');
} else {
	let elem, App;
	function init() {
		App = require('./views').default;
		elem = render(<App />, document.body, elem);
	}

	init();

	// listen for HMR
	if (module.hot) {
		module.hot.accept('./views', init);
	}
}
