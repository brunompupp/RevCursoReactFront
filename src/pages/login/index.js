import React from 'react';
import {Link} from 'react-router-dom';


import './index.css';

function login() {
	return (

		<>
		
			<div className="login-container">
				<div className="container">
					<div className="logo">
						<h1 className="logotipo">Minha API</h1>
					</div>
					<Link to="/painel" className="btn-acessar">Acessar</Link>
				</div>
			</div>
		
		</>

	);
}

export default login;