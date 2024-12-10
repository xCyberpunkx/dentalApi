const paymentRepository = require('../repositories/paymentRepository'); // Adjust path if necessary
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getPaymentsByPatientId = (patientId) =>
    paymentRepository.getPaymentsByPatientId(patientId)
        .then(payments => {
            if (!payments.length) {
                throw new Error('No payments found for this patient');
            }
            return payments;
        });

const getPaymentById = (paymentId) =>
    paymentRepository.getPaymentById(paymentId)
        .then(payment => {
            if (!payment) {
                throw new Error('Payment not found');
            }
            return payment;
        });

const createPayment = (paymentData) => {
    const { patientId, doctorId, status, amount, date, time } = paymentData;

    // Validate status
    return prisma.paymentStatus.findUnique({ where: { status } })
        .then(paymentStatus => {
            if (!paymentStatus) {
                throw new Error('Invalid payment status');
            }

            // Create payment record
            return paymentRepository.createPayment({
                ...paymentData,
                statusId: paymentStatus.id,
                date: new Date(date),
                time: new Date(time),
            });
        });
};

const updatePayment = (paymentId, paymentData) => {
    const { status } = paymentData;

    // Validate status
    return prisma.paymentStatus.findUnique({ where: { status } })
        .then(paymentStatus => {
            if (!paymentStatus) {
                throw new Error('Invalid payment status');
            }

            // Update payment record
            return paymentRepository.updatePayment(paymentId, {
                ...paymentData,
                statusId: paymentStatus.id,
            });
        });
};

const deletePayment = (paymentId) =>
    paymentRepository.getPaymentById(paymentId)
        .then(payment => {
            if (!payment) {
                throw new Error('Payment not found');
            }

            return paymentRepository.deletePayment(paymentId);
        });

module.exports = {
    getPaymentsByPatientId,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment,
};
