import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';


import Login from './pages/login';
import Painel from './pages/dashboard';



export default function Routes(){

	return(
		<BrowserRouter>

			<Switch>

					<Route path="/" exact component={Login}/>
					<Route path="/painel" exact component={Painel}/>

			</Switch>
		
		</BrowserRouter>
	)

}