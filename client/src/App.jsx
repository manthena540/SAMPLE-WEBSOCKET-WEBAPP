import { useState } from 'react'
import { Login } from './componets/login'
import { Home } from './componets/Home'
import './App.css'

function App() {
   const [username,setUsername] = useState("")

   return username ?(
    <Home username={username}/>
   ):(
    <Login  onSubmit={setUsername}/>

   )

 
}

export default App
