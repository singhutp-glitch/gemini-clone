import express from 'express'
const router = express.Router();
import controller from '../controllers/chatController.js'

router.post('/chat/new',controller.createChatPost);
router.post('/chat/:chatId', controller.sendMessage);

router.get('/chats', controller.loadChatGet);


export default router;