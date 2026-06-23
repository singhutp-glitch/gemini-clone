
import { useState ,useEffect} from "react"
import ChatPage from "./components/ChatPage/ChatPage";
import Register from './components/RegisterPage/RegisterPage'
import LoginPage from "./components/LoginPage/LoginPage";
import { getUser } from "./services/authApi";


function App() {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("login");

  useEffect(() => {
  async function getUserInfo() {

    if (!localStorage.getItem("token")) {
      return;
    }

    try {
      const user = await getUser();

      setUser(user);
    } catch (error) {
      localStorage.removeItem("token");
    }
  }

  getUserInfo();
}, []);

  return (
    <>
    {user?<ChatPage  user={user}/>:
    authMode==='register'?<Register setAuthMode={setAuthMode} />:
    <LoginPage setUser={setUser} setAuthMode={setAuthMode}/>}
    
    </>
  )
}

export default App
