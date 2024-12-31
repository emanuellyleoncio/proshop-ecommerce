import mongoose from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - image
 *         - brand
 *         - category
 *         - description
 *         - price
 *         - countInStock
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         image:
 *           type: string
 *           description: The image URL of the product
 *         brand:
 *           type: string
 *           description: The brand of the product
 *         category:
 *           type: string
 *           description: The category of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         countInStock:
 *           type: number
 *           description: The number of items in stock
 *         rating:
 *           type: number
 *           description: The average rating of the product
 *         numReviews:
 *           type: number
 *           description: The number of reviews of the product
 *       example:
 *         _id: d5fE_asz
 *         name: Sample Product
 *         image: /images/sample.jpg
 *         brand: Sample Brand
 *         category: Sample Category
 *         description: This is a sample product
 *         price: 89.99
 *         countInStock: 10
 *         rating: 4.5
 *         numReviews: 12
 */

interface IReview {
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
}

interface IProduct {
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  reviews: IReview[];
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
}

const reviewSchema = new mongoose.Schema<IReview>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema<IProduct>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;