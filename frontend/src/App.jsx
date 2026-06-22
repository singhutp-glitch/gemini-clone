import SideBar from "./components/SideBar/SideBar"
import Main from "./components/Main/Main"
import NavBar from "./components/NavBar/NavBar";
import ChatGraph from "./components/ChatGraph/ChatGraph";
import { useState ,useEffect} from "react"
import { getChats } from "./services/api";
import ChatPage from "./components/ChatPage/ChatPage";
import Register from './components/RegisterPage/RegisterPage'

function App() {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("register");

  return (
    <>
    {user?<ChatPage/>:
    authMode==='register'?<Register/>:
    ''}
    
    </>
  )
}

export default App
