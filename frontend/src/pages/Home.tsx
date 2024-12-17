import React from "react";
import { Row, Col } from "react-bootstrap";
import products from "../products";
import Product from "../components/Product";

type ProductProps = {
  _id: number,
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
