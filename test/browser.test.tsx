import {test} from 'node:test';
import assert from 'node:assert';
import React from 'react';
import 'global-jsdom/register';
import {Route, Routes, MemoryRouter} from 'react-router-dom';
import {render, screen, cleanup} from '@testing-library/react';
import {
	history,
	BrowserRouter,
	AuthenticatedRoute,
} from '../dist/index.js';
import {App} from './fixtures/app.js';

void test('creates a browser history', () => {
	assert.ok(!('index' in history));
	assert.ok(!('entries' in history));
});

void test('renders a BrowserRouter', () => {
	render(
		<BrowserRouter>
			<App/>
		</BrowserRouter>,
	);
	assert.ok(screen.getByText('HOME'));
	assert.ok(!screen.queryByText('ABOUT'));
	cleanup();
});

void test('history is exported', () => {
	assert.ok(history);
	assert.ok(typeof history.push === 'function');
	assert.ok(typeof history.replace === 'function');
});

void test('allows access to specified path if authenticated', () => {
	render(
		<MemoryRouter initialEntries={['/about']}>
			<Routes>
				<Route
					path='/about'
					element={
						<AuthenticatedRoute
							isAuthenticated
							path='/about'
							element={<div>AUTHENTICATED ABOUT</div>}
						/>
					}
				/>
				<Route path='/login' element={<div>LOGIN</div>}/>
			</Routes>
		</MemoryRouter>,
	);
	assert.ok(screen.getByText('AUTHENTICATED ABOUT'));
	cleanup();
});

void test('redirects to `/login` if not authenticated', () => {
	render(
		<MemoryRouter initialEntries={['/']}>
			<Routes>
				<Route
					path='/'
					element={
						<AuthenticatedRoute
							path='/'
							isAuthenticated={false}
							element={<div>PROTECTED</div>}
						/>
					}
				/>
				<Route path='/login' element={<div>LOGIN</div>}/>
			</Routes>
		</MemoryRouter>,
	);
	assert.ok(screen.getByText('LOGIN'));
	cleanup();
});

void test('AuthenticatedRoute login redirect works for nested routes', () => {
	render(
		<MemoryRouter initialEntries={['/dashboard/test']}>
			<Routes>
				<Route
					path='/dashboard/:dashboardParams'
					element={
						<AuthenticatedRoute
							path='/dashboard/:dashboardParams'
							isAuthenticated={false}
							element={<div>PROTECTED</div>}
						/>
					}
				/>
				<Route path='/login' element={<div>LOGIN</div>}/>
			</Routes>
		</MemoryRouter>,
	);
	assert.ok(screen.getByText('LOGIN'));
	cleanup();
});

void test('AuthenticatedRoute redirects to Login for nested routes in nested routing', () => {
	render(
		<MemoryRouter initialEntries={['/dashboard/main']}>
			<Routes>
				<Route
					path='/dashboard/:dashboardParams'
					element={
						<AuthenticatedRoute
							path='/dashboard/:dashboardParams'
							isAuthenticated={false}
						>
							<div>NESTED CONTENT</div>
						</AuthenticatedRoute>
					}
				/>
				<Route path='/login' element={<div>LOGIN</div>}/>
			</Routes>
		</MemoryRouter>,
	);
	assert.ok(screen.getByText('LOGIN'));
	cleanup();
});

void test('AuthenticatedRoute allows access to nested routes in nested routing', () => {
	render(
		<MemoryRouter initialEntries={['/dashboard/main']}>
			<Routes>
				<Route
					path='/dashboard/:dashboardParams'
					element={
						<AuthenticatedRoute
							isAuthenticated
							path='/dashboard/:dashboardParams'
						>
							<div>DASHBOARD MAIN</div>
						</AuthenticatedRoute>
					}
				/>
				<Route path='/login' element={<div>LOGIN</div>}/>
			</Routes>
		</MemoryRouter>,
	);
	assert.ok(screen.getByText('DASHBOARD MAIN'));
	cleanup();
});

void test('AuthenticatedRoute `matchPath` positive allows access to `loginPath` as nested route', () => {
	render(
		<MemoryRouter initialEntries={['/dashboard/login']}>
			<Routes>
				<Route
					path='/dashboard/:dashboardParams'
					element={
						<AuthenticatedRoute
							isAuthenticated={false}
							path='/dashboard/:dashboardParams'
							loginPath='/dashboard/login'
						>
							<div>DASHBOARD LOGIN</div>
						</AuthenticatedRoute>
					}
				/>
			</Routes>
		</MemoryRouter>,
	);
	assert.ok(screen.getByText('DASHBOARD LOGIN'));
	cleanup();
});
