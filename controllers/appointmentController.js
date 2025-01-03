const AppointmentService = require("../services/AppointmentService");

const appointmentController = {
  async getAllAppointments(req, res, next) {
    try {
      const appointments = await AppointmentService.getAllAppointments();
      res.json(appointments);
    } catch (err) {
      next(err);
    }
  },
  async getAllQueueAppointments(req, res, next) {
    try {
      const appointments = await AppointmentService.getAllQueueAppointments();
      res.json(appointments);
    } catch (err) {
      next(err);
    }
  },

  async getAppointmentById(req, res, next) {
    try {
      const appointment = await AppointmentService.getAppointmentById(
        req.params.id
      );
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      res.json(appointment);
    } catch (err) {
      next(err);
    }
  },

  async createAppointment(req, res, next) {
    try {
      const newAppointment = await AppointmentService.createAppointment(
        req.body
      );
      res.status(201).json(newAppointment);
    } catch (err) {
      next(err);
    }
  },

  async updateAppointment(req, res, next) {
    try {
      const updatedAppointment = await AppointmentService.updateAppointment(
        req.params.id,
        req.body
      );
      if (!updatedAppointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      res.json(updatedAppointment);
    } catch (err) {
      next(err);
    }
  },

  async deleteAppointment(req, res, next) {
    try {
      await AppointmentService.deleteAppointment(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },

  async getAppointmentsByPatientId(req, res, next) {
    try {
      const appointments = await AppointmentService.getAppointmentsByPatientId(
        req.params.patientId
      );
      if (!appointments) {
        return res
          .status(404)
          .json({ message: "No appointments found for this patient" });
      }
      res.json(appointments);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = appointmentController;
