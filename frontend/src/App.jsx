import SideBar from "./components/SideBar/SideBar"
import Main from "./components/Main/Main"
import NavBar from "./components/NavBar/NavBar";
import ChatGraph from "./components/ChatGraph/ChatGraph";
import { useState ,useEffect} from "react"
import { getChats } from "./services/api";
import ChatPage from "./components/ChatPage/ChatPage";

function App() {

  return (
    <>
      <ChatPage/>
    </>
  )
}

export default App
