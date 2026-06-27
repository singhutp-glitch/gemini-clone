import { searchWeb } from "../../services/searchService";
import { SEARCH_PROMPT } from "../../prompts/searchPrompts";

const  webSearchFeature = {
    name:'webSearch',

    shouldRun(context){
        return context.options.webSearch;
    },

    async execute(context){
        context.stream.write('Searching...');
        const searchResults = await searchWeb(context.userPrompt);
        context.searchResults = searchResults;

        const sources = searchResults.results.map((result,index)=>{
                    return {
                        title:result.title,
                        url:result.url
                    }
                });
        context.searchSources = sources;
        context.execution.request.instructions.webSearch = SEARCH_PROMPT;
        
    }
}