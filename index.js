const express = require('express');
const cors = require('cors');
const createRoutes = require('./routes/products.route.js');
const createOrder = require('./routes/order.route.js');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5001; // Default to 5001 if not set

app.get('/', (req, res) => {
    res.send("Server is running");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xratx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    const database = client.db("ecommerceDB");
    const productCollections = database.collection('productCollections');
    const orderCollections = database.collection('orderCollections');
    try {
        await client.connect();

        // Use the routes with productCollections passed in
        app.use(createRoutes(productCollections))
        app.use(createOrder(orderCollections))
        app.use((req, res) => {
            res.status(404).send("Page not found");
        });
        await client.db("admin").command({ ping: 1 });
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

run().catch(console.error);

// **404 handler should be placed after route definitions**


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
