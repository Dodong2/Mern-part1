import './App.css'

import { useState, useEffect } from 'react'
import Axios from 'axios'

function App() {
  const [userlists, setUserlists] = useState([])
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [username, setUsername] = useState('')

//logics
  useEffect(() => {
    Axios.get('http://localhost:3001/getUsers').then((res) => {
      setUserlists(res.data)
    })
  }, [])

  const createUser = () => {
    Axios.post('http://localhost:3001/createUser', { name: name, age: age, username: username }).then((res) => {
      setUserlists([ ...userlists, {name, age, username} ])
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
          </div>
        ))}
        </div><br/>

        <div>
        <form onSubmit={createUser}>
          <input type='text' onChange={(e) => setName(e.target.value)} placeholder='Name' required/>
          <input type='text' onChange={(e) => setAge(e.target.value)} placeholder='Age' required/>
          <input type='text' onChange={(e) => setUsername(e.target.value)} placeholder='Username' required/>
          <button type='submit'>Submit</button>
          </form>
        </div>

      </div>
    </>
  )
}

export default App
