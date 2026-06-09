import express from 'express'
const router = express.Router();
import controller from '../controllers/chatController.js'

router.post('/chat',controller.sendMessage);

export default router;