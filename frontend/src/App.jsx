import SideBar from "./components/SideBar/SideBar"
import Main from "./components/Main/Main"
import { useState } from "react"

function App() {
  const [newChatTrigger,setNewChatTrigger] = useState(0);

  return (
    <>
     <SideBar setNewChatTrigger={setNewChatTrigger}/>
     <Main key = {newChatTrigger}/>
    </>
  )
}

export default App
