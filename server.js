const express =  require('express')
const cors = require('cors');
const morgan =  require('morgan')
const dotenv =  require('dotenv')
const colors = require('colors')
const connectDb = require('./config/connectDb')

dotenv.config()

connectDb();

const app = express();
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())


// console.log("ASaskjfnj")
app.use('/api/v1/users',require('./routes/userRoute'));
app.use('/api/v1/transaction',require('./routes/transactionRoute'));

const PORT=8080||process.env.PORT
app.listen(PORT,()=>console.log("server starting"))