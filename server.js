const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Hello Test his Node js");
});


const userRoutes = require('./routes/users.routes')
const propertyRoutes = require('./routes/property.routes')
const authRoutes = require('./routes/auth.routes')
app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/properties', propertyRoutes);

// using as middleware
app.use('/api/v1/users', userRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})