const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const AppointmentRepository = {
  async getAllAppointments() {
    return prisma.appointment.findMany({
      include: {
        doctor: {
          select: {
            // Select only the doctor's first and last name
            firstName: true,
            lastName: true,
          },
        },
        patient: {
          select: {
            firstName: true,
            lastName: true,
          },
        }, // You can also include patient details if needed
        status: true, // Include appointment status if needed
        type: true, // Include appointment type if needed
      },
    });
  },
  async getAllQueueAppointments() {
    return prisma.appointment.findMany({
      select: {
        date: true,
        time: true,
        patient: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        status: true,
      },
    });
  },

  async getAppointmentById(id) {
    return prisma.appointment.findUnique({
      where: { id: parseInt(id) },
      include: {
        doctor: {
          select: {
            // Select only the doctor's first and last name
            firstName: true,
            lastName: true,
          },
        },
        patient: true, // Include patient details if needed
        status: true, // Include appointment status if needed
        type: true, // Include appointment type if needed
      },
    });
  },

  async createAppointment(data) {
    if (data.date && data.time) {
      const appointmentDate = new Date(data.date);
      appointmentDate.setHours(0, 0, 0, 0); // Reset the time to midnight

      let appointmentTime = new Date(appointmentDate);
      const [hours, minutes] = data.time.split(":"); // Assuming time is in "HH:mm" format
      appointmentTime.setHours(hours, minutes, 0, 0);

      data.date = appointmentDate;
      data.time = appointmentTime;
    }
    return prisma.appointment.create({
      data,
    });
  },

  async updateAppointment(id, data) {
    if (data.date && data.time) {
      const appointmentDate = new Date(data.date);
      appointmentDate.setHours(0, 0, 0, 0); // Reset the time to midnight

      let appointmentTime = new Date(appointmentDate);
      const [hours, minutes] = data.time.split(":"); // Assuming time is in "HH:mm" format
      appointmentTime.setHours(hours, minutes, 0, 0);

      data.date = appointmentDate;
      data.time = appointmentTime;
    }
    return prisma.appointment.update({
      where: { id: parseInt(id) },
      data,
    });
  },

  async deleteAppointment(id) {
    return prisma.appointment.delete({
      where: { id: parseInt(id) },
    });
  },

  async getAppointmentsByPatientId(patientId) {
    return prisma.appointment.findMany({
      where: { patientId: parseInt(patientId) },
      include: {
        doctor: {
          select: {
            // Select only the doctor's first and last name
            firstName: true,
            lastName: true,
          },
        },
        status: true, // Include appointment status if needed
        type: true, // Include appointment type if needed
      },
    });
  },
};

module.exports = AppointmentRepository;
