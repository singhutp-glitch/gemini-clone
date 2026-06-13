import {prisma} from '../../lib/prisma.js';

export async function saveMessages(chatId,role,content){
    await prisma.message.create({
        data:{
            chatId,
            role,
            content
        }
    });
    
}

export async function createNewChat(
    userId,
    title
) {
    title = title
        .trim()
        .slice(0, 60);

    const chat =
        await prisma.chat.create({
            data: {
                title,
                userId,
            },
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
        select: {
            role: true,
            content: true,
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