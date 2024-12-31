import express, { Request, Response } from 'express';
import productRoutes from './routes/productRoutes';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import connectDB from './config/db';
import setupSwagger from './config/swagger';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.get('/', (req: Request, res: Response) => {
  res.send('API is running!');
});

app.use('/api/products', productRoutes);

setupSwagger(app);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});