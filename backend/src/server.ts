import path from "path";
import cors from "cors";
import express, { Request, Response } from "express";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import setupSwagger from "./config/swagger.js";
import cookieParser from "cookie-parser";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
}));

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("API is running!");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req: Request, res: Response) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});


if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req: any, res: any) => {
    res.send('API is running....');
  });
} else {
 
  app.use('/uploads', express.static('/var/data/uploads'));

  app.get('*', (req: any, res: any) => {
    const frontendUrl = process.env.FRONTEND_URL || 'https://frontend-proshop-ecommerce-pk0305e9d.vercel.app/';
    res.redirect(frontendUrl);
  });
}

setupSwagger(app);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
