const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Hello Test his Node js");
});


const propertyRoutes = require('./src/routes/property.routes')
// using as middleware
app.use('/api/v1/properties', propertyRoutes)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})