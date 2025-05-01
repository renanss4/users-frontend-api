import { useEffect } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

function Home() {
  let users = []

  // TODO: Criar função para cadastrar usuário 
  async function getUsers() {
    users = await api.get("/users")
  }

  useEffect(()=> {getUsers()}, [])

  return (
    <>
      <div className="container">
        <div>
          <h1>
            <form>
              <h1>Cadastro de Usuários</h1>
              <input placeholder="Nome" name="nome" type="text" />
              <input placeholder="Idade" name="idade" type="number" />
              <input placeholder="Email" name="email" type="email" />
              <button type="button">Cadastrar</button>
            </form>
          </h1>
        </div>

        {users.map((user) => (
          <div key={user.id} className="card">
            <div>
              <p>
                Nome: <span>{user.name}</span>
              </p>
              <p>
                Idade: <span>{user.age}</span>
              </p>
              <p>
                Email: <span>{user.email}</span>
              </p>
            </div>

            <button>
              <img src={Trash} alt="trash-icon" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
