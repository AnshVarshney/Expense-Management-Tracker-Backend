const express = require('express')
const { loginController, registerController } = require('../controllers/userController')

const router =  express.Router()

router.post('/login',loginController)
router.post('/register',registerController)
// router.post('/get-user',getUserController)

module.exports=router