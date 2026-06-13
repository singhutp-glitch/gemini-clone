import SideBar from "./components/SideBar/SideBar"
import Main from "./components/Main/Main"
import NavBar from "./components/NavBar/NavBar";
import ChatGraph from "./components/ChatGraph/ChatGraph";
import { useState ,useEffect} from "react"
import { getChats } from "./services/api";

function App() {
  const [chats,setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages,setMessages] = useState([])
  const [graphMode,setGraphMode] = useState(false);

  async function loadChats(){
    const userChats = await getChats();
    setChats(userChats);
  };

  useEffect(() => {
    loadChats();

  }, []);



  return (
    <>
     <SideBar chats = {chats} setChats = {setChats} setMessages={setMessages}
     currentChatId = {currentChatId} setCurrentChatId = {setCurrentChatId}/>
     <div className="nav-main-section">
       <NavBar setGraphMode={setGraphMode}/>
       {graphMode?<ChatGraph messages = {messages}/>:<Main currentChatId = {currentChatId} setCurrentChatId = {setCurrentChatId}
       loadChats={loadChats} messages={messages} setMessages={setMessages}
       setGraphMode = {setGraphMode}/>}
     </div>
           </>
  )
}

export default App
