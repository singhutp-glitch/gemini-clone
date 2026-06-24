import { searchWeb } from "./searchService.js";
import { buildSearchPrompt } from "./promptBuilder.js";

export async function buildContent(prompt,messages,options){

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
        if(options.webSearch){
            const searchResults = await searchWeb(prompt);
            const finalPrompt = buildSearchPrompt(prompt,searchResults);
            contents[contents.length-1] = {
                role:"user",

                parts: [
                    {
                        text:finalPrompt,
                    },],
                }
        }
        return contents
}