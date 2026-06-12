import SideBar from "./components/SideBar/SideBar"
import Main from "./components/Main/Main"
import { useState ,useEffect} from "react"
import { getChats } from "./services/api";

function App() {
  const [newChatTrigger,setNewChatTrigger] = useState(0);
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
     <SideBar setNewChatTrigger={setNewChatTrigger} chats = {chats} 
     setChats = {setChats} currentChatId = {currentChatId}
     setCurrentChatId = {setCurrentChatId}/>

     <Main key = {newChatTrigger} currentChatId = {currentChatId}
     setCurrentChatId = {setCurrentChatId} loadChats={loadChats}/>
    </>
  )
}

export default App
