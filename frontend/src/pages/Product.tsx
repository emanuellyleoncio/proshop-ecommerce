import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { FaCartPlus } from "react-icons/fa";
import { ProductProps } from "./Home";

import { useGetProductByIdQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState } from "react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";

const Product = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const { data, isLoading, isError } = useGetProductByIdQuery(productId!);
  const product = data as ProductProps;

  return (
    <>
      <Link className="btn btn-ligth my-3" to="/">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          Failed to load the product. Please try again later.
        </Message>
      ) : (
        product && (
          <Row>
            <Col md={6}>
              <Image src={product?.image} alt={product?.name} fluid />
            </Col>

            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product?.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product?.rating}
                    text={`${product?.numReviews} reviews`}
                  />
                </ListGroupItem>

                <ListGroupItem>Price: ${product?.price}</ListGroupItem>
                <ListGroupItem>
                  Description: {product.description}
                </ListGroupItem>
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
                        <strong>
                          {product?.countInStock > 0
                            ? "In stock"
                            : "Out of stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroupItem>

                   {/* Qty Select */}
                   {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroupItem>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock < 1}
                      onClick={addToCartHandler}
                    >
                      Add to cart <FaCartPlus />
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )
      )}
    </>
  );
};

export default Product;
