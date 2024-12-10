const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Seed Sex (Gender)
  console.log("Seeding genders...");
  const male = await prisma.sex.upsert({
    where: { gender: 'MALE' },
    update: {},
    create: { gender: 'MALE' }
  });
  const female = await prisma.sex.upsert({
    where: { gender: 'FEMALE' },
    update: {},
    create: { gender: 'FEMALE' }
  });

  // Seed Patients
  console.log("Seeding patients...");
  const patients = await prisma.patient.createMany({
    data: [
      {
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        sexId: male.id,
        phone: '1234567890',
        email: 'john.doe@example.com',
        medicalHistory: 'No significant medical history'
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        age: 25,
        sexId: female.id,
        phone: '9876543210',
        email: 'jane.smith@example.com',
        medicalHistory: 'Allergic to penicillin'
      },
      {
        firstName: 'Michael',
        lastName: 'Johnson',
        age: 40,
        sexId: male.id,
        phone: '5555555555',
        email: 'michael.johnson@example.com',
        medicalHistory: 'High blood pressure'
      },
      {
        firstName: 'Emily',
        lastName: 'Davis',
        age: 28,
        sexId: female.id,
        phone: '3333333333',
        email: 'emily.davis@example.com',
        medicalHistory: 'Asthma'
      }
    ],
    skipDuplicates: true
  });

  // Seed Queue Entries
  console.log("Seeding queue entries...");
  const firstPatient = await prisma.patient.findFirst();
  const secondPatient = await prisma.patient.findMany({ skip: 1, take: 1 });

  await prisma.queue.createMany({
    data: [
      {
        patientId: firstPatient.id,
        status: 'WAITING',
        estimatedWaitTime: 20,
        arrivalTime: new Date(),
        timeWaited: 10,
        estimatedTimeToDoctor: 5
      },
      {
        patientId: firstPatient.id,
        status: 'IN_PROGRESS',
        estimatedWaitTime: 15,
        arrivalTime: new Date(),
        timeWaited: 5,
        estimatedTimeToDoctor: 0
      },
      {
        patientId: firstPatient.id,
        status: 'COMPLETED',
        estimatedWaitTime: 0,
        arrivalTime: new Date(),
        timeWaited: 0,
        estimatedTimeToDoctor: 0
      },
      {
        patientId: secondPatient[0].id,
        status: 'SKIPPED',
        estimatedWaitTime: 0,
        arrivalTime: new Date(),
        timeWaited: 0,
        estimatedTimeToDoctor: 0
      },
      {
        patientId: secondPatient[0].id,
        status: 'CANCELLED',
        estimatedWaitTime: 0,
        arrivalTime: new Date(),
        timeWaited: 0,
        estimatedTimeToDoctor: 0
      }
    ],
    skipDuplicates: true
  });

  // Seed Doctor Specialties
  console.log("Seeding doctor specialties...");
  const specialties = await prisma.specialty.createMany({
    data: [
      { name: 'General Dentistry' },
      { name: 'Orthodontics' },
      { name: 'Oral Surgery' }
    ],
    skipDuplicates: true
  });

  // Seed Appointment Types
  console.log("Seeding appointment types...");
  const appointmentTypes = await prisma.appointmentType.createMany({
    data: [
      { type: 'Consultation' },
      { type: 'Check-up' },
      { type: 'Cleaning' },
      { type: 'Surgery' }
    ],
    skipDuplicates: true
  });

  // Seed Appointment Statuses
  console.log("Seeding appointment statuses...");
  await prisma.appointmentStatus.createMany({
    data: [
      { status: 'WAITING' },
      { status: 'UPCOMING' },
      { status: 'COMPLETED' }
    ],
    skipDuplicates: true
  });

  // Seed Payment Statuses
  console.log("Seeding payment statuses...");
  await prisma.paymentStatus.createMany({
    data: [
      { status: 'PENDING' },
      { status: 'PAID' },
      { status: 'CANCELLED' }
    ],
    skipDuplicates: true
  });

  // Seed Doctors
  console.log("Seeding doctors...");
  const generalDentistry = await prisma.specialty.findFirst({ where: { name: 'General Dentistry' } });
  const orthodontics = await prisma.specialty.findFirst({ where: { name: 'Orthodontics' } });
  const oralSurgery = await prisma.specialty.findFirst({ where: { name: 'Oral Surgery' } });

  const doctors = await prisma.doctor.createMany({
    data: [
      {
        firstName: 'Dr. Ahmed',
        lastName: 'Ben Ali',
        specialtyId: generalDentistry.id
      },
      {
        firstName: 'Dr. Sarah',
        lastName: 'Khaled',
        specialtyId: orthodontics.id
      },
      {
        firstName: 'Dr. Ali',
        lastName: 'Mansour',
        specialtyId: oralSurgery.id
      }
    ],
    skipDuplicates: true
  });

  // Seed Appointments
  console.log("Seeding appointments...");
  const firstDoctor = await prisma.doctor.findFirst();
  const firstPatientForAppointment = await prisma.patient.findFirst();

  await prisma.appointment.createMany({
    data: [
      {
        patientId: firstPatientForAppointment.id,
        doctorId: firstDoctor.id,
        date: new Date('2024-12-10'),
        time: new Date('2024-12-10T09:00:00'),
        statusId: 1, // Assuming 'WAITING' status
        typeId: 1,   // Assuming 'Consultation' type
        additionalNotes: 'Routine consultation'
      },
      {
        patientId: firstPatientForAppointment.id,
        doctorId: firstDoctor.id,
        date: new Date('2024-12-11'),
        time: new Date('2024-12-11T10:00:00'),
        statusId: 2, // Assuming 'UPCOMING' status
        typeId: 2,   // Assuming 'Check-up' type
        additionalNotes: 'Follow-up appointment'
      }
    ],
    skipDuplicates: true
  });

  // Seed Payments
  console.log("Seeding payments...");
  const paymentStatuses = await prisma.paymentStatus.findMany();
  const paymentStatusPaid = paymentStatuses.find(status => status.status === 'PAID');
  const paymentStatusPending = paymentStatuses.find(status => status.status === 'PENDING');

  await prisma.payment.createMany({
    data: [
      {
        patientId: firstPatientForAppointment.id,
        doctorId: firstDoctor.id,
        description: 'Consultation fee',
        amount: 100.0,
        date: new Date('2024-12-10'),
        time: new Date('2024-12-10T09:00:00'),
        statusId: paymentStatusPaid.id
      },
      {
        patientId: firstPatientForAppointment.id,
        doctorId: firstDoctor.id,
        description: 'Follow-up check-up fee',
        amount: 50.0,
        date: new Date('2024-12-11'),
        time: new Date('2024-12-11T10:00:00'),
        statusId: paymentStatusPending.id
      }
    ],
    skipDuplicates: true
  });

  console.log("Seeding completed!");
}

main()
    .catch(e => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
