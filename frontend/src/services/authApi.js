
export async function registerUser(name,email,password){
    const response = await fetch(
        `http://localhost:3000/auth/register`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        }
    );
    const data = await response.json();
    return data;
}

export async function loginUser(email,password){
    const response = await fetch(
        `http://localhost:3000/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        }
    );
    const data = await response.json();
    return data;
}

export async function getUser(){
    const token = localStorage.getItem('token');
    const user = await fetch(
        `http://localhost:3000/auth/me`,
        {
            method: "GET",
            headers: {
                "Content-Type":
                    "application/json",
                Authorization:`Bearer ${token}`    
            },
        }
    );
    return user;
}