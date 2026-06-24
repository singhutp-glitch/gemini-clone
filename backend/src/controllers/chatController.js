import { generateResponseStream } from "../services/geminiService.js";
import { saveMessages } from "../services/databaseService.js";
import { createNewChat } from "../services/databaseService.js";
import { loadMessages } from "../services/databaseService.js";
import { searchChatIdwithUserId } from "../services/databaseService.js";
import { loadChats } from "../services/databaseService.js";
import { buildContext } from "../services/chatContextBuilder.js";
const sendMessage = async (req,res) => {
    try{
        const prompt = req.body.message;
        const webSearch = req.body.webSearch;
        const chatId = +req.params.chatId;
        
        if(!prompt?.trim()){
            return res.status(400).json({
                error:'Prompt is required'
            })
        }
        const userChat = await searchChatIdwithUserId(req.user.userId,chatId);
        if(!userChat){
            return res.status(404).json({
                error:'Chat not found'
            })
        };

            await saveMessages(
            chatId,
            "user",
            prompt
        );

        const messages = await loadMessages(chatId);

        const {contents,sources} = await buildContext(prompt,messages,{webSearch});
       console.log('content:\n',contents);
       console.log('sources:\n',sources);
        const stream =
            await generateResponseStream(
                contents
            );

        let fullResponse = "";

        for await (const chunk of stream) {

            const text =
                chunk.text || "";

            fullResponse += text;

            res.write(text);
        }
        await saveMessages(
            chatId,
            "assistant",
            fullResponse
        );

        res.end();
                
    }catch(error){
        console.error(error);
        res.status(500).json({
            error:'Failed to generate response'
        })
    }
};

const createChatPost = async(req,res) => {
    try{
        const prompt = req.body.message;
        if(!prompt?.trim()){
            return res.status(500).json({
                error:'Prompt is required'
            })
        };
        
        const chat = await createNewChat(req.user.userId,prompt);
        return res.json({
            chatId:chat.id
        });
        
    }catch(error){
        console.error(error);
        res.status(500).json({
            error:'Failed to create new chat'
        })
    }
}

const loadChatsGet = async (req,res) => {
    try{
        const userChats = await loadChats(req.user.userId);
        return res.json(userChats);

    }catch(error){
        console.error(error);
        res.status(500).json({
            error:'Failed to load chats'
        })
    }
};

const loadMessagesGet = async (req,res) => {
    try{
        const chatId = +req.params.chatId;

        const userChat = await searchChatIdwithUserId(req.user.userId,chatId);
        if(!userChat){
            return res.status(404).json({
                error:'Chat not found'
            })
        };
        const messages = await loadMessages(chatId);
        return res.json(messages);

    }catch(error){
        console.error(error);
        res.status(500).json({
            error:'Failed to load messages'
        })
    }
};

export default {
    sendMessage,
    createChatPost,
    loadChatsGet,
    loadMessagesGet
}