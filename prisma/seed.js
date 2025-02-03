const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Sex Records
  const maleSex = await prisma.sex.create({
    data: { gender: 'MALE' },
  });
  const femaleSex = await prisma.sex.create({
    data: { gender: 'FEMALE' },
  });

  // Create AppointmentStatus Records
  const waitingStatus = await prisma.appointmentStatus.create({
    data: { status: 'WAITING' },
  });
  const upcomingStatus = await prisma.appointmentStatus.create({
    data: { status: 'UPCOMING' },
  });
  const completedStatus = await prisma.appointmentStatus.create({
    data: { status: 'COMPLETED' },
  });

  // Create AppointmentType Records
  const consultationType = await prisma.appointmentType.create({
    data: { type: 'CONSULTATION' },
  });
  const followUpType = await prisma.appointmentType.create({
    data: { type: 'FOLLOW_UP' },
  });

  // Create PaymentStatus Records
  const pendingPaymentStatus = await prisma.paymentStatus.create({
    data: { status: 'PENDING' },
  });
  const paidPaymentStatus = await prisma.paymentStatus.create({
    data: { status: 'PAID' },
  });
  const cancelledPaymentStatus = await prisma.paymentStatus.create({
    data: { status: 'CANCELLED' },
  });

  // Create Specialty Records
  const cardiologySpecialty = await prisma.specialty.create({
    data: { name: 'Cardiology' },
  });
  const dermatologySpecialty = await prisma.specialty.create({
    data: { name: 'Dermatology' },
  });

  // Create Doctor Records
  const doctor1 = await prisma.doctor.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      specialtyId: cardiologySpecialty.id,
    },
  });
  const doctor2 = await prisma.doctor.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      specialtyId: dermatologySpecialty.id,
    },
  });

  // Create Patient Records
  const patient1 = await prisma.patient.create({
    data: {
      firstName: 'Alice',
      lastName: 'Johnson',
      phone: '123-456-7890',
      email: 'alice@example.com',
      age: 30,
      sexId: femaleSex.id,
    },
  });
  const patient2 = await prisma.patient.create({
    data: {
      firstName: 'Bob',
      lastName: 'Brown',
      phone: '987-654-3210',
      email: 'bob@example.com',
      age: 45,
      sexId: maleSex.id,
    },
  });

  // Create Action Records
  const action1 = await prisma.action.create({
    data: {
      name: 'Initial Consultation',
      patientId: patient1.id,
    },
  });
  const action2 = await prisma.action.create({
    data: {
      name: 'Follow-Up Visit',
      patientId: patient2.id,
    },
  });

  // Create Appointment Records
  const appointment1 = await prisma.appointment.create({
    data: {
      patientId: patient1.id,
      doctorId: doctor1.id,
      typeId: consultationType.id,
      actionId: action1.id,
      statusId: waitingStatus.id,
      date: new Date('2023-11-01'),
      time: new Date('2023-11-01T10:00:00'),
    },
  });
  const appointment2 = await prisma.appointment.create({
    data: {
      patientId: patient2.id,
      doctorId: doctor2.id,
      typeId: followUpType.id,
      actionId: action2.id,
      statusId: upcomingStatus.id,
      date: new Date('2023-11-02'),
      time: new Date('2023-11-02T14:00:00'),
    },
  });

  // Create Queue Records
  const queue1 = await prisma.queue.create({
    data: {
      patientId: patient1.id,
      appointmentId: appointment1.id,
      estimatedWaitTime: 30,
      estimatedTimeToDoctor: 15,
      status: 'WAITING',
    },
  });
  const queue2 = await prisma.queue.create({
    data: {
      patientId: patient2.id,
      appointmentId: appointment2.id,
      estimatedWaitTime: 45,
      estimatedTimeToDoctor: 20,
      status: 'IN_PROGRESS',
    },
  });

  // Create Payment Records
  const payment1 = await prisma.payment.create({
    data: {
      patientId: patient1.id,
      doctorId: doctor1.id,
      statusId: pendingPaymentStatus.id,
      actionId: action1.id,
      amount: 150.0,
      date: new Date('2023-11-01'),
      time: new Date('2023-11-01T10:30:00'),
    },
  });
  const payment2 = await prisma.payment.create({
    data: {
      patientId: patient2.id,
      doctorId: doctor2.id,
      statusId: paidPaymentStatus.id,
      actionId: action2.id,
      amount: 200.0,
      date: new Date('2023-11-02'),
      time: new Date('2023-11-02T14:30:00'),
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });