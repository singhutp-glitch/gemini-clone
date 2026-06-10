import React from 'react'
import { assets } from '../../assets/assets'
import './ChatContainer.css'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatContainer = ({messages}) => {
  return (
    <div className="chat-container">
  {messages.map((message, index) => (
    <div
      key={index}
      className={`message ${message.role}`}
    >
      {message.role === "assistant" && (
        <img
          src={assets.gemini_icon}
          alt=""
          className="avatar"
        />
      )}

      <div className="message-content">
        {message.loading
          ? "Thinking..."
          : <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {message.content}
</ReactMarkdown>}
      </div>
    </div>
  ))}
</div>
  )
}

export default ChatContainer