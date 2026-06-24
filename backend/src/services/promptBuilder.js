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
Search Results: 
${resultText}
User Question: 
${question}`

    console.log(finalPrompt);

    return finalPrompt;

}
