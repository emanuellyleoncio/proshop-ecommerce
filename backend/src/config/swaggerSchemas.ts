export const swaggerSchemas = {
    Product: {
      type: 'object',
      properties: {
        _id: { type: 'string', description: 'Product ID (optional)' },
        name: { type: 'string', description: 'Product name' },
        image: { type: 'string', description: 'Product image URL' },
        description: { type: 'string', description: 'Product description' },
        brand: { type: 'string', description: 'Product brand' },
        category: { type: 'string', description: 'Product category' },
        price: { type: 'number', format: 'float', description: 'Product price' },
        countInStock: { type: 'number', description: 'Stock quantity' },
        rating: { type: 'number', description: 'Average rating' },
        numReviews: { type: 'number', description: 'Number of reviews' },
      },
    },
    User: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'User name' },
          email: { type: 'string', description: 'User email address' },
          password: { type: 'string', description: 'User password' },
          isAdmin: { type: 'boolean', description: 'Flag indicating if the user is an admin (optional)' },
        },
        required: ['name', 'email', 'password'],
      },
  };