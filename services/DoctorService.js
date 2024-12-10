const DoctorRepository = require("../repositories/DoctorRepository");

const DoctorService = {
    async getAllDoctors() {
        return DoctorRepository.getAllDoctors();
    },

    async getDoctorById(id) {
        return DoctorRepository.getDoctorById(id);
    },

    async createDoctor(data) {
        return DoctorRepository.createDoctor(data);
    },

    async updateDoctor(id, data) {
        return DoctorRepository.updateDoctor(id, data);
    },

    async deleteDoctor(id) {
        return DoctorRepository.deleteDoctor(id);
    },
};

module.exports = DoctorService;
