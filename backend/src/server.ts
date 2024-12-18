import express, { Request, Response } from 'express';
import products from './data/products.js'

const app = express();
const port = 5000;

app.use(express.json());
app.get('/', (req: Request, res: Response) => {
    res.send('API is running!')
})

app.get('/api/products', (req: Request, res: Response) => {
    res.json(products)
});

app.get('/api/products/:id', (req: Request, res: Response) => {
    const product = products.find((item) => item._id === Number(req.params.id))
    res.json(product)
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})