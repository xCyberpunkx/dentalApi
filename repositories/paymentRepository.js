const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getPaymentsByPatientId = async (patientId) => {
    return prisma.payment.findMany({
        where: { patientId },
        include: {
            doctor: {
                select: {
                    firstName: true,
                    lastName: true,
                },
            },
            patient: {
                select: {
                    firstName: true,
                    lastName: true,
                },
            },
            status: {
                select: {
                    status: true, // Include payment status
                },
            },
        },
    });
};

const getPaymentById = async (paymentId) => {
    return prisma.payment.findUnique({
        where: { id: paymentId },
        include: {
            doctor: {
                select: {
                    firstName: true,
                    lastName: true,
                },
            },
            patient: {
                select: {
                    firstName: true,
                    lastName: true,
                },
            },
            status: {
                select: {
                    status: true, // Include payment status
                },
            },
        },
    });
};

const createPayment = async (paymentData) => {
    return prisma.payment.create({
        data: paymentData,
    });
};

const updatePayment = async (paymentId, paymentData) => {
    return prisma.payment.update({
        where: { id: paymentId },
        data: paymentData,
    });
};

const deletePayment = async (paymentId) => {
    return prisma.payment.delete({
        where: { id: paymentId },
    });
};

module.exports = {
    getPaymentsByPatientId,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment,
};
