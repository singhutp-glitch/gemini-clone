import { tavily } from "@tavily/core";
//import 'dotenv/config';

const tvly = tavily({ apiKey:process.env.TAVILY_API_KEY });

export async function searchWeb(query){
    try{
        console.log("search used");
        const response = await tvly.search(query);
        return response;
    }catch(error){
        console.error(error);
    }
};