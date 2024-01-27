const express = require('express')
const jwt = require('jsonwebtoken')
const { addTransaction, getTransaction, editTransaction, deleteTransaction } = require('../controllers/transactionController');
const  authMiddleware  = require('../middlewares/Auth');
// const { loginController, registerController } = require('../controllers/userController')

const router =  express.Router()

// router.post('/login',loginController)
// router.post('/register',registerController)

router.use(authMiddleware)
// console.log("Asd")

// const authMiddleware = (req, res, next) => {
//     console.log("bb",req.headers)
//     const authHeader = req.headers.authorization;
//     console.log("cc",authHeader)
//     const token=authHeader.split(' ')[1];
//     console.log("token",token)
//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized Access' });
//     }
//     try {
//         const decodedToken = jwt.verify(token, 'cool_dude#4455987');
//         req.userData = { userId: decodedToken.user_id};
//         next();
//     } catch (error) {
//         console.error(error);
//         return res.status(401).json({ message: 'Unauthorized Access or token expired' });
//     }
// };


router.post('/add-transaction',addTransaction);
router.post('/edit-transaction',editTransaction);
router.post('/delete-transaction',deleteTransaction);
router.post('/get-transaction',getTransaction);

module.exports=router