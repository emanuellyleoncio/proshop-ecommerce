import { Card, CardBody, CardImg, CardText, CardTitle } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { BASE_URL } from "../constants";


export type ProductProps = {
  product: {
    _id: string;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
  };
};

const Product = ({ product }: ProductProps) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <CardImg src={BASE_URL + product.image} style={{ width: "100%", height: "200px", objectFit: "cover" }}></CardImg>
      </Link>

      <CardBody>
        <Link to={`/product/${product._id}`}>
          <CardTitle as="div" className="product-title">
            <strong>{product.name}</strong>
          </CardTitle>
        </Link>

        <CardText as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </CardText>

        <CardText as="h3">${product.price}</CardText>
      </CardBody>
    </Card>
  );
};

export default Product;
