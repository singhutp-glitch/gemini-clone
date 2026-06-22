import { validationResult } from "express-validator";
import {prisma} from '../../lib/prisma.js'
import bcrypt from 'bcrypt'

const register = async (req,res) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        res.json({
            error:error.status(400).array()
        })

    }
    try{

        const {name,email,password} = req.body;
        const existingUser = await prisma.findUnique({
            where:{
                email,
            }
        });
        if(existingUser){
            res.status(400).json({
                error:'Email already exist'
            })
        }
        const passwordHash = await bcrypt.hash(password,10);
        const user = await prisma.user.create({
            where:{
                name,
                email,
                passwordHash
            }
        })
        
        res.status(201).json({
            id:user.id,
            email:user.email
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            error:'Error while creating user'
        })
    }
}

export default{
    register
}