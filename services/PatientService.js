const PatientRepository = require("../repositories/PatientRepository");

const PatientService = {
    async getAllPatients() {
        return PatientRepository.getAllPatients();  // Removed 'await'
    },

    async getPatientById(id) {
        return PatientRepository.getPatientById(id);  // Removed 'await'
    },

    async createPatient(data) {
        return PatientRepository.createPatient(data);  // Removed 'await'
    },

    async updatePatient(id, data) {
        return PatientRepository.updatePatient(id, data);  // Removed 'await'
    },

    async deletePatient(id) {
        return PatientRepository.deletePatient(id);  // Removed 'await'
    },
};

module.exports = PatientService;
