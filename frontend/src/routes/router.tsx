import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';

import App from '../App.tsx';
import Home from '../pages/Home';
import Product from '../pages/Product.tsx';
import Cart from '../pages/Cart.tsx';


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/product/:id' element={<Product />} />
      <Route path='/cart' element={<Cart />} />
    </Route>
  )
);