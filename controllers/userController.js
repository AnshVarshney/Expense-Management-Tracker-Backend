const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')


// const getUserController =  async(req,res)=>{
//     try{
//         const token=req.body
//         const data=jwt.decode(token)
//         res.send(200).json({
//             success:true,
//             data
//         })
//     }catch(error){
//         console.log(error)
//         res.status(400).json({
//             success:false,
//             error
//         })
//     }
// }

const loginController = async (req,res) => {
    try {
        const { email } = req.body
        const user = await userModel.findOne({ email })
        const isPasswordValid = await bcrypt.compare(req.body.password,user.password);
        console.log(isPasswordValid)
        if (!isPasswordValid) {
            return res.status(403).send("YOU DON'T HAVE AN ACCOUNT")
        }

        // const token = jwt.sign({
        //     name:user.name,
        //     email:user.email
        // },'cool_dude#4455987')

        res.status(201).json({
            success:true,
            user
            // token
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}

const registerController = async(req,res) => {
    const newPassword=await bcrypt.hash(req.body.password,10);
    const userdata = {
        name:req.body.name,
        email:req.body.email,
        password:newPassword
    }
    // console.log(userdata,newPassword)
    try{
        const newUser = await userModel.create(userdata)
        // await newUser.save()
        res.status(201).json({
            success:true,
            newUser
        })

    }catch(error){
        console.error(error);
        res.status(400).json({
            success: false,
            error
        })
    }
}

module.exports = { loginController, registerController  }