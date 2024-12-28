const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Seeding started...');

    // Create or find the Male sex entry
    const male = await prisma.sex.findFirst({
      where: { gender: 'MALE' },
    });
    if (!male) {
      await prisma.sex.create({ data: { gender: 'MALE' } });
      console.log('Male sex created');
    } else {
      console.log('Male sex found');
    }

    // Create or find the Female sex entry
    const female = await prisma.sex.findFirst({
      where: { gender: 'FEMALE' },
    });
    if (!female) {
      await prisma.sex.create({ data: { gender: 'FEMALE' } });
      console.log('Female sex created');
    } else {
      console.log('Female sex found');
    }

    // Create a new user only if it doesn't already exist
    const existingUser = await prisma.user.findUnique({
      where: { email: 'superadmin@example.com' },
    });
    let user;
    if (!existingUser) {
      user = await prisma.user.create({
        data: {
          nationalId: 9876543210n,
          email: 'superadmin@example.com',
          password: 'hashedpassword',
          role: 'SUPER_ADMIN',
          firstName: 'John',
          lastName: 'Doe',
          sexId: male.id,
          phone: '1234567890',
          city: 'New York',
          postalCode: '10001',
          address: '123 Main St, NY',
          dateOfBirth: new Date('1985-06-15'),
          isVerified: true,
          verificationToken: 'abc123xyz',
          tokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      console.log('User created:', user);
    } else {
      console.log('User already exists:', existingUser);
      user = existingUser;
    }

    // Create a Dentist entry (reference the user created above)
    const dentist = await prisma.dentist.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id, specialtyId: 1 },
    });
    console.log('Dentist created or found:', dentist);

    // Create a Patient entry (reference the user created above)
    const patient = await prisma.patient.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        medicalHistory: 'No significant medical history',
        allergies: 'None',
        bloodType: 'O+',
        emergencyContact: 'Jane Doe, 9876543211',
        insuranceInfo: 'ABC Health Insurance, Plan #123456',
      },
    });
    console.log('Patient created or found:', patient);

    // Create an AppointmentType entry
    const appointmentType = await prisma.appointmentType.upsert({
      where: { type: 'Checkup' },
      update: {},
      create: {
        type: 'Checkup',
        duration: 30,
        description: 'Regular dental checkup',
        cost: 50.0,
      },
    });
    console.log('Appointment Type created or found:', appointmentType);

    // Check if the appointment already exists
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        patientId: patient.id,
        dentistId: dentist.id,
        date: new Date("2024-12-28T14:46:48.112Z"),
      },
    });

    if (!existingAppointment) {
      const appointment = await prisma.appointment.create({
        data: {
          clinicId: 1,
          patientId: patient.id,
          dentistId: dentist.id,
          date: new Date("2024-12-28T14:46:48.112Z"),
          startTime: new Date("2024-12-28T14:46:48.112Z"),
          endTime: new Date("2024-12-28T15:46:48.112Z"),
          additionalNotes: 'Routine checkup with X-rays',
          status: 'UPCOMING',
          typeId: appointmentType.id,
        },
      });
      console.log('Appointment created:', appointment);
    } else {
      console.log('Appointment already exists:', existingAppointment);
    }

    // Create a Payment entry
    const payment = await prisma.payment.upsert({
      where: { id: 1 }, // Use a unique field, assuming id: 1 for the example
      update: {},
      create: {
        patientId: patient.id,
        treatmentId: null,  // Null for now, you may link treatments later
        dentistId: dentist.id,  // Link to the dentist
        amount: 50.0,
        method: 'Credit Card',
        reference: 'TX123456789',
        description: 'Payment for checkup appointment',
        date: new Date(),
        status: 'PAID',
      },
    });
    console.log('Payment created or found:', payment);

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
