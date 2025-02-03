const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Seed Sex
  const maleSex = await prisma.sex.findUnique({ where: { gender: "MALE" } });
  if (!maleSex) {
    await prisma.sex.create({
      data: { gender: "MALE" },
    });
  }

  const femaleSex = await prisma.sex.findUnique({
    where: { gender: "FEMALE" },
  });
  if (!femaleSex) {
    await prisma.sex.create({
      data: { gender: "FEMALE" },
    });
  }

  // Seed AppointmentStatus
  const waitingStatus = await prisma.appointmentStatus.findUnique({
    where: { status: "WAITING" },
  });
  if (!waitingStatus) {
    await prisma.appointmentStatus.create({
      data: { status: "WAITING" },
    });
  }

  const upcomingStatus = await prisma.appointmentStatus.findUnique({
    where: { status: "UPCOMING" },
  });
  if (!upcomingStatus) {
    await prisma.appointmentStatus.create({
      data: { status: "UPCOMING" },
    });
  }

  const completedStatus = await prisma.appointmentStatus.findUnique({
    where: { status: "COMPLETED" },
  });
  if (!completedStatus) {
    await prisma.appointmentStatus.create({
      data: { status: "COMPLETED" },
    });
  }

  // Seed AppointmentType
  const consultationType = await prisma.appointmentType.findUnique({
    where: { type: "Consultation" },
  });
  if (!consultationType) {
    await prisma.appointmentType.create({
      data: { type: "Consultation" },
    });
  }

  const followUpType = await prisma.appointmentType.findUnique({
    where: { type: "Follow-up" },
  });
  if (!followUpType) {
    await prisma.appointmentType.create({
      data: { type: "Follow-up" },
    });
  }

  const emergencyType = await prisma.appointmentType.findUnique({
    where: { type: "Emergency" },
  });
  if (!emergencyType) {
    await prisma.appointmentType.create({
      data: { type: "Emergency" },
    });
  }

  const routineCheckupType = await prisma.appointmentType.findUnique({
    where: { type: "Routine Checkup" },
  });
  if (!routineCheckupType) {
    await prisma.appointmentType.create({
      data: { type: "Routine Checkup" },
    });
  }

  // Seed Specialty
  const cardiologySpecialty = await prisma.specialty.findUnique({
    where: { name: "Cardiology" },
  });
  if (!cardiologySpecialty) {
    await prisma.specialty.create({
      data: { name: "Cardiology" },
    });
  }

  const dermatologySpecialty = await prisma.specialty.findUnique({
    where: { name: "Dermatology" },
  });
  if (!dermatologySpecialty) {
    await prisma.specialty.create({
      data: { name: "Dermatology" },
    });
  }

  const neurologySpecialty = await prisma.specialty.findUnique({
    where: { name: "Neurology" },
  });
  if (!neurologySpecialty) {
    await prisma.specialty.create({
      data: { name: "Neurology" },
    });
  }

  const orthopedicsSpecialty = await prisma.specialty.findUnique({
    where: { name: "Orthopedics" },
  });
  if (!orthopedicsSpecialty) {
    await prisma.specialty.create({
      data: { name: "Orthopedics" },
    });
  }

  // Seed Doctor
  const doctor1 = await prisma.doctor.findUnique({ where: { id: 1 } });
  if (!doctor1) {
    await prisma.doctor.create({
      data: {
        firstName: "John",
        lastName: "Doe",
        specialtyId: (
          await prisma.specialty.findUnique({ where: { name: "Cardiology" } })
        ).id,
      },
    });
  }

  const doctor2 = await prisma.doctor.findUnique({ where: { id: 2 } });
  if (!doctor2) {
    await prisma.doctor.create({
      data: {
        firstName: "Jane",
        lastName: "Smith",
        specialtyId: (
          await prisma.specialty.findUnique({ where: { name: "Dermatology" } })
        ).id,
      },
    });
  }

  const doctor3 = await prisma.doctor.findUnique({ where: { id: 3 } });
  if (!doctor3) {
    await prisma.doctor.create({
      data: {
        firstName: "Michael",
        lastName: "Brown",
        specialtyId: (
          await prisma.specialty.findUnique({ where: { name: "Neurology" } })
        ).id,
      },
    });
  }

  const doctor4 = await prisma.doctor.findUnique({ where: { id: 4 } });
  if (!doctor4) {
    await prisma.doctor.create({
      data: {
        firstName: "Emily",
        lastName: "Davis",
        specialtyId: (
          await prisma.specialty.findUnique({ where: { name: "Orthopedics" } })
        ).id,
      },
    });
  }

  // Seed Patient
  const patient1 = await prisma.patient.findUnique({
    where: { email: "alice@example.com" },
  });
  if (!patient1) {
    await prisma.patient.create({
      data: {
        firstName: "Alice",
        lastName: "Johnson",
        phone: "1234567890",
        email: "alice@example.com",
        age: 30,
        medicalHistory: "No significant history",
        sexId: (
          await prisma.sex.findUnique({ where: { gender: "FEMALE" } })
        ).id,
      },
    });
  }

  const patient2 = await prisma.patient.findUnique({
    where: { email: "bob@example.com" },
  });
  if (!patient2) {
    await prisma.patient.create({
      data: {
        firstName: "Bob",
        lastName: "Brown",
        phone: "0987654321",
        email: "bob@example.com",
        age: 45,
        medicalHistory: "Hypertension",
        sexId: (await prisma.sex.findUnique({ where: { gender: "MALE" } })).id,
      },
    });
  }

  const patient3 = await prisma.patient.findUnique({
    where: { email: "charlie@example.com" },
  });
  if (!patient3) {
    await prisma.patient.create({
      data: {
        firstName: "Charlie",
        lastName: "Davis",
        phone: "5555555555",
        email: "charlie@example.com",
        age: 25,
        medicalHistory: "Asthma",
        sexId: (await prisma.sex.findUnique({ where: { gender: "MALE" } })).id,
      },
    });
  }

  const patient4 = await prisma.patient.findUnique({
    where: { email: "eve@example.com" },
  });
  if (!patient4) {
    await prisma.patient.create({
      data: {
        firstName: "Eve",
        lastName: "Wilson",
        phone: "7777777777",
        email: "eve@example.com",
        age: 50,
        medicalHistory: "Diabetes",
        sexId: (
          await prisma.sex.findUnique({ where: { gender: "FEMALE" } })
        ).id,
      },
    });
  }

  // Continue seeding other models...
  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
