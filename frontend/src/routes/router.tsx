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
      </Route>
    </Route>
  )
);