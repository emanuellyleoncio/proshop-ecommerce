import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';

import App from '../App.tsx';
import Home from '../pages/Home';
import Product from '../pages/Product.tsx';
import Cart from '../pages/Cart.tsx';
import Login from '../pages/Login.tsx';
import Register from '../pages/Register.tsx';
import Shipping from '../pages/Shipping.tsx';
import PrivateRoute from '../components/PrivateRoute.tsx';
import Payment from '../pages/Payment.tsx';
import PlaceOrder from '../pages/PlaceOrder.tsx';
import Order from '../pages/Order.tsx';
import Profile from '../pages/Profile.tsx';
import AdminRoute from '../components/AdminRoute.tsx';
import OrderList from '../pages/admin/OrderList.tsx';
import ProductList from '../pages/admin/ProductList.tsx';
import ProductEdit from '../pages/admin/ProductEdit.tsx';
import UserList from '../pages/admin/UserList.tsx';
import UserEdit from '../pages/admin/UserEdit.tsx';


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/product/:id' element={<Product />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      
    
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/order/:id' element={<Order />} />
        <Route path='/order/:id' element={<Order />} />
        <Route path='/profile' element={<Profile />} />
      </Route>

      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/order-list' element={<OrderList />} />
        <Route path='/admin/product-list' element={<ProductList />} />
        <Route
          path='/admin/product-list/:pageNumber'
          element={<ProductEdit />}
        />
        <Route path='/admin/user-list' element={<UserList />} />
        <Route path='/admin/user/:id/edit' element={<UserEdit />} />
      </Route>
    </Route>
  )
);