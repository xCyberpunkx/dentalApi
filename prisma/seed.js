const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Seed Genders
  const genders = await prisma.sex.createMany({
    data: [{ gender: "MALE" }, { gender: "FEMALE" }],
    skipDuplicates: true,
  });

  // Seed Patients
  const patients = await prisma.patient.createMany({
    data: [
      {
        firstName: "John",
        lastName: "Doe",
        age: 30,
        sexId: 5,
        phone: "1234567890",
        email: "john@example.com",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        age: 28,
        sexId: 6,
        phone: "0987654321",
        email: "jane@example.com",
      },
    ],
  });

  // Seed Specialties
  const specialties = await prisma.specialty.createMany({
    data: [{ name: "Dentistry" }, { name: "Cardiology" }],
    skipDuplicates: true,
  });

  // Seed Doctors
  const doctors = await prisma.doctor.createMany({
    data: [
      { firstName: "Alice", lastName: "Brown", specialtyId: 1 },
      { firstName: "Bob", lastName: "Green", specialtyId: 2 },
    ],
  });

  // Seed Appointment Statuses
  const appointmentStatuses = await prisma.appointmentStatus.createMany({
    data: [
      { status: "WAITING" },
      { status: "UPCOMING" },
      { status: "COMPLETED" },
    ],
    skipDuplicates: true,
  });

  // Seed Appointment Types
  const appointmentTypes = await prisma.appointmentType.createMany({
    data: [{ type: "Consultation" }, { type: "Follow-up" }],
    skipDuplicates: true,
  });

  // Seed Appointments
  const appointments = await prisma.appointment.createMany({
    data: [
      {
        patientId: 1,
        doctorId: 1,
        date: new Date(),
        time: new Date(),
        statusId: 1,
        typeId: 1,
      },
      {
        patientId: 2,
        doctorId: 2,
        date: new Date(),
        time: new Date(),
        statusId: 2,
        typeId: 2,
      },
    ],
  });

  // Seed Payment Statuses
  const paymentStatuses = await prisma.paymentStatus.createMany({
    data: [{ status: "PENDING" }, { status: "PAID" }, { status: "CANCELLED" }],
    skipDuplicates: true,
  });

  // Seed Payments
  const payments = await prisma.payment.createMany({
    data: [
      {
        patientId: 1,
        description: "Consultation Fee",
        amount: 100.0,
        doctorId: 1,
        date: new Date(),
        time: new Date(),
        statusId: 2,
      },
      {
        patientId: 2,
        description: "Follow-up Fee",
        amount: 80.0,
        doctorId: 2,
        date: new Date(),
        time: new Date(),
        statusId: 1,
      },
    ],
  });

  // Seed Queue Entries
  const queues = await prisma.queue.createMany({
    data: [
      {
        patientId: 1,
        status: "WAITING",
        estimatedWaitTime: 15,
        arrivalTime: new Date(),
        timeWaited: 0,
        estimatedTimeToDoctor: 15,
      },
      {
        patientId: 2,
        status: "IN_PROGRESS",
        estimatedWaitTime: 10,
        arrivalTime: new Date(),
        timeWaited: 5,
        estimatedTimeToDoctor: 5,
      },
    ],
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
