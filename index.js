/* eslint-disable no-unused-vars */
import React from 'react';
import {BrowserRouter as OriginalBrowserRouter, Route, Link, withRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory();

export class BrowserRouter extends OriginalBrowserRouter {
	constructor(...args) {
		super(...args);
		this.history = history;
	}
}

class DebugComponent extends React.Component {
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
export const Debug = withRouter(DebugComponent);

export const CurrentRoute = withRouter(props => props.location.pathname);

export const RouteWithProps = ({path, exact, strict, location, sensitive, component: Component, ...rest}) => (
	<Route
		path={path}
		exact={exact}
		strict={strict}
		location={location}
		sensitive={sensitive}
		render={props => <Component {...props} {...rest}/>}
	/>
);

export const BackLink = withRouter(({history, children, ...rest}) => {
	const navigate = event => {
		event.preventDefault();
		history.goBack();
	};

	return <Link to="" onClick={navigate} {...rest}>{children}</Link>;
});

export const ForwardLink = withRouter(({history, children, ...rest}) => {
	const navigate = event => {
		event.preventDefault();
		history.goForward();
	};

	return <Link to="" onClick={navigate} {...rest}>{children}</Link>;
});
