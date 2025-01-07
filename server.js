import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'express'
import userRouter from './src/Routes/user.route.js'
import productRouter from './src/Routes/product.route.js'
import cartRouter from './src/Routes/cart.route.js'
import addressRouter from './src/Routes/address.route.js'
//import paymentRouter from './src/Routes/payment.route.js'
import cors from 'cors';
import dotenv from 'dotenv'
import path from 'path';
const __dirname = path.resolve();

dotenv.config()

const app = express();

app.use(bodyParser.json())

app.use(cors({
  origin:true,
  methods:[ "GET","POST","PUT","DELETE"],
  credentials:true
}))


app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// home testing route
app.get('/',(req,res)=>res.json({messge:'This is home route'}))

// user Router
app.use('/api/user',userRouter)

// product Router
app.use('/api/product',productRouter)

// cart Router
app.use('/api/cart',cartRouter)

// address Router
app.use('/api/address',addressRouter)

// payment Router
//app.use('/api/payment',paymentRouter)


const mongodbUrl = process.env.MONGODB_URI 

mongoose.connect(mongodbUrl,{
    dbName: "E-commStore"
}).then(() => console.log("MongoDB Connected Succesfully")).catch((err) => console.log(err));

const port = 1000;

app.listen(port,() => {
    console.log(`Server is running on ${port}`);
})