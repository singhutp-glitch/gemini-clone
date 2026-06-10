import React from 'react'
import './Main.css'
import {assets} from '../../assets/assets.js'
import { useState } from 'react'
import { sendMessage } from '../../services/api.js'
import ChatContainer from '../ChatContainer/ChatContainer.jsx'
import Greet from './Greet.jsx'

const Main = () => {
    const [prompt,setPrompt] = useState('');
    const [messages,setMessages] = useState([])

    const handleSend = async () => {
        if(!prompt.trim()) return;

        const currentPrompt = prompt;
        setPrompt('');
        setMessages(prev => [...prev,
            {
                role:'user',
                content:currentPrompt
            },
            {
                role:'assistant',
                content:"",
                loading:true
            }])

        const data = await sendMessage(currentPrompt);
        console.log(data.reply);
        setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = {
                role:'assistant',
                content:data.reply,
                loading:false
            }
            return updated;
    })
        
    }
  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
        </div>
        <div className="main-container">
          {messages.length === 0? <Greet/>: <ChatContainer messages = {messages}/>}
        </div> 
        <div className="bottom">
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>{setPrompt(e.target.value)}} onKeyDown={(e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    }}type="text" placeholder='Enter your prompt' value={prompt}/>
                    <div>
                        <img onClick={handleSend} src={assets.send_icon} alt="" />
                    </div>
                </div>
                <div className="bottom-info">
                    Gemini may display inaccurate info, so double check its responses.
                </div>
            </div>
        </div>
    </div>
  )
}

export default Main