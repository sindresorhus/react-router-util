import test from 'ava';
import React from 'react';
import {Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {render} from 'enzyme';
import {App} from './fixtures/app';

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

test('passes custom history object', t => {
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
	console.log(wrapper.text());
	t.true(wrapper.text().includes('42'));
});
