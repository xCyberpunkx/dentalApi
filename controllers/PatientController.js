const PatientService = require("../services/PatientService");

const patientController = {
    async getAllPatients(req, res, next) {
        try {
            const patients = await PatientService.getAllPatients();
            res.json(patients);
        } catch (err) {
            next(err);
        }
    },

    async getPatientById(req, res, next) {
        try {
            const patient = await PatientService.getPatientById(req.params.id);
            if (!patient) {
                return res.status(404).json({ message: "Patient not found" });
            }
            res.json(patient);
        } catch (err) {
            next(err);
        }
    },

    async createPatient(req, res, next) {
        try {
            const newPatient = await PatientService.createPatient(req.body);
            res.status(201).json(newPatient);
        } catch (err) {
            next(err);
        }
    },

    async updatePatient(req, res, next) {
        try {
            const updatedPatient = await PatientService.updatePatient(req.params.id, req.body);
            if (!updatedPatient) {
                return res.status(404).json({ message: "Patient not found" });
            }
            res.json(updatedPatient);
        } catch (err) {
            next(err);
        }
    },

    async deletePatient(req, res, next) {
        try {
            await PatientService.deletePatient(req.params.id);
            res.status(204).end();
        } catch (err) {
            next(err);
        }
    },
};

module.exports = patientController;
