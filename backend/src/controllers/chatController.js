import { generateResponse } from "../services/geminiService.js";


const sendMessage = async (req,res) => {
    try{
        const prompt = req.body.message;
        if(!prompt?.trim()){
            return res.status(500).json({
                error:'Prompt is required'
            })
        }

        const reply = await generateResponse(prompt);
        
        res.json({
            reply,
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            error:'Failed to generate response'
        })
    }
};

export default {
    sendMessage
}