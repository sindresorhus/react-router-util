import React from 'react';
import {Route, Routes} from 'react-router-dom';

export function App() {
	return (
		<Routes>
			<Route path='/' element={<div>HOME</div>}/>
			<Route path='/about' element={<div>ABOUT</div>}/>
		</Routes>
	);
}

export function Login() {
	return (
		<Routes>
			<Route path='/login' element={<div>LOGIN</div>}/>
		</Routes>
	);
}

export function DashboardMain() {
	return (
		<Routes>
			<Route path='/dashboard/main' element={<div>DASHBOARD MAIN</div>}/>
		</Routes>
	);
}

export function DashboardLogin() {
	return (
		<Routes>
			<Route path='/dashboard/login' element={<div>DASHBOARD LOGIN</div>}/>
		</Routes>
	);
}
