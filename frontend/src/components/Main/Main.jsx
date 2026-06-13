import React, { useEffect } from 'react'
import './Main.css'
import {assets} from '../../assets/assets.js'
import { useState } from 'react'
import { streamMessage } from '../../services/api.js'
import { createNewChatId } from '../../services/api.js'
import { getMessages } from '../../services/api.js'
import ChatContainer from '../ChatContainer/ChatContainer.jsx'
import Greet from './Greet.jsx'

const Main = ({currentChatId,setCurrentChatId,loadChats,messages,setMessages}) => {
    const [prompt,setPrompt] = useState('');

    const handleSend = async () => {
    if (!prompt.trim()) return;
    const currentPrompt = prompt;
    setPrompt("");

    setMessages(prev => [
        ...prev,
        {
            role: "user",
            content: currentPrompt,
        },
        {
            role: "assistant",
            content: "",
            loading: true
        },
    ]);

    try {

        let chatId = currentChatId;

        if (chatId === null) {

            chatId =
                await createNewChatId(
                    currentPrompt
                );
            loadChats();

            setCurrentChatId(chatId);
        }
        let accumulated = "";

        await streamMessage(
            chatId,
            currentPrompt,
            chunk => {

                accumulated += chunk;

                setMessages(prev => {

                    const updated = [...prev];

                    updated[
                        updated.length - 1
                    ] = {
                        ...updated[
                            updated.length - 1
                        ],
                        content: accumulated,
                        loading: false,
                    };

                    return updated;
                });
            }
        );
        

    } catch (error) {
        console.error(error);
    }
};

  return (
    <div className='main'>
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