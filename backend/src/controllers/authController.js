const register = async (req,res) => {
    const {email,password} = req.body;
    console.log("email ",email);
    res.json({
        message:"Register route working"
    })
}

export default{
    register
}