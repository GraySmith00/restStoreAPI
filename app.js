const express = require('express');
const app = express();
const mongoose = require('mongoose');

const morgan = require('morgan');
const bodyParser = require('body-parser');

// ROUTE REQUIREMENTS
// =====================================================
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// MONGOOSE CONNECTION
// =====================================================
mongoose.connect("mongodb://localhost/restStoreAPI");

// USE MORGAN FOR LOGGING REQUESTS
// =====================================================
app.use(morgan('dev'));

// USE BODY PARSER FOR PARSING INCOMING REQUEST BODIES
// (enables extraction of JSON or URL encoded data)
// =====================================================
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// RESPONSE HEADERS FOR RESTFUL API (prevent CORS Errors)
// =====================================================
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

// APP.USE FOR ROUTES
// =====================================================
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
   res.status(error.status || 500);
   res.json({
       error: {
           message: error.message
       }
   })
});


module.exports = app;