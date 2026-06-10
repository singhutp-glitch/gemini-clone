import React from 'react'
import './Main.css'
import {assets} from '../../assets/assets.js'
import { useState } from 'react'
import { sendMessage } from '../../services/api.js'
const Main = () => {
    const [prompt,setPrompt] = useState('');
    const [response,setResponse] = useState('');

    const handleSend = async () => {
        if(!prompt.trim()) return;
        const data = await sendMessage(prompt);
        console.log(data.reply);
        setResponse(data.reply);
        setPrompt('');
    }
  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
        </div>
        <div className="main-container">
          {response===""? (<><div className="greet">
                <p><span>Hello, Dev</span></p>
                <p>How can i help you ?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful places to see on upcoming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Explain this concept of urban planning</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Brainstorm some ideas for upcoming tean project</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Improve the readability of the following code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div></>): <div className='response'>{response}</div>}
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