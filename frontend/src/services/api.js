
export async function sendMessage(message)
{
    const token = localStorage.getItem('token');
    const response = await fetch(
        'http://localhost:3000/chats',
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify({
                message,
            })
        });
        return response.json();
}

export async function streamMessage(
    currentChatId,
    webSearch,
    prompt,
    onChunk,
    onSource,
    onStatus,
    onError
) {
    console.log("web search:",webSearch);
    const token = localStorage.getItem('token');
    const response = await fetch(
        `http://localhost:3000/chats/${currentChatId}/messages`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
                    Authorization:`Bearer ${token}`
            },
            body: JSON.stringify({
                message: prompt,
                webSearch,
            }),
        }
    );

    const reader =
        response.body.getReader();

    const decoder =
        new TextDecoder();
    
    let buffer = '';

    while (true) {
        const { done, value } =
            await reader.read();

        if (done) break;

        buffer +=
            decoder.decode(value);

        const lines = buffer.split('\n');
        buffer = lines.pop();

        for(const line of lines){
            if(!line.trim()) continue; 
            try{
                const data = JSON.parse(line);
                
                if(data.type === 'sources'){
                    console.log("sources:",data.sources);
                    onSource(data.sources);
                }
                
                if(data.type === 'token'){
                    onChunk(data.text);
                }
                if(data.type === 'status'){
                    onStatus(data.status);
                }
                if(data.type === 'error'){
                    onError(data.error);
                }
            }catch(error){
                console.error('Failed to parse:',line);
            }
        }
         if(buffer.trim()){ 
            try{
                const data = JSON.parse(buffer);
                
                if(data.type === 'sources'){
                    console.log("sources:",data.sources);
                    onSource(data.sources);
                }
                
                if(data.type === 'token'){
                    onChunk(data.text);
                }
            }catch(error){
                console.error('Failed to parse:',buffer);
            }
        }
    }
}

export async function createNewChatId(prompt){
    const token = localStorage.getItem('token');
    const response = await fetch(
        `http://localhost:3000/chats/`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
                    Authorization:`Bearer ${token}`
            },
            body: JSON.stringify({
                message: prompt,
            }),
        }
    );
    const data = await response.json();
    return data.chatId;
}

export async function getChats(){
    const token = localStorage.getItem('token');
    const response = await fetch(
        `http://localhost:3000/chats`,
        {
            method: "GET",
            headers:{
                "Content-Type":
                    "application/json",
                Authorization:`Bearer ${token}`
            }
        }
    );
    const data = await response.json();
    return data;
}

export async function getMessages(chatId){
    const token = localStorage.getItem('token');
    const response = await fetch(
        `http://localhost:3000/chats/${chatId}/messages`,
        {
            method: "GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );
    
    const data = await response.json();
    return data;
}
