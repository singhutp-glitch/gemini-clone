import React, { useState } from 'react'
import './SideBar.css'
import {assets} from '../../assets/assets.js'
const SideBar = ({setNewChatTrigger,chats,setChats,currentChatId,setCurrentChatId}) => {
  const [extended,setExtended] = useState(false);

  const handleNewChat = () => {
    setNewChatTrigger(prev => prev+1);
  }

  return (
    <div className='side-bar'>
      <div className='top'>
        <img onClick={()=>{setExtended(prev=>!prev)}} className="menu" src={assets.menu_icon} alt="" />
      <div onClick={handleNewChat} className='new-chat'>
        <img src={assets.plus_icon} alt="" />
        {extended?<p>New Chat</p>:null}
      </div>
      {extended?
      <div className="recent">
        <p className='recent-title'>Recent</p>
        {chats.map((chat) => (
          <div key = {chat.id} className="recent-entry">
          <img src={assets.message_icon} alt="" />
          <p>{chat.title}</p>
        </div>
        ))}
        
      </div>
        :null}
      </div>
      <div className='bottom'>
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended?<p>Help</p>:null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended?<p>Activity</p>:null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended?<p>Setting</p>:null}
        </div>
      </div>
    </div>
  )
}

export default SideBar