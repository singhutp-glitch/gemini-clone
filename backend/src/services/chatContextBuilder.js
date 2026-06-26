import { searchWeb } from "./searchService.js";
import { buildSearchPrompt } from "./promptBuilder.js";
import { buildReasoningPrompt } from "./promptBuilder.js";

export async function buildContext(userPrompt,messages,options){
    let sources = [];
    const contents =
        messages.map(message => ({
            role:
                message.role ===
                "assistant"
                    ? "model"
                    : "user",

            parts: [
                {
                    text:
                        message.content,
                },
            ],
        }));
        if(options.webSearch && !options.reasoning){
            const searchResults = await searchWeb(userPrompt);
            const finalPrompt = buildSearchPrompt(userPrompt,searchResults);
            contents[contents.length-1] = {
                role:"user",

                parts: [
                    {
                        text:finalPrompt,
                    },],
                }
                sources = searchResults.results.map((result,index)=>{
                    return {
                        title:result.title,
                        url:result.url
                    }
                })
            
        }
        if(!options.webSearch && options.reasoning){
            const finalPrompt = buildReasoningPrompt(userPrompt);
            contents[contents.length-1] = {
                role:"user",

                parts: [
                    {
                        text:finalPrompt,
                    },],
                }
        }


        return {contents,sources}
}