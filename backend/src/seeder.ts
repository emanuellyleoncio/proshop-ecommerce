import mongoose from "mongoose";
import dotenv from 'dotenv'
import colors from 'colors'
import users, { IUser } from './data/user.js';
import products from './data/products.js';
import User from './models/userModel';
import Product from './models/productModel';
import Order from './models/orderModel';
import connectDb from './config/db.js';

dotenv.config()

connectDb()

interface ISampleProduct {
    name: string;
    price: number;
    user: IUser;
    brand: string;
    category: string;
    countInStock: number;
    numReviews: number;
    description: string;
    image: string;
}

interface IProduct {
    name: string;
    price: number;
    brand: string;
    category: string;
    countInStock: number;
    numReviews: number;
    description: string;
    image: string;
}

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createUsers = await User.insertMany(users);
        const adminUser: IUser = createUsers[0]._id as unknown as IUser;

        const sampleProducts: ISampleProduct[] = products.map((product: IProduct) => {
            return {...product, user: adminUser}
        });

        await Product.insertMany(sampleProducts);

        console.log(colors.green('Data Imported!'));

        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);

    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log(colors.red('Data Destroyed!'));

        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);

    }
}


if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}