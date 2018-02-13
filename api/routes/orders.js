const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "orders were fetched!"
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: "Order was created!",
        order: order
    });
});

router.get("/:order_id", (req, res, next) => {
    const orderId = req.params.order_id;
    res.status(200).json({
        message: "Order Details",
        orderId: orderId
    });
});

router.delete("/:order_id", (req, res, next) => {
    const orderId = req.params.order_id;
    res.status(200).json({
        message: 'Order deleted',
        orderId: orderId
    })
})






module.exports = router;