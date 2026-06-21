
export async function sendMessage(message)
{
    const response = await fetch(
        'http://localhost:3000/chats',
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                message,
            })
        });
        return response.json();
}

export async function streamMessage(
    currentChatId,
    prompt,
    onChunk
) {
    const response = await fetch(
        `http://localhost:3000/chats/${currentChatId}/messages`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify({
                message: prompt,
            }),
        }
    );

    const reader =
        response.body.getReader();

    const decoder =
        new TextDecoder();

    while (true) {
        const { done, value } =
            await reader.read();

        if (done) break;

        const chunk =
            decoder.decode(value);

        onChunk(chunk);
    }
}

export async function createNewChatId(prompt){
    const response = await fetch(
        `http://localhost:3000/chats/`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
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
    const response = await fetch(
        `http://localhost:3000/chats`,
        {
            method: "GET",
        }
    );
    const data = await response.json();
    return data;
}

export async function getMessages(chatId){
    const response = await fetch(
        `http://localhost:3000/chats/${chatId}/messages`,
        {
            method: "GET",
        }
    );
    
    const data = await response.json();
    return data;
}

