import mongoose from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - user
 *         - orderItems
 *         - shippingAddress
 *         - paymentMethod
 *         - itemsPrice
 *         - taxPrice
 *         - shippingPrice
 *         - totalPrice
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the order
 *         user:
 *           type: string
 *           description: The user who placed the order
 *         orderItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *           description: The items in the order
 *         shippingAddress:
 *           type: object
 *           description: The shipping address for the order
 *           properties:
 *             address:
 *               type: string
 *             city:
 *               type: string
 *             postalCode:
 *               type: string
 *             country:
 *               type: string
 *         paymentMethod:
 *           type: string
 *           description: The payment method for the order
 *         itemsPrice:
 *           type: number
 *           description: The price of the items in the order
 *         taxPrice:
 *           type: number
 *           description: The tax price for the order
 *         shippingPrice:
 *           type: number
 *           description: The shipping price for the order
 *         totalPrice:
 *           type: number
 *           description: The total price for the order
 *         isPaid:
 *           type: boolean
 *           description: Whether the order is paid
 *         paidAt:
 *           type: string
 *           format: date-time
 *           description: The date the order was paid
 *         isDelivered:
 *           type: boolean
 *           description: Whether the order is delivered
 *         deliveredAt:
 *           type: string
 *           format: date-time
 *           description: The date the order was delivered
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the order was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the order was last updated
 *       example:
 *         _id: d5fE_asz
 *         user: d5fE_asz
 *         orderItems: [{ product: d5fE_asz, name: 'Sample Product', qty: 1, price: 89.99, image: '/images/sample.jpg' }]
 *         shippingAddress: { address: '123 Main St', city: 'New York', postalCode: '10001', country: 'USA' }
 *         paymentMethod: 'PayPal'
 *         itemsPrice: 89.99
 *         taxPrice: 10.00
 *         shippingPrice: 5.00
 *         totalPrice: 104.99
 *         isPaid: true
 *         paidAt: 2023-01-01T00:00:00.000Z
 *         isDelivered: true
 *         deliveredAt: 2023-01-02T00:00:00.000Z
 *         createdAt: 2023-01-01T00:00:00.000Z
 *         updatedAt: 2023-01-01T00:00:00.000Z
 */

interface IOrderItem {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: mongoose.Schema.Types.ObjectId;
}

interface IOrder extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  orderItems: IOrderItem[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  paymentResult?: {

    id: string;

    status: string;

    update_time: string;

    email_address: string;

  };
  deliveredAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;