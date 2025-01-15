import asyncHandler from '../middleware/asyncHandler';
import Order from '../models/orderModel';

//import { calcPrices } from '../utils/calcPrices';
//import { verifyPayPalPayment, checkIfNewTransaction } from '../utils/paypal';


interface OrderItem {
    name: string;
    qty: number;
    image: string;
    price: number;
    product: string;
}

interface ShippingAddress {
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

interface OrderInput {
    orderItems: OrderItem[];
    shippingAddress: ShippingAddress;
    shippingPrice: number;
    paymentMethod: string;
    itemsPrice: number;
    taxPrice: number;
    totalPrice: number;
}


// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req: any, res: any) => {
    const { orderItems, shippingAddress, shippingPrice, paymentMethod, itemsPrice, taxPrice, totalPrice }: OrderInput = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
        return;
    }

    const order = new Order({
        orderItems: orderItems.map((item: OrderItem) => ({
            ...item,
            product: item.product,
            _id: undefined,
        })),
        user: req.user,
        shippingAddress,
        shippingPrice,
        paymentMethod,
        itemsPrice,
        taxPrice,
        totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req: any, res: any) => {
  const orders = await Order.find({ user: req.user ? req.user._id : undefined });
  res.status(200).json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req: any, res: any) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  res.status(200).json(order);
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req: any, res: any) => {
  res.json({ message: 'Order paid' });
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req: any, res: any) => {
  res.json({ message: 'Order delivered' });
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req: any, res: any) => {
  res.json({ message: 'Orders' });
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};