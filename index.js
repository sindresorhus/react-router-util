/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import {
	BrowserRouter as OriginalBrowserRouter,
	StaticRouter as OriginalStaticRouter,
	Route,
	Redirect,
	Link,
	withRouter
} from 'react-router-dom';
import {createBrowserHistory, createMemoryHistory} from 'history';

const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

export const history = canUseDOM ? createBrowserHistory() : createMemoryHistory();

export class BrowserRouter extends OriginalBrowserRouter {
	constructor(...args) {
		super(...args);
		this.history = history;
	}
}

export class StaticRouter extends OriginalStaticRouter {
	constructor(...args) {
		super(...args);
		this.history = history;
	}
}

class DebugComponent extends React.PureComponent {
	render() {
		if (process.env.NODE_ENV !== 'production') {
			console.log('Route:', this.props.location.pathname, this.props);
		}

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

export const AuthenticatedRoute = ({
	isAuthenticated,
	redirectTo,
	component: Component,
	loginPath = '/login',
	redirectFromLoginTo,
	...rest
}) => {
	const children = rest.children || null;

	if (!isAuthenticated) {
		// TODO: `history.location.pathname` probably doesn't work with nested routes
		const redirect = to => to === history.location.pathname.replace(/\b\/.*$/, '') ? children : <Redirect to={to}/>;

		return redirect(loginPath);
	}

	if (redirectFromLoginTo && history.location.pathname === loginPath) {
		return <Redirect to={redirectFromLoginTo}/>;
	}

	if (redirectTo) {
		return <Redirect to={redirectTo}/>;
	}

	return (
		<React.Fragment>
			{children}
			{Component && <RouteWithProps component={Component} {...rest}/>}
		</React.Fragment>
	);
};
AuthenticatedRoute.propTypes = {
	...Route.PropTypes,
	isAuthenticated: PropTypes.bool.isRequired,
	redirectTo: PropTypes.string,
	component: PropTypes.func,
	loginPath: PropTypes.string,
	children: PropTypes.node
};

export const ConditionalRoute = ({
	conditional,
	trueComponent: True,
	falseComponent: False,
	trueRedirectTo,
	falseRedirectTo,
	...rest
}) => {
	if (conditional) {
		return True ?
			<Route render={props => <True {...props}/>} {...rest}/> :
			<Route render={() => <Redirect to={trueRedirectTo}/>} {...rest}/>;
	}

	return False ?
		<Route render={props => <False {...props}/>} {...rest}/> :
		<Route render={() => <Redirect to={falseRedirectTo}/>} {...rest}/>;
};

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
