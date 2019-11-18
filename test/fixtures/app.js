import React from 'react';
import {Route} from 'react-router-dom';

export const App = () => (
	<>
		<Route exact path="/" component={() => <div>HOME</div>}/>
		<Route path="/about" component={() => <div>ABOUT</div>}/>
	</>
);

export const Login = () => (
	<Route exact path="/login" component={() => <div>LOGIN</div>}/>
);

export const DashboardMain = () => (
	<Route exact path="/dashboard/main" component={() => <div>DASHBOARD MAIN</div>}/>
);

export const DashboardLogin = () => (
	<Route exact path="/dashboard/login" component={() => <div>DASHBOARD LOGIN</div>}/>
);
