/* eslint-disable no-unused-vars */
import React from 'react';
import {Route} from 'react-router-dom';

export const App = () => (
	<React.Fragment>
		<Route exact path="/" component={() => <div>HOME</div>}/>
		<Route path="/about" component={() => <div>ABOUT</div>}/>
	</React.Fragment>
);
