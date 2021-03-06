import cx from 'obj-str';
import { h } from 'preact';
import { Link } from 'preact-router';
import Header from 'preact-scroll-header';

const links = [
	{name: 'Top', path: '/top'},
	{name: 'New', path: '/new'},
	{name: 'Show', path: '/show'},
	{name: 'Ask', path: '/ask'},
	{name: 'Jobs', path: '/job'}
];

export default props => (
	<Header id="top" listenTo={ document.body }>
		<nav>
			{ links.map(o => (
				<Link className={ cx({ active: props.curr === o.path }) } href={ o.path } onClick={ this.update }>{ o.name }</Link>
			)) }
		</nav>
	</Header>
);
