import { tavily } from "@tavily/core";
import 'dotenv/config';

const tvly = tavily({ apiKey:process.env.TAVILY_API_KEY });

async function webSearch(query){
    try{
        const response = await tvly.search(query);
        return response;
    }catch(error){
        console.error(error);
    }
}
const result = await webSearch('who is leaoni messi');
console.log(result);

