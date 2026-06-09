
const sendMessage = (req,res) => {
    res.json({
        reply:'Heloo from the controller'
    })
};

export default {
    sendMessage
}