import {prisma} from '../../lib/prisma.js';

export async function saveMessages(chatId,role,content){
    console.log(
    "Saving message:",
    role,
    chatId
);
    await prisma.message.create({
        data:{
            chatId,
            role,
            content
        }
    });
    
}

export async function createNewChat(userId,title){
    const chat = await prisma.chat.create({
        data:{
            title:title,
            userId:userId
        }
    });
    return chat;
}

export async function searchChatIdwithUserId(userId,chatId){
    return await prisma.chat.findFirst({
        where:{
            id:chatId,
            userId:userId
        }
    })
}

export async function loadMessages(chatId) {
    return prisma.message.findMany({
        where: {
            chatId,
        },
        orderBy: {
            createdAt: "asc",
        },
    });
}
export async function loadChats(userId) {
    return prisma.chat.findMany({
        where: {
            userId,
        },
        select: {
            id: true,
            title: true,
            },
        orderBy: {
            updatedAt: "desc",
        },
        take:5
    });
}