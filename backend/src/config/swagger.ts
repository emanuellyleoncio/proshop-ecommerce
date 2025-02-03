import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { swaggerSchemas } from './swaggerSchemas.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ProShop API',
      version: '1.0.0',
      description: 'ProShop API documentation',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
    components: {
      schemas: swaggerSchemas,
    },
  },
  apis: ['./backend/src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;