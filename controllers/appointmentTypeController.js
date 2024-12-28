// src/controllers/appointmentTypeController.js

const appointmentTypeService = require("../services/appointmentTypeService");

const getAllAppointmentTypes = async (req, res) => {
    try {
        const appointmentTypes = await appointmentTypeService.getAllAppointmentTypes();
        res.status(200).json(appointmentTypes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch appointment types" });
    }
};
const getAllQueueAppointments = async (req, res) => {
    try {
        const AllQueueAppointments = await appointmentTypeService.getAllQueueAppointments();
        res.status(200).json(AllQueueAppointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch appointment types" });
    }
};

const getAppointmentTypeById = async (req, res) => {
    try {
        const { id } = req.params;
        const appointmentType = await appointmentTypeService.getAppointmentTypeById(id);

        if (!appointmentType) {
            return res.status(404).json({ error: "Appointment type not found" });
        }

        res.status(200).json(appointmentType);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch appointment type" });
    }
};

const createAppointmentType = async (req, res) => {
    try {
        const { type } = req.body;

        if (!type) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newAppointmentType = await appointmentTypeService.createAppointmentType(type);
        res.status(201).json(newAppointmentType);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create appointment type" });
    }
};

const updateAppointmentType = async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.body;

        if (!type) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const updatedAppointmentType = await appointmentTypeService.updateAppointmentType(id, type);
        res.status(200).json(updatedAppointmentType);
    } catch (error) {
        console.error(error);
        if (error.code === "P2025") {
            return res.status(404).json({ error: "Appointment type not found" });
        }
        res.status(500).json({ error: "Failed to update appointment type" });
    }
};

const deleteAppointmentType = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAppointmentType = await appointmentTypeService.deleteAppointmentType(id);
        res.status(200).json(deletedAppointmentType);
    } catch (error) {
        console.error(error);
        if (error.code === "P2025") {
            return res.status(404).json({ error: "Appointment type not found" });
        }
        res.status(500).json({ error: "Failed to delete appointment type" });
    }
};

module.exports = {
    getAllQueueAppointments,
    getAllAppointmentTypes,
    getAppointmentTypeById,
    createAppointmentType,
    updateAppointmentType,
    deleteAppointmentType,
};
