
const sendMessage = (req,res) => {
    const prompt = req.body.message;
    res.json({
        reply:prompt
    })
};

export default {
    sendMessage
}