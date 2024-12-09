const DoctorService = require("../services/DoctorService");

const doctorController = {
    async getAllDoctors(req, res, next) {
        try {
            const doctors = await DoctorService.getAllDoctors();
            res.status(200).json(doctors);
        } catch (error) {
            next(error);
        }
    },

    async getDoctorById(req, res, next) {
        try {
            const doctor = await DoctorService.getDoctorById(req.params.id);
            if (!doctor) {
                return res.status(404).json({ error: "Doctor not found" });
            }
            res.status(200).json(doctor);
        } catch (error) {
            next(error);
        }
    },

    async createDoctor(req, res, next) {
        try {
            const newDoctor = await DoctorService.createDoctor(req.body);
            res.status(201).json(newDoctor);
        } catch (error) {
            next(error);
        }
    },

    async updateDoctor(req, res, next) {
        try {
            const updatedDoctor = await DoctorService.updateDoctor(req.params.id, req.body);
            if (!updatedDoctor) {
                return res.status(404).json({ error: "Doctor not found" });
            }
            res.status(200).json(updatedDoctor);
        } catch (error) {
            next(error);
        }
    },

    async deleteDoctor(req, res, next) {
        try {
            await DoctorService.deleteDoctor(req.params.id);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    },
};

module.exports = doctorController;
