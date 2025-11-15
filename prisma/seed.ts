import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/lib/auth-utils'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Creating seed data...')

    // Hash password for test user
    const hashedPassword = await hashPassword('password123')

    // Create test user
    const testUser = await prisma.user.upsert({
        where: { email: 'test@example.com' },
        update: {},
        create: {
            email: 'test@example.com',
            name: 'Test User',
            password: hashedPassword,
            role: 'user',
        },
    })

    console.log('✅ Created test user:', testUser.email)

    // Create admin user
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin User',
            password: hashedPassword,
            role: 'admin',
        },
    })

    console.log('✅ Created admin user:', adminUser.email)

    // Create TestSets (skip if already exists)
    const testSetNames = [
        '公式TOEIC Listening & Reading 問題集11',
        '公式TOEIC Listening & Reading 問題集10',
    ]

    for (const name of testSetNames) {
        const existingTestSet = await prisma.testSet.findFirst({
            where: { name },
        })

        if (!existingTestSet) {
            const testSet = await prisma.testSet.create({
                data: {
                    name,
                },
            })
            console.log('✅ Created test set:', testSet.name)
        } else {
            console.log('⏭️  Test set already exists:', name)
        }
    }

    console.log('🎉 Seed data creation completed!')
}

main()
    .catch((e) => {
        console.error('❌ Failed to create seed data:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })