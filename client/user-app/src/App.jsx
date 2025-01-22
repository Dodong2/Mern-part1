import './App.css'

import { useState, useEffect } from 'react'
import Axios from 'axios'

function App() {
  const [userlists, setUserlists] = useState([])
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [username, setUsername] = useState('')
  const [updateName, setUpdateName] = useState('')
  const [updateAge, setUpdateAge] = useState('')
  const [updateUsername, setUpdateUsername] = useState('')
  const [userIdToUpdate, setUserIdToUpdate] = useState('')


//logics
  useEffect(() => {
    Axios.get('http://localhost:3001/getUsers').then((res) => {
      setUserlists(res.data)
    })
  }, [])

  const createUser = () => {
    Axios.post('http://localhost:3001/createUser', { name: name, age: age, username: username }).then(() => {
      setUserlists([ ...userlists, {name, age, username} ])
    })
  }

  const updateUser = (id) => {
    Axios.put(`http://localhost:3001/updateUser/${id}`, {
      name: updateName,
      age: updateAge,
      username: updateUsername
    }).then(() => {
      const updatedUserLists = userlists.map(user =>
        user._id === id ? { ...user, name: updateName, age: updateAge, username: updateUsername } : user
      )
      setUserlists(updatedUserLists)
    }).catch ((err) => {
      console.log(err)
    })
  }

  const deleteUser = (id) => {
    Axios.post(`http://localhost:3001/deleteUser/${id}`).then(() => {
      setUserlists(userlists.filter(user => user._id !== id))
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <div className='app'>
        <div className='user-display'>
        {userlists.map((user, index) => (
          <div key={index}>
            <h1>Name: {user.name}</h1>
            <h1>age: {user.age}</h1>
            <h1>username: {user.username}</h1>
            {/* actions */}
            <button onClick={() => {
              setUserIdToUpdate(user._id)
              setUpdateName(user.name)
              setUpdateAge(user.age)
              setUpdateUsername(user.username)
            }} >edit</button>
            <button onClick={() => deleteUser(user._id)} >delete</button>
          </div>
        ))}
        </div><br/>

        {/* create form */}
        <div>
        <form onSubmit={createUser}>
          <input type='text' onChange={(e) => setName(e.target.value)} placeholder='Name' required/>
          <input type='text' onChange={(e) => setAge(e.target.value)} placeholder='Age' required/>
          <input type='text' onChange={(e) => setUsername(e.target.value)} placeholder='Username' required/>
          <button type='submit'>Submit</button>
          </form>
        </div>


        {userIdToUpdate && (
          <div>
            <h2>Update User</h2>
            <form onSubmit={(e) => {e.preventDefault(); updateUser(userIdToUpdate) }}>
              <input type='text' value={updateName} onChange={(e) => setUpdateName(e.target.value)} placeholder='Name' />
              <input type='text' value={updateAge} onChange={(e) => setUpdateAge(e.target.value)} placeholder='age' />
              <input type='text' value={updateUsername} onChange={(e) => setUpdateUsername(e.target.value)} placeholder='username' />
              <button type='submit'>update</button>
            </form>
          </div>
        )}

      </div>
    </>
  )
}

export default App
