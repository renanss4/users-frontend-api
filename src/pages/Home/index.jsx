import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef(null);
  const inputAge = useRef(null);
  const inputEmail = useRef(null);

  async function getUsers() {
    const usersFromApi = await api.get("/users")
    setUsers(usersFromApi.data)
  }

  async function createUsers() {
    await api.post("/users", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    getUsers()
  }

  async function deleteUser(id) {
    await api.delete(`/users/${id}`)
    getUsers()
  }

  useEffect(() => { getUsers() }, [])

  return (
    <>
      <div className="container">
        <div>
          <h1>
            <form>
              <h1>Cadastro de Usuários</h1>
              <input placeholder="Nome" name="nome" type="text" ref={inputName} />
              <input placeholder="Idade" name="idade" type="number" ref={inputAge} />
              <input placeholder="Email" name="email" type="email" ref={inputEmail} />
              <button type="button" onClick={createUsers}>Cadastrar</button>
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
              <img src={Trash} alt="trash-icon" onClick={() => deleteUser(user.id)} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
