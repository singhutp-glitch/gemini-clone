import { SEARCH_PROMPT } from "../prompts/searchPrompts.js";

export function buildSearchPrompt(question,searchResults){
    const resultText = searchResults.results.map((result,index)=>
        `
Result ${index+1}
title: ${result.title}
url: ${result.url}
content: ${result.content}

    `
    ).join('\n');

    const finalPrompt = 
    `
${SEARCH_PROMPT}
Search Results: 
${resultText}
User Question: 
${question}
`

    console.log(finalPrompt);

    return finalPrompt;

}
