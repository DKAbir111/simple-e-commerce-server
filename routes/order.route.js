const express = require('express')
const router = express.Router()
const createOrder = (orderCollections) => {
    //additem
    router.post('/additem', async (req, res) => {
        const newIem = req.body;
        const result = await orderCollections.insertOne(newIem);
        res.send(result);

    })
    router.get('/additem', async (req, res) => {
        const result = await orderCollections.find();
        const items = await result.toArray();
        res.send(items);

    })
    return router
}

module.exports = createOrder;