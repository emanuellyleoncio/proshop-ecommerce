import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

import Product from "../components/Product";
import axios from "axios";

export type ProductProps = {
  _id: string,
  name: string,
  image: string,
  description:
    string,
  brand: string,
  category: string,
  price: number,
  countInStock: number,
  rating: number,
  numReviews: number,
}

const Home = () => {
  const [products, setProducts] = useState<ProductProps[]>([])
  
  useEffect(() => {
    const getProducts = async () => {
      const {data} = await axios.get('/api/products');
      setProducts(data)
    }

    getProducts()
  }, [])
  
  
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
