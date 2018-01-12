'use strict';
const React = require('react');
const {BrowserRouter, withRouter} = require('react-router-dom');
const {createBrowserHistory} = require('history');

const history = createBrowserHistory();
module.exports.history = history;

module.exports.BrowserRouter = class extends BrowserRouter {
	constructor(...args) {
		super(...args);
		this.history = history;
	}
};

class Debug extends React.Component {
	componentDidUpdate() {
		if (process && process.env && process.env.NODE_ENV === 'production') {
			return;
		}

		console.log('Route:', this.props.location.pathname, this.props);
	}

	render() {
		return null;
	}
}
module.exports.Debug = withRouter(Debug);

class CurrentRoute extends React.Component {
	render() {
		return this.props.location.pathname;
	}
}
module.exports.CurrentRoute = withRouter(CurrentRoute);
