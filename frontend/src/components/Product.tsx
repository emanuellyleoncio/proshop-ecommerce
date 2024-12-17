import { Card, CardBody, CardImg, CardText, CardTitle } from "react-bootstrap";

type ProductProps = {
  product: {
    _id: number;
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
      <a href={`/product/${product._id}`}>
        <CardImg src={product.image}></CardImg>
      </a>

      <CardBody>
        <a href={`/product/${product._id}`}>
          <CardTitle as="div">
            <strong>{product.name}</strong>
          </CardTitle>
        </a>

        <CardText as="h3">${product.price}</CardText>
      </CardBody>
    </Card>
  );
};

export default Product;
