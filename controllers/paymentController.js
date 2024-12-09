const paymentService = require('../services/paymentService'); // Adjust path if necessary

const getPaymentsByPatientId = async (req, res) => {
    try {
        const { id } = req.params;
        const payments = await paymentService.getPaymentsByPatientId(id);
        res.status(200).json(payments);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }
};

const getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await paymentService.getPaymentById(id);
        res.status(200).json(payment);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }
};

const createPayment = async (req, res) => {
    try {
        const paymentData = req.body;
        const newPayment = await paymentService.createPayment(paymentData);
        res.status(201).json(newPayment);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const paymentData = req.body;
        const updatedPayment = await paymentService.updatePayment(id, paymentData);
        res.status(200).json(updatedPayment);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        await paymentService.deletePayment(id);
        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    getPaymentsByPatientId,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment,
};
