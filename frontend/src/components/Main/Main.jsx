import React, { useEffect, useRef } from 'react'
import './Main.css'
import {assets} from '../../assets/assets.js'
import { useState } from 'react'
import { streamMessage } from '../../services/api.js'
import { createNewChatId } from '../../services/api.js'
import { getMessages } from '../../services/api.js'
import ChatContainer from '../ChatContainer/ChatContainer.jsx'
import Greet from './Greet.jsx'

const Main = ({currentChatId,setCurrentChatId,loadChats,messages,setMessages
    ,selectedPairIndex,user}) => {
    const [prompt,setPrompt] = useState('');
    const [webSearch,setWebSearch] = useState(false);
    const bottomRef = useRef(null);
    

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
            loading: true,
            sources:[]
        },
    ]);

        bottomRef.current?.scrollIntoView({
        behavior: "smooth",
    });
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
            webSearch,
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

                    bottomRef.current?.scrollIntoView({
                    behavior: "smooth",
                });
                    return updated;
                });
            },
            sources => {
                setMessages(prev => {

                    const updated = [...prev];

                    updated[updated.length - 1] = {
                        ...updated[updated.length - 1],
                        sources
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
          {messages.length === 0? <Greet user={user}/>: <ChatContainer messages = {messages}
          selectedPairIndex={selectedPairIndex}/>}
        </div> 
        <div className="bottom">
            <div className="main-bottom">
                <label className='web-search-box'>
                    Web Search
                    <input type="checkbox" checked={webSearch} 
                    onChange={(e) =>setWebSearch(e.target.checked)}/>
                </label>
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
            <div className='bottom-scroll-box' ref={bottomRef}></div>
    </div>
  )
}

export default Main