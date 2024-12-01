const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Seed Sex
  const male = await prisma.sex.upsert({
    where: { gender: "Male" },
    update: {},
    create: { gender: "Male" },
  });

  const female = await prisma.sex.upsert({
    where: { gender: "Female" },
    update: {},
    create: { gender: "Female" },
  });

  // Seed Appointment Statuses
  const appointmentStatuses = await Promise.all(
    ["Scheduled", "Completed", "Cancelled"].map((status) =>
      prisma.appointmentStatus.upsert({
        where: { status },
        update: {},
        create: { status },
      })
    )
  );

  // Seed Payment Statuses
  const paymentStatuses = await Promise.all(
    ["Pending", "Paid", "Failed"].map((status) =>
      prisma.paymentStatus.upsert({
        where: { status },
        update: {},
        create: { status },
      })
    )
  );

  // Seed Appointment Types
  const appointmentTypes = await Promise.all(
    ["Consultation", "Checkup", "Emergency"].map((type) =>
      prisma.appointmentType.upsert({
        where: { type },
        update: {},
        create: { type },
      })
    )
  );

  // Seed Specialties
  const specialties = await Promise.all(
    ["General Physician", "Dentist", "Cardiologist"].map((name) =>
      prisma.specialty.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  // Seed Doctors
  const doctors = await Promise.all(
    [
      { firstName: "Alice", lastName: "Smith", specialtyId: specialties[0].id },
      { firstName: "Bob", lastName: "Johnson", specialtyId: specialties[1].id },
    ].map((doctor) => prisma.doctor.create({ data: doctor }))
  );

  // Seed Patients
  const patients = await Promise.all(
    [
      {
        firstName: "Charlie",
        lastName: "Brown",
        age: 25,
        sexId: male.id,
        phone: "123-456-7890",
        email: "charlie@example.com",
      },
      {
        firstName: "Diana",
        lastName: "Prince",
        age: 30,
        sexId: female.id,
        phone: "987-654-3210",
        email: "diana@example.com",
      },
    ].map((patient) => prisma.patient.create({ data: patient }))
  );

  // Seed Appointments
  const appointments = await Promise.all(
    [
      {
        patientId: patients[0].id,
        doctorId: doctors[0].id,
        typeId: appointmentTypes[0].id,
        date: "2024-12-01",
        time: "10:00",
        statusId: appointmentStatuses[0].id,
      },
      {
        patientId: patients[1].id,
        doctorId: doctors[1].id,
        typeId: appointmentTypes[1].id,
        date: "2024-12-02",
        time: "14:00",
        statusId: appointmentStatuses[1].id,
      },
    ].map((appointment) => prisma.appointment.create({ data: appointment }))
  );

  // Seed Payments
  const payments = await Promise.all(
    [
      {
        patientId: patients[0].id,
        doctorId: doctors[0].id,
        description: "Consultation Fee",
        amount: 100.0,
        date: "2024-12-01",
        time: "10:30",
        statusId: paymentStatuses[1].id,
      },
      {
        patientId: patients[1].id,
        doctorId: doctors[1].id,
        description: "Checkup Fee",
        amount: 200.0,
        date: "2024-12-02",
        time: "15:00",
        statusId: paymentStatuses[0].id,
      },
    ].map((payment) => prisma.payment.create({ data: payment }))
  );

  // Seed Queue
  const queues = await Promise.all(
    [
      {
        patientId: patients[0].id,
        status: "Waiting",
        estimatedWaitTime: 15,
        arrivalTime: new Date(),
        timeWaited: 0,
        estimatedTimeToDoctor: 15,
      },
      {
        patientId: patients[1].id,
        status: "In Progress",
        estimatedWaitTime: 5,
        arrivalTime: new Date(),
        timeWaited: 10,
        estimatedTimeToDoctor: 5,
      },
    ].map((queue) => prisma.queue.create({ data: queue }))
  );

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
