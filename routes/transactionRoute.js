const express = require('express')
const { addTransaction, getTransaction, editTransaction, deleteTransaction } = require('../controllers/transactionController')
// const { loginController, registerController } = require('../controllers/userController')

const router =  express.Router()

// router.post('/login',loginController)
// router.post('/register',registerController)

router.post('/add-transaction',addTransaction);
router.post('/edit-transaction',editTransaction);
router.post('/delete-transaction',deleteTransaction);
router.post('/get-transaction',getTransaction);

module.exports=router