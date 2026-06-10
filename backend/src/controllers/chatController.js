import { generateResponseStream } from "../services/geminiService.js";


const sendMessage = async (req,res) => {
    try{
        const prompt = req.body.message;
        if(!prompt?.trim()){
            return res.status(500).json({
                error:'Prompt is required'
            })
        }

        res.setHeader("Content-Type","text/plain; charset=utf-8");
        res.setHeader('Transfer-Encoding','chunked')


        const stream= await generateResponseStream(prompt);
        
        for await (const chunk of stream){
            if(chunk){
                res.write(chunk.text);
            }
        }
        res.end();
        
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