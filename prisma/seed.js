const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  try {
    // Delete all existing records in reverse order of dependencies
    await prisma.queue.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.appointment.deleteMany();
    await prisma.patient.deleteMany();
    await prisma.doctor.deleteMany();
    await prisma.specialty.deleteMany();
    await prisma.sex.deleteMany();
    await prisma.appointmentType.deleteMany();
    await prisma.appointmentStatus.deleteMany();
    await prisma.paymentStatus.deleteMany();

    console.log("Deleted all existing records.");

    // Create Specialty records
    const specialty1 = await prisma.specialty.create({
      data: { name: "Cardiology" },
    });
    const specialty2 = await prisma.specialty.create({
      data: { name: "Dermatology" },
    });

    // Create Doctor records
    const doctor1 = await prisma.doctor.create({
      data: {
        firstName: "John",
        lastName: "Doe",
        specialtyId: specialty1.id,
      },
    });
    const doctor2 = await prisma.doctor.create({
      data: {
        firstName: "Jane",
        lastName: "Smith",
        specialtyId: specialty2.id,
      },
    });

    // Create Sex records
    const sex1 = await prisma.sex.create({
      data: { gender: "MALE" },
    });
    const sex2 = await prisma.sex.create({
      data: { gender: "FEMALE" },
    });

    // Create Patient records
    const patient1 = await prisma.patient.create({
      data: {
        firstName: "Alice",
        lastName: "Johnson",
        age: 30,
        sexId: sex2.id,
      },
    });
    const patient2 = await prisma.patient.create({
      data: {
        firstName: "Bob",
        lastName: "Brown",
        age: 45,
        sexId: sex1.id,
      },
    });

    // Create AppointmentType and AppointmentStatus records
    const appointmentType1 = await prisma.appointmentType.create({
      data: { type: "Consultation" },
    });
    const appointmentType2 = await prisma.appointmentType.create({
      data: { type: "Follow-up" },
    });

    const appointmentStatus1 = await prisma.appointmentStatus.create({
      data: { status: "UPCOMING" },
    });
    const appointmentStatus2 = await prisma.appointmentStatus.create({
      data: { status: "COMPLETED" },
    });

    // Create Appointment records
    const appointment1 = await prisma.appointment.create({
      data: {
        patientId: patient1.id,
        doctorId: doctor1.id,
        typeId: appointmentType1.id,
        statusId: appointmentStatus1.id,
        date: new Date(),
        time: new Date(),
      },
    });
    const appointment2 = await prisma.appointment.create({
      data: {
        patientId: patient2.id,
        doctorId: doctor2.id,
        typeId: appointmentType2.id,
        statusId: appointmentStatus2.id,
        date: new Date(),
        time: new Date(),
      },
    });

    // Create PaymentStatus records
    const paymentStatus1 = await prisma.paymentStatus.create({
      data: { status: "PENDING" },
    });
    const paymentStatus2 = await prisma.paymentStatus.create({
      data: { status: "PAID" },
    });

    // Create Payment records
    const payment1 = await prisma.payment.create({
      data: {
        patientId: patient1.id,
        doctorId: doctor1.id,
        amount: 150.0,
        statusId: paymentStatus1.id,
        date: new Date(),
        time: new Date(),
      },
    });
    const payment2 = await prisma.payment.create({
      data: {
        patientId: patient2.id,
        doctorId: doctor2.id,
        amount: 200.0,
        statusId: paymentStatus2.id,
        date: new Date(),
        time: new Date(),
      },
    });

    // Create Queue records
    const queue1 = await prisma.queue.create({
      data: {
        patientId: patient1.id,
        appointmentId: appointment1.id,
        estimatedWaitTime: 30,
        estimatedTimeToDoctor: 15,
        status: "WAITING",
        date: new Date(),
        time: new Date(),
      },
    });
    const queue2 = await prisma.queue.create({
      data: {
        patientId: patient2.id,
        appointmentId: appointment2.id,
        estimatedWaitTime: 20,
        estimatedTimeToDoctor: 10,
        status: "IN_PROGRESS",
        date: new Date(),
        time: new Date(),
      },
    });

    console.log("Seeding successful.");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
