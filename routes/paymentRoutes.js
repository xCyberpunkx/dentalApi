const express = require('express');
const paymentController = require("../controllers/paymentController");

const router = express.Router();

router.get('/patient/:id', paymentController.getPaymentsByPatientId);
router.get('/:id', paymentController.getPaymentById);
router.post('/', paymentController.createPayment);
router.put('/:id', paymentController.updatePayment);
router.delete('/:id', paymentController.deletePayment);

module.exports = router;
