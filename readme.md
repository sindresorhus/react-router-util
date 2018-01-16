# react-router-util [![Build Status](https://travis-ci.org/sindresorhus/react-router-util.svg?branch=master)](https://travis-ci.org/sindresorhus/react-router-util)

> Various useful utilities for working with [React Router](https://github.com/ReactTraining/react-router)


## Install

```
$ npm install react-router-util
```


## Usage

```js
import {ipcRenderer as ipc} from 'electron';
import React from 'react';
import {Route, Link} from 'react-router-dom';
import {history, BrowserRouter as Router, Debug} from 'react-router-util';

ipc.on('goto-about', () => {
	history.push('/about');
});

const App = () => (
	<Router>
		<>
			<Debug/>

			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/about">About</Link></li>
			</ul>

			<hr/>

			<Route exact path="/" component={Home}/>
			<Route path="/about" component={About}/>
		</>
	</Router>
)
```


## API

### `history`

A [`history`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/history.md) singleton that you can use in `<Router history={history}>` to access the history from outside the router. Can be useful for progammatically navigating to a route when used in combination with non-React code, like Electron IPC events, etc.

### `<BrowserRouter>`

Same as the official `<BrowserRouter>`, but with `history={history}` set to the above `history` singleton, so you can just import the singleton to access the router `history` object from outside the router.

### `<CurrentRoute/>`

React component that renders the pathname of the current route. For example: `/dashboard`.

### `<Debug/>`

Unrendered React component that prints the `props` of the current route component to the console when not in production.

### `<RouteWithProps/>`

Like [`<Route/>`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/Route.md), but passes additional props to the given `component`. The following props are passed to the route: `path`, `component`, `exact`, `strict`, `location`, `sensitive`, while the rest are passed to the `component`.

Before:

```jsx
<Route path="/unicorn" render={props => <Unicorn {...props} foo={'cake'} bar/>}/>
```

After:

```jsx
<Route path="/unicorn" component={Unicorn} foo={'cake'} bar/>
```

### `<BackLink>`

Like [`<Link>`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md), but navigates to the previous route in the history. Accepts any props `<Link>` supports except for `to`.

### `<ForwardLink>`

Like [`<Link>`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md), but navigates to the next route in the history. Accepts any props `<Link>` supports except for `to`.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
