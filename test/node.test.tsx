import {test} from 'node:test';
import assert from 'node:assert';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {history, StaticRouter} from '../dist/index.js';
import {App} from './fixtures/app.js';

void test('creates a memory history', () => {
	// @ts-expect-error -- Testing deletion
	delete globalThis.window;
	// @ts-expect-error -- Testing deletion
	delete globalThis.document;
	// @ts-expect-error -- Testing deletion
	delete globalThis.navigator;

	assert.ok(history);
	assert.ok(typeof history.push === 'function');
});

void test('renders a StaticRouter', () => {
	// @ts-expect-error -- Testing deletion
	delete globalThis.window;
	// @ts-expect-error -- Testing deletion
	delete globalThis.document;
	// @ts-expect-error -- Testing deletion
	delete globalThis.navigator;

	const context = {};
	const html = renderToString(
		<StaticRouter location='/' context={context}>
			<App/>
		</StaticRouter>,
	);
	assert.ok(html.includes('HOME'));
	assert.ok(!html.includes('ABOUT'));
});
