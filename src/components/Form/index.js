import React,{ useState } from 'react';
import api from '../../services/api';
import {FiX} from 'react-icons/fi'
import './index.css';

function Form(props) {

  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');


  function limpaState(){
    setNome('');
    setSenha('');
    setEmail('');
    setIdade('');
  }

  async function salvarUsuario(e){
    e.preventDefault();

    const {data} = await api.post('/usuarios', {nome, email,senha,idade});

    if(data.status==='sucesso'){
      limpaState();
      props.isClose();
      props.carregaDados();
      alert(data.message)
    }else{
      alert("Não foi possível cadastrar usuário");
      console.log(data.message);
    }

  
  }



  return (
    <div className={"modal-cadastro " + props.isOpen}>

      <div className="modal-cadastro-container">
        <button className="btn-fechar" onClick={ e => {props.isClose();limpaState();}}>
          <FiX/>
        </button>
        <h2>Cadastro de Usuário</h2>

        <form onSubmit={salvarUsuario}>
          
          <div className="group-input">
            <label htmlFor="nome-usuario">Nome Usuário</label>
            <input type="text" placeholder="Nome" id="nome-usuario" defaultValue={nome} value={nome} onChange={e=>setNome(e.target.value)}/>
          </div>

          <div className="group-input">
            <label htmlFor="email-usuario">Email Usuário</label>
            <input type="text" placeholder="Email" id="email-usuario" defaultValue={email} value={email} onChange={e=>setEmail(e.target.value)}/>
          </div>

          <div className="group-input">
            <label htmlFor="senha-usuario">Senha Usuário</label>
            <input type="text" placeholder="Senha" id="senha-usuario" defaultValue={senha} value={senha} onChange={e=>setSenha(e.target.value)}/>
          </div>

          <div className="group-input">
            <label htmlFor="idade-usuario">Idade Usuário</label>
            <input type="text" placeholder="Idade" id="idade-usuario" defaultValue={idade} value={idade} onChange={e=>setIdade(e.target.value)} />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Form;