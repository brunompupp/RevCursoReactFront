import React, {useEffect, useState} from 'react';
import api from '../../services/api';
import './index.css';

function Modal(props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [idade, setIdade] = useState('');

  async function loadUser(){

    const {data} = await api.get(`/usuarios/${props.idUser}`);

    if(data.status === 'sucesso'){

      let user = data.dados[0];
      setNome(user.nome);
      setEmail(user.email);
      setSenha(user.senha);
      setIdade(user.idade);

    }else{

      alert('Não foi possível carregar os dados');
      console.log(data.message);

    }

  }


  async function updateUser(){

    const {data} = await api.put(`/usuarios/${props.idUser}`, {nome,email,senha,idade});
    
    if(data.status ==="sucesso"){
      alert(data.message);
      props.carregaDados();
      props.isClose();

    }else{
      alert("Não foi possível atualizar o usuário");
      console.log(data.message);
    }


    console.log(data);

  }


  useEffect(()=>{

    if(props.idUser){
      loadUser();

    }


  }, [props.idUser])


  return (
    <div className={"modal " + props.isOpen}>

      <div className="modal-container">

        <div className="modal-header">
          <h2>Editar Bruno</h2>
        </div>

        <form className="modal-body">

          <div className="editar-inputs">
            <label htmlFor="editar-nome">Nome</label>
            <input type="text" placeholder="Nome" id="editar-nome" defaultValue={nome} onChange={e =>setNome(e.target.value)} />
          </div>

          <div className="editar-inputs">
            <label htmlFor="editar-email">Email</label>
            <input type="text" placeholder="Email" id="editar-email" defaultValue={email} onChange={e =>setEmail(e.target.value)}/>
          </div>

          <div className="editar-inputs">
            <label htmlFor="editar-senha">Senha</label>
            <input type="password" placeholder="Senha" id="editar-senha" defaultValue={senha} onChange={e =>setSenha(e.target.value)}/>
          </div>

          <div className="editar-inputs">
            <label htmlFor="editar-idade">Idade</label>
            <input type="text" placeholder="Idade" id="editar-idade" defaultValue={idade} onChange={e =>setIdade(e.target.value)}/>
          </div>


        </form>

        <div className="modal-footer">
          <button onClick={ e =>props.isClose()}>Fechar</button>
          <button onClick={updateUser}>Salvar</button>
        </div>

      </div>

    </div>
  );
}

export default Modal;