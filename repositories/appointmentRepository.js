const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const AppointmentRepository = {
  async getAllAppointments() {
    return prisma.appointment.findMany({
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
        status: true,
        type: true,
      },
    });
  },

  async getAppointmentById(id) {
    return prisma.appointment.findUnique({
      where: { id: parseInt(id) },
      include: {
        doctor: {
          select: {
           
            firstName: true,
            lastName: true,
          },
        },
        patient: true, 
        status: true, 
        type: true, 
      },
    });
  },

  async createAppointment(data) {
    if (data.date && data.time) {
      const appointmentDate = new Date(data.date);
      appointmentDate.setHours(0, 0, 0, 0); 
      let appointmentTime = new Date(appointmentDate);
      const [hours, minutes] = data.time.split(":"); 
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
      appointmentDate.setHours(0, 0, 0, 0); 

      let appointmentTime = new Date(appointmentDate);
      const [hours, minutes] = data.time.split(":"); 
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

            firstName: true,
            lastName: true,
          },
        },
        status: true, 
        type: true, 
      },
    });
  },
};

module.exports = AppointmentRepository;