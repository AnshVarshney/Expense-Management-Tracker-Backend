const transactionModel = require('../models/transactionModel')
const moment = require('moment')

const getTransaction = async(req,res)=>{
    const id=req.userData.userId;
    // console.log(id)
    try{
        const {frequency,selectedDate,type} = req.body
        // console.log("request body",req.body)
        const transaction =  await transactionModel.find({
            ...(frequency!=='custom'?
            {
                date:{
                $gt:moment().subtract(Number(frequency),"d").toDate()
            },}
            :
            {date:{
                $gte:selectedDate[0],
                $lte:selectedDate[1]
            }}) ,
            ...(type!=='all' && {type}) ,
            userid: id
        });

        // console.log(transaction)
        res.status(200).json(
            {
                success:true,
                transaction
            })
    }catch(error){
        console.log(error)
        res.status(400).json(error)
    }
}

const editTransaction = async(req,res)=>{
    const id = req.userData.userId
    const data = {userid: id,...req.body.payload}
    try{
        await transactionModel.findOneAndUpdate({_id:req.body.transactionId},data)
        res.status(200).send('Transaction Edited Successfully')
    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            error
        })
    }
}

const deleteTransaction = async(req,res)=>{
    // console.log("sad",req.body)
    try{
        await transactionModel.findOneAndDelete({_id:req.body.transactionId})
        res.status(200).send('Transaction Deleted Successfully')
    }catch(error){
        console.log(error)
        res.status(400).json({
            success:false,
            error
        })
    }
}


const addTransaction = async (req,res)=>{
    const userid = req.userData.userId; 
    const transData = req.body
    try{
        const newTransaction = await transactionModel.create({...transData,userid:userid});
        // console.log("newTransaction",newTransaction)
        res.status(201).json(
            {
                success:true,
                newTransaction
            }
        )
    }catch(error){
        console.log(error)
        res.status(400).json(error)
    }
}
module.exports = { getTransaction,addTransaction,editTransaction,deleteTransaction }