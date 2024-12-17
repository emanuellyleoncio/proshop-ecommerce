import React from 'react'
import { Card, CardBody, CardImg, CardText, CardTitle } from 'react-bootstrap'

const Product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded'>
        <a href={`/product/${product._id}`}>
            <CardImg src={product.image}></CardImg>
        </a>

        <CardBody>
        <a href={`/product/${product._id}`}>
            <CardTitle as="div">
                <strong>{product.name}</strong>
            </CardTitle>
        </a>

        <CardText as="h3">
            ${product.price}
        </CardText>
        </CardBody>
    </Card>
  )
}

export default Product