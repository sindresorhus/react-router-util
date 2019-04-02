/* eslint-disable no-unused-vars, import/no-unassigned-import, unicorn/import-index */
import test from 'ava';
import React from 'react';
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
			<App />
		</BrowserRouter>
	);

	const wrapper = render(<BrowserComponent />);
	t.true(wrapper.text().includes('HOME'));
	t.false(wrapper.text().includes('ABOUT'));
});
