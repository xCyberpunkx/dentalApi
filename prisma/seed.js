const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Seed Genders
  console.log("Seeding genders...");
  await prisma.sex.createMany({
    data: [{ gender: "MALE" }, { gender: "FEMALE" }],
    skipDuplicates: true,
  });

  // Seed Appointment Statuses
  console.log("Seeding appointment statuses...");
  await prisma.appointmentStatus.createMany({
    data: [
      { status: "WAITING" },
      { status: "UPCOMING" },
      { status: "COMPLETED" },
    ],
    skipDuplicates: true,
  });

  // Seed Appointment Types
  console.log("Seeding appointment types...");
  await prisma.appointmentType.createMany({
    data: [
      { type: "Consultation" },
      { type: "Follow-up" },
      { type: "Emergency" },
    ],
    skipDuplicates: true,
  });

  // Seed Payment Statuses
  console.log("Seeding payment statuses...");
  await prisma.paymentStatus.createMany({
    data: [{ status: "PENDING" }, { status: "PAID" }, { status: "CANCELLED" }],
    skipDuplicates: true,
  });

  // Seed Specialties
  console.log("Seeding specialties...");
  await prisma.specialty.createMany({
    data: [{ name: "Dentist" }, { name: "Orthodontist" }],
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
