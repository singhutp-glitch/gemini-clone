import express from 'express'
const router = express.Router();
import controller from '../controllers/chatController.js'

router.get('/', controller.loadChatsGet);
router.post('/',controller.createChatPost);

router.get('/:chatId/messages', controller.loadMessagesGet);
router.post('/:chatId/messages', controller.sendMessage);


export default router;