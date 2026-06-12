import SideBar from "./components/SideBar/SideBar"
import Main from "./components/Main/Main"
import { useState ,useEffect} from "react"
import { getChats } from "./services/api";

function App() {
  const [chats,setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  async function loadChats(){
    const userChats = await getChats();
    setChats(userChats);
  };

  useEffect(() => {
    loadChats();

  }, []);



  return (
    <>
     <SideBar chats = {chats} setChats = {setChats} 
     currentChatId = {currentChatId} setCurrentChatId = {setCurrentChatId}/>

     <Main currentChatId = {currentChatId}setCurrentChatId = {setCurrentChatId} 
     loadChats={loadChats}/>
    </>
  )
}

export default App
