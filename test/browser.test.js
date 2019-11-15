import test from 'ava';
import React from 'react';
import {Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {render, mount} from 'enzyme';
import {App, Login} from './fixtures/app';

test('creates a browser history', t => {
	const {history} = require('../index');
	t.false('index' in history);
	t.false('entries' in history);
});

test('renders a BrowserRouter', t => {
	const {BrowserRouter} = require('../index');
	const BrowserComponent = props => (
		<BrowserRouter {...props}>
			<App/>
		</BrowserRouter>
	);

	const wrapper = render(<BrowserComponent/>);
	t.true(wrapper.text().includes('HOME'));
	t.false(wrapper.text().includes('ABOUT'));
});

test('accepts custom history object', t => {
	const {BrowserRouter} = require('../index');
	const history = createBrowserHistory();
	history.unicorn = 42;
	const BrowserComponent = props => (
		<BrowserRouter {...props}>
			<div>
				<Route path="/" render={({history: innerHistory}) => <>{innerHistory.unicorn}</>}/>
			</div>
		</BrowserRouter>
	);

	const wrapper = render(<BrowserComponent history={history}/>);
	t.true(wrapper.text().includes('42'));
});

test('allows access to specified path if authenticated', t => {
	const {BrowserRouter, AuthenticatedRoute, history} = require('../');
	history.location.pathname = '/about';
	const BrowserComponent = props => (
		<BrowserRouter {...props}>
			<div>
				<AuthenticatedRoute
					exact
					isAuthenticated
					path="/about"
					component={App}
				/>
				<Login/>
			</div>
		</BrowserRouter>
	);

	const wrapper = mount(<BrowserComponent history={history}/>);

	t.true(wrapper.text().includes('ABOUT'));
});

test('redirects to /login if not authenticated', t => {
	const {BrowserRouter, AuthenticatedRoute, history} = require('../');
	history.location.pathname = '/test';
	const BrowserComponent = props => (
		<BrowserRouter {...props}>
			<div>
				<AuthenticatedRoute
					exact
					path="/"
					isAuthenticated={false}
					component={App}
				/>
				<Login/>
			</div>
		</BrowserRouter>
	);

	const wrapper = mount(<BrowserComponent history={history}/>);

	t.true(wrapper.text().includes('LOGIN'));
});

test('AuthenticatedRoute works for nested routes', t => {
	const {BrowserRouter, AuthenticatedRoute, history} = require('../');
	history.location.pathname = '/dashboard/test';
	const BrowserComponent = props => (
		<BrowserRouter {...props}>
			<div>
				<AuthenticatedRoute
					exact
					path="/dashboard/:dashboardParams"
					isAuthenticated={false}
					component={App}
				/>
				<Login/>
			</div>
		</BrowserRouter>
	);

	const wrapper = mount(<BrowserComponent history={history}/>);

	t.true(wrapper.text().includes('LOGIN'));
});
