const transactionModel = require('../models/transactionModel')
const moment = require('moment')

const getTransaction = async(req,res)=>{
    const id=req.body.userid;
    // console.log(id)
    try{
        const {frequency,selectedDate,type} = req.body
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
        res.status(200).json(
            {
                success:true,
                transaction
            })
        // res.status(200).send("everthing ok")
    }catch(error){
        console.log(error)
        res.status(400).json(error)
    }
}

const editTransaction = async(req,res)=>{
    try{
        await transactionModel.findOneAndUpdate({_id:req.body.transactionId},req.body.payload)
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
    const transData = req.body
    try{
        const newTransaction = await transactionModel.create(transData)
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