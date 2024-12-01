const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT

app.get('/', (req, res) => {
    res.send("Server is running")
})
app.use((req, res) => {
    res.status(404).send("Page not found")
})
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
