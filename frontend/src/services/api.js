
export async function sendMessage(message)
{
    const response = await fetch(
        'http://localhost:3000/chat',
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
    prompt,
    onChunk
) {
    const response = await fetch(
        "http://localhost:3000/chat",
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