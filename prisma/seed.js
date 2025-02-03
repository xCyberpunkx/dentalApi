const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create Sex records
  const maleSex = await prisma.sex.create({ data: { gender: 'MALE' } });
  const femaleSex = await prisma.sex.create({ data: { gender: 'FEMALE' } });

  // Create AppointmentStatus records
  const waitingStatus = await prisma.appointmentStatus.create({ data: { status: 'WAITING' } });
  const upcomingStatus = await prisma.appointmentStatus.create({ data: { status: 'UPCOMING' } });
  const completedStatus = await prisma.appointmentStatus.create({ data: { status: 'COMPLETED' } });

  // Create PaymentStatus records
  const pendingPaymentStatus = await prisma.paymentStatus.create({ data: { status: 'PENDING' } });
  const paidPaymentStatus = await prisma.paymentStatus.create({ data: { status: 'PAID' } });
  const cancelledPaymentStatus = await prisma.paymentStatus.create({ data: { status: 'CANCELLED' } });

  // Create Specialty records
  const cardiologySpecialty = await prisma.specialty.create({ data: { name: 'Cardiology' } });
  const dermatologySpecialty = await prisma.specialty.create({ data: { name: 'Dermatology' } });
  const neurologySpecialty = await prisma.specialty.create({ data: { name: 'Neurology' } });

  // Create Doctor records
  const doctor1 = await prisma.doctor.create({
    data: { firstName: 'John', lastName: 'Doe', specialtyId: cardiologySpecialty.id },
  });
  const doctor2 = await prisma.doctor.create({
    data: { firstName: 'Jane', lastName: 'Smith', specialtyId: dermatologySpecialty.id },
  });
  const doctor3 = await prisma.doctor.create({
    data: { firstName: 'Emily', lastName: 'Davis', specialtyId: neurologySpecialty.id },
  });

  // Create Patient records
  const patient1 = await prisma.patient.create({
    data: {
      firstName: 'Alice',
      lastName: 'Johnson',
      phone: '1234567890',
      email: 'alice@example.com',
      age: 30,
      medicalHistory: 'None',
      sexId: femaleSex.id,
    },
  });
  const patient2 = await prisma.patient.create({
    data: {
      firstName: 'Bob',
      lastName: 'Brown',
      phone: '9876543210',
      email: 'bob@example.com',
      age: 45,
      medicalHistory: 'Hypertension',
      sexId: maleSex.id,
    },
  });
  const patient3 = await prisma.patient.create({
    data: {
      firstName: 'Charlie',
      lastName: 'Wilson',
      phone: '5555555555',
      email: 'charlie@example.com',
      age: 28,
      medicalHistory: 'Asthma',
      sexId: maleSex.id,
    },
  });
  const patient4 = await prisma.patient.create({
    data: {
      firstName: 'Diana',
      lastName: 'Miller',
      phone: '6666666666',
      email: 'diana@example.com',
      age: 50,
      medicalHistory: 'Diabetes',
      sexId: femaleSex.id,
    },
  });

  // Create AppointmentType records
  const consultationType = await prisma.appointmentType.create({ data: { type: 'Consultation' } });
  const followUpType = await prisma.appointmentType.create({ data: { type: 'Follow-up' } });
  const emergencyType = await prisma.appointmentType.create({ data: { type: 'Emergency' } });

  // Create Action records
  const action1 = await prisma.action.create({ data: { name: 'Initial Consultation', patientId: patient1.id } });
  const action2 = await prisma.action.create({ data: { name: 'Follow-up Visit', patientId: patient2.id } });
  const action3 = await prisma.action.create({ data: { name: 'Emergency Checkup', patientId: patient3.id } });
  const action4 = await prisma.action.create({ data: { name: 'Routine Checkup', patientId: patient4.id } });

  // Create Appointment records
  const appointment1 = await prisma.appointment.create({
    data: {
      patientId: patient1.id,
      doctorId: doctor1.id,
      typeId: consultationType.id,
      actionId: action1.id,
      statusId: waitingStatus.id,
      date: new Date('2023-11-01'),
      time: new Date('2023-11-01T10:00:00'),
      additionalNotes: 'First visit',
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
      additionalNotes: 'Follow-up after surgery',
    },
  });
  const appointment3 = await prisma.appointment.create({
    data: {
      patientId: patient3.id,
      doctorId: doctor3.id,
      typeId: emergencyType.id,
      actionId: action3.id,
      statusId: completedStatus.id,
      date: new Date('2023-11-03'),
      time: new Date('2023-11-03T09:00:00'),
      additionalNotes: 'Emergency case',
    },
  });
  const appointment4 = await prisma.appointment.create({
    data: {
      patientId: patient4.id,
      doctorId: doctor1.id,
      typeId: consultationType.id,
      actionId: action4.id,
      statusId: waitingStatus.id,
      date: new Date('2023-11-04'),
      time: new Date('2023-11-04T11:00:00'),
      additionalNotes: 'Annual checkup',
    },
  });

  // Create Queue records
  const queueEntry1 = await prisma.queue.create({
    data: {
      patientId: patient1.id,
      appointmentId: appointment1.id,
      estimatedWaitTime: 30,
      estimatedTimeToDoctor: 15,
      status: 'WAITING',
    },
  });
  const queueEntry2 = await prisma.queue.create({
    data: {
      patientId: patient2.id,
      appointmentId: appointment2.id,
      estimatedWaitTime: 45,
      estimatedTimeToDoctor: 20,
      status: 'IN_PROGRESS',
    },
  });
  const queueEntry3 = await prisma.queue.create({
    data: {
      patientId: patient3.id,
      appointmentId: appointment3.id,
      estimatedWaitTime: 10,
      estimatedTimeToDoctor: 5,
      status: 'COMPLETED',
    },
  });
  const queueEntry4 = await prisma.queue.create({
    data: {
      patientId: patient4.id,
      appointmentId: appointment4.id,
      estimatedWaitTime: 20,
      estimatedTimeToDoctor: 10,
      status: 'WAITING',
    },
  });

  // Create Payment records
  const payment1 = await prisma.payment.create({
    data: {
      patientId: patient1.id,
      doctorId: doctor1.id,
      statusId: pendingPaymentStatus.id,
      actionId: action1.id,
      amount: 150.0,
      date: new Date('2023-11-01'),
      time: new Date('2023-11-01T10:00:00'),
      description: 'Consultation fee',
    },
  });
  const payment2 = await prisma.payment.create({
    data: {
      patientId: patient2.id,
      doctorId: doctor2.id,
      statusId: paidPaymentStatus.id,
      actionId: action2.id,
      amount: 100.0,
      date: new Date('2023-11-02'),
      time: new Date('2023-11-02T14:00:00'),
      description: 'Follow-up fee',
    },
  });
  const payment3 = await prisma.payment.create({
    data: {
      patientId: patient3.id,
      doctorId: doctor3.id,
      statusId: cancelledPaymentStatus.id,
      actionId: action3.id,
      amount: 200.0,
      date: new Date('2023-11-03'),
      time: new Date('2023-11-03T09:00:00'),
      description: 'Emergency fee',
    },
  });
  const payment4 = await prisma.payment.create({
    data: {
      patientId: patient4.id,
      doctorId: doctor1.id,
      statusId: pendingPaymentStatus.id,
      actionId: action4.id,
      amount: 120.0,
      date: new Date('2023-11-04'),
      time: new Date('2023-11-04T11:00:00'),
      description: 'Annual checkup fee',
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });