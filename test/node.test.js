/* eslint-disable no-unused-vars, unicorn/import-index */
import test from 'ava';
import React from 'react';
import {render} from 'enzyme';
import {App} from './fixtures/app';

test.beforeEach(() => {
	delete global.window;
	delete global.document;
	delete global.navigator;
});

test('creates a memory history', t => {
	const {history} = require('../index');
	t.true('index' in history);
	t.true('entries' in history);
});

test('renders a StaticRouter', t => {
	const {StaticRouter} = require('../index');
	const ServerComponent = props => (
		<StaticRouter {...props}>
			<App />
		</StaticRouter>
	);

	const context = {};
	const wrapper = render(<ServerComponent location="/" context={context} />);
	t.true(wrapper.text().includes('HOME'));
	t.false(wrapper.text().includes('ABOUT'));
});
