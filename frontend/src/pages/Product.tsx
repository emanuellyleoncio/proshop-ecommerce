import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import Rating from "../components/Rating";
import {FaCartPlus} from 'react-icons/fa'

import { useEffect, useState } from "react";
import axios from "axios";
import { ProductProps } from "./Home";

const Product = () => {
  const { id: productId } = useParams();

  const [product, setProduct] = useState<ProductProps | null>(null)
  
  useEffect(() => {
    const getProduct = async () => {
      const {data} = await axios.get(`/api/products/${productId}`);
      setProduct(data)
    }

    getProduct()
  }, [productId])

  return (
    <>
      <Link className="btn btn-ligth my-3" to="/">
        Go Back
      </Link>
      {product && (
        <Row>
          <Col md={6}>
            <Image src={product?.image} alt={product?.name} fluid />
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>{product?.name}</h3>
              </ListGroupItem>
              <ListGroupItem><Rating
                value={product?.rating}
                text={`${product?.numReviews} reviews`}
              /></ListGroupItem>
              
              <ListGroupItem>Price: ${product?.price}</ListGroupItem>
              <ListGroupItem>Description: {product.description}</ListGroupItem>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product?.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              

              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>{product?.countInStock > 0 ? 'In stock' : 'Out of stock'}</strong>
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Button className="btn-block" type='button' disabled={product.countInStock < 1}>
                  Add to cart <FaCartPlus />
                </Button>
              </ListGroupItem>
            </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Product;
