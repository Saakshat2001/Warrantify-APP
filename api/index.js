import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import userRoutes from './routes/user.route.js';
 import authRoutes from './routes/auth.route.js';
 import productRoutes from './routes/product.route.js';
import cookieParser from 'cookie-parser';
// import postRoutes from './routes/post.route.js';
// import commentRoutes from './routes/comment.route.js';
import path from 'path';

dotenv.config();


mongoose.connect(process.env.MONGO)
.then(() => {console.log('mongodb connected')})
.catch((err) => {
    console.log(err);
});

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(3000 , () => {
console.log('Server is running on port 3000');
});

// console.log('-----====++++++++>>>>>>>>> ')
// app.use('/api/user' , userRoutes);
app.use('/api/auth' , authRoutes);
app.use('/api/product' , productRoutes);

