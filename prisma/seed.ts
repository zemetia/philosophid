import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Start seeding...')

  // Security configuration: salt rounds for bcrypt
  const SALT_ROUNDS = 10

  // 1. Super Admin
  const superAdminPassword = await bcrypt.hash('PhiloSuperAdmin1708#', SALT_ROUNDS)
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@philosoph.id' },
    update: {},
    create: {
      email: 'superadmin@philosoph.id',
      password: superAdminPassword,
      firebaseUid: 'seed-uid-super-admin',
      username: 'superadmin',
      name: 'Super Admin',
      role: Role.SUPER_ADMIN,
      onboardingCompleted: true,
      bio: 'The architect of the universal mind.',
    },
  })
  console.log(`✅ Seeded Super Admin: ${superAdmin.email}`)

  // 2. Dummy Administrative Accounts
  const adminPassword = await bcrypt.hash('PhiloAdmin123!', SALT_ROUNDS)
  const moderatorPassword = await bcrypt.hash('PhiloMod123!', SALT_ROUNDS)
  const judgePassword = await bcrypt.hash('PhiloJudge123!', SALT_ROUNDS)

  const dummyUsers = [
    {
      email: 'admin@philosoph.id',
      password: adminPassword,
      firebaseUid: 'seed-uid-admin',
      username: 'admin',
      name: 'System Admin',
      role: Role.ADMIN,
    },
    {
      email: 'moderator@philosoph.id',
      password: moderatorPassword,
      firebaseUid: 'seed-uid-moderator',
      username: 'moderator',
      name: 'Content Moderator',
      role: Role.MODERATOR,
    },
    {
      email: 'judge@philosoph.id',
      password: judgePassword,
      firebaseUid: 'seed-uid-judge',
      username: 'judge',
      name: 'Competition Judge',
      role: Role.JUDGE,
    },
  ]

  for (const userData of dummyUsers) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        ...userData,
        onboardingCompleted: true,
        bio: `Official ${userData.role.toLowerCase()} account for Philosophid.`,
      },
    })
    console.log(`✅ Seeded ${userData.role}: ${user.email}`)
  }

  console.log('🎉 Seeding finished.')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
