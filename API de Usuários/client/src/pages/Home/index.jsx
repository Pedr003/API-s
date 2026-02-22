import { useEffect, useState, useRef } from 'react'
import './style.css'
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])
  const [userEdit, setUserEdit] = useState(null)

  const [inputs, setInputs] = useState({
    nome: '',
    idade: '',
    email: ''
  })

  function handleChange(e) {
    const { name, value } = e.target
    setInputs(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // POST - Criar novo usuário 
  async function createUser() {
    await api.post('/users', inputs)

    getUsers()

    setInputs({
      nome: '',
      idade: '',
      email: ''
    })
  }

  // GET - Listar todos os usuários
  async function getUsers() {
    const response = await api.get('/users')
    setUsers(response.data)
  }

  // PUT - Atualizar usuário
  async function updateUser() {
    if (!userEdit) return

    await api.put(`/users/${userEdit.id}`, {
      nome: userEdit.nome,
      idade: userEdit.idade,
      email: userEdit.email
    })

    setUserEdit(null)
    getUsers()
  }


  // DELETE - Deletar usuário (confirmação dupla)
  async function deleteUser(id) {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este usuário?")

    if (!confirmDelete) {
      return
    }

    await api.delete(`/users/${id}`)
    getUsers()
  }

  // Fazer ao atualizar pagina
  useEffect(() => {
    getUsers()
  }, [])

  // Ao abrir userEdit trava scroll
  useEffect(() => {
    if (userEdit) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [userEdit])

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>

        {/* Nome */}
        <div className="user-pass">
          <input type="text" name="nome" placeholder="Nome" required value={inputs.nome} onChange={handleChange} />
          <i className="input-icon bx bx-user"></i>
        </div>

        {/* Idade */}
        <div className="user-pass">
          <input type="number" name="idade" placeholder="Idade" min="0" required value={inputs.idade} onChange={handleChange} />
          <i className="input-icon bx bx-calendar"></i>
        </div>

        {/* Email */}
        <div className="user-pass">
          <input type="email" name="email" placeholder="Email" required value={inputs.email} onChange={handleChange} />
          <i className="input-icon bx bx-envelope"></i>
        </div>

        <button type="button" onClick={createUser}>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>ID:    <span>{user.id}</span></p>
            <p>Nome:  <span>{user.nome}</span></p>
            <p>Idade: <span>{user.idade}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <div className='actions'>
            <span className='line'></span>
            <div className='options'>
              <button className='btn-edit' onClick={() => setUserEdit({ id: user.id, nome: user.nome, email: user.email, idade: user.idade })}>
                <i className='bx bx-pencil'></i>
              </button>
              <button className='btn-delete' onClick={() => deleteUser(user.id)}>
                <i className="bx bx-trash"></i>
              </button>
            </div>
          </div>
        </div>
      ))}

      {userEdit && (
        <div className="bg-blur">
          <div className="box-float">
            <div className='header-edit'>
              <h2>Editar Usuário</h2>
              <button className='close' onClick={() => setUserEdit(null)}>
                <i className='bx bx-x'></i>
              </button>
            </div>
            {/* Id */}
            <p>ID: <span>{userEdit.id}</span></p>

            <div className='box-edit'>
              {/* Nome */}
              <div className="user-edit">
                <p>Nome: </p>
                <input type="text" placeholder="Nome" required value={userEdit.nome}
                  onChange={e => setUserEdit({ ...userEdit, nome: e.target.value })}
                />
              </div>

              {/* Idade */}
              <div className="user-edit">
                <p>Idade: </p>
                <input type="number" placeholder="Idade" required value={userEdit.idade}
                  onChange={e => setUserEdit({ ...userEdit, idade: e.target.value })}
                />
              </div>

              {/* Email */}
              <div className="user-edit">
                <p>Email: </p>
                <input type="email" placeholder="Email" required value={userEdit.email}
                  onChange={e => setUserEdit({ ...userEdit, email: e.target.value })}
                />
              </div>
              <button className='confirm-edit' onClick={updateUser}>
                Salvar
                <i class='bx bxs-save'></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
