import React, { useEffect, useRef } from 'react'
import { assets } from '../../assets/assets'
import './ChatContainer.css'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatContainer = ({messages,selectedPairIndex,sources}) => {
  const pairRefs = useRef([]);
  useEffect(() => {

    if(
        selectedPairIndex === null
    ) return;

    pairRefs.current[
        selectedPairIndex
    ]?.scrollIntoView({
        behavior: "auto",
        block: "center",
    });

}, [selectedPairIndex]);
  return (
    <div className="chat-container">
      
  {messages.map((message, index) => (
    <div
      key={index}
       ref={(element)=>{pairRefs.current[index] = element;}}
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

  {(messages.length - 1 === index) &&
   sources.length > 0 && (
    <div className="sources-container">
      Sources:
      {sources.map((source, sourceIndex) => (
        <a
          key={source.url}
          className="source"
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {source.title}
        </a>
      ))}
    </div>
  )}

  {message.loading
    ? "Thinking..."
    : (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
      >
        {message.content}
      </ReactMarkdown>
    )
  }

</div>
    </div>
  ))}
</div>
  )
}

export default ChatContainer