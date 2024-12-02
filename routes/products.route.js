const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

const createRoutes = (productCollections) => {
    //create prodcuts
    router.post('/products', async (req, res) => {
        const newProducts = req.body;
        const result = await productCollections.insertOne(newProducts);
        res.send(result);
    })

    //read products
    router.get('/allproducts', async (req, res) => {
        const result = await productCollections.find();
        const products = await result.toArray()
        res.send(products);
    })

    //delete products
    router.delete('/products/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await productCollections.deleteOne(query);
        res.send(result);
    })

    //find one products
    router.get('/product/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await productCollections.findOne(query);
        res.send(result);
    })

    //update products
    router.put('/product/:id', async (req, res) => {
        const id = req.params.id;
        const updateProduct = req.body;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
            $set: {
                name: updateProduct.name,
                description: updateProduct.description,
                price: updateProduct.price,
                photo: updateProduct.photo,
            }
        }
        const result = await productCollections.updateOne(filter, updateDoc, options);
        res.send(result);
    })




    return router;
}

module.exports = createRoutes;
