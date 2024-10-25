import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import todoRoutes from './routes/todoRoute.js';
import noteRoutes from './routes/noteRoute.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import products from  './routes/products.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
  }));app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT;

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/products', products);

app.get("/", (req, res) => {
  res.json({
      message: "Welcome",
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));