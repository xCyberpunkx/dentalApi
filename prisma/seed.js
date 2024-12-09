const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seed Genders
  console.log("Seeding genders...");
  await prisma.sex.createMany({
    data: [
      { gender: 'MALE' },
      { gender: 'FEMALE' },
    ],
    skipDuplicates: true,
  });

  // Seed Appointment Statuses
  console.log("Seeding appointment statuses...");
  await prisma.appointmentStatus.createMany({
    data: [

      { status: 'WAITING' },
      { status: 'UPCOMING' },
      { status: 'COMPLETED' },
           ],

    skipDuplicates: true,

  });

  // Seed Appointment Types
  console.log("Seeding appointment types...");
  await prisma.appointmentType.createMany({
    data: [
      { type: 'Consultation' },
      { type: 'Follow-up' },
      { type: 'Emergency' },
      { type: 'Routine Check-up' },
      { type: 'Surgery' },
    ],
    skipDuplicates: true,
  });

  // Seed Payment Statuses
  console.log("Seeding payment statuses...");
  await prisma.paymentStatus.createMany({
    data: [
      { status: 'PENDING' },
      { status: 'PAID' },
      { status: 'CANCELLED' },
    
    ],
    skipDuplicates: true,
  });

  // Seed Specialties
  console.log("Seeding specialties...");
  await prisma.specialty.createMany({
    data: [
      { name: 'Dentist' },
      { name: 'Orthodontist' },
      { name: 'Oral Surgeon' },
      { name: 'Periodontist' },
      { name: 'Pediatric Dentist' },
    ],
    skipDuplicates: true,
  });

  // Seed Doctors
  console.log("Seeding doctors...");
  await prisma.doctor.createMany({
    data: [
      { firstName: 'John', lastName: 'Doe', specialtyId: 1 },
      { firstName: 'Jane', lastName: 'Smith', specialtyId: 2 },
      { firstName: 'Emily', lastName: 'Brown', specialtyId: 3 },
      { firstName: 'Michael', lastName: 'Johnson', specialtyId: 4 },
      { firstName: 'Sarah', lastName: 'Williams', specialtyId: 5 },
    ],
    skipDuplicates: true,
  });

  // Seed Patients
  console.log("Seeding patients...");
  await prisma.patient.createMany({
    data: [
      { firstName: 'Alice', lastName: 'Green', age: 30, sexId: 1, phone: '1234567890', email: 'alice@example.com', medicalHistory: 'No significant history' },
      { firstName: 'Bob', lastName: 'White', age: 40, sexId: 1, phone: '9876543210', email: 'bob@example.com', medicalHistory: 'Diabetes' },
      { firstName: 'Charlie', lastName: 'Black', age: 25, sexId: 2, phone: '1231231234', email: 'charlie@example.com', medicalHistory: 'Asthma' },
      { firstName: 'Diana', lastName: 'Gray', age: 35, sexId: 2, phone: '3213214321', email: 'diana@example.com', medicalHistory: 'Hypertension' },
      { firstName: 'Edward', lastName: 'Blue', age: 45, sexId: 1, phone: '4564564567', email: 'edward@example.com', medicalHistory: 'None' },
    ],
    skipDuplicates: true,
  });

  console.log("Seeding completed!");
}

main()
  .then(() => {
    console.log("Seed data successfully inserted!");
  })
  .catch((e) => {
    console.error("Error while seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
