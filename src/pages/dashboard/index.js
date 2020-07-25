import React,{useEffect, useState} from 'react';

import api from '../../services/api';
import Form from '../../components/Form';
import Modal from '../../components/Modal';
import { FiTrash2, FiEdit, FiPlusCircle } from "react-icons/fi";

import './index.css';


function Dashboard() {

	const [users, setUsers] = useState([]);
	const [isOpen, setIsOpen] = useState('');
	const [userId, setUserId] = useState('');
	const [addUser, setAddUser] = useState('');

	//const [username, setUsername] = useState('');

	async function loadDados(){

		const response = await api.get('/usuarios');
		//console.log(response.data);

		if(response.data.status === 'sucesso'){
			if(response.data.dados.length > 0){
				setUsers(response.data.dados)
				//console.log(response.data.dados)
			}
			
		}else{
			//console.log(response.data.message)
		}
	}


	async function deleteUsuario(e,id){
		e.preventDefault();
		const {data} = await api.delete(`/usuarios/${id}`);

		if(data.status === 'sucesso'){
			alert(data.message);
			loadDados();
		}else{
			alert('Não foi possível deletar usuário')
			console.log(data.message);
		}


	}

	function editarUsuario(e, id){
		e.preventDefault();
		toggle(id);
		console.log(id);
	}

	function toggle(id){
		
		if(!isOpen){
			setIsOpen('open');
			setUserId(id);

		}else{
			setIsOpen('');
			setUserId('');
		}
	}


	function toggleUser(){
		if(!addUser){
			setAddUser('open');
		}else{
			setAddUser('');
		}
	}

	useEffect(()=>{
		
		loadDados();

	},[])


	return (
		<>
			<div className="painel-container">
				<div className="container">

					<header>
						<h1>Lista de usuarios</h1>
						<button className="addUser" onClick={e => toggleUser()}>
							<FiPlusCircle/>
							<span>Usuário</span>
						</button>
					</header>

					<main className="lista">

						{users.map(user=>(

							<ul className="usuario" key={user.id}>
								<button type="button" onClick={e => deleteUsuario(e, user.id)}>
									<FiTrash2/>
								</button>

								<button type="button" onClick={e => editarUsuario(e, user.id)}>
									<FiEdit/>
								</button>
								<li>
									<span>Nome:</span>
									<span>{user.nome}</span>
								</li>

								<li>
								<span>email:</span>
									<span>{user.email}</span>
								</li>

								<li>
								<span>senha:</span>
									<span>{user.senha}</span>
								</li>

								<li>
								<span>Idade:</span>
									<span>{user.idade}</span>
								</li>

						</ul>


						))}
						
					</main>
				</div>
			</div>
			<Form carregaDados={()=>loadDados()} isOpen={addUser} isClose={()=>toggleUser()}/>

			<Modal isOpen={isOpen} isClose={()=>toggle()} idUser={userId} carregaDados={()=>loadDados()}/>
		</>
	);
}

export default Dashboard;