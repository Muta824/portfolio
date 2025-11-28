import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/lib/auth-utils'
import * as fs from 'fs'
import * as path from 'path'

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
        '公式TOEIC Listening & Reading 問題集11 TEST1',
        '公式TOEIC Listening & Reading 問題集11 TEST2',
        '公式TOEIC Listening & Reading 問題集10 TEST1',
        '公式TOEIC Listening & Reading 問題集10 TEST2',
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

    // Create AnswerSet for 公式TOEIC Listening & Reading 問題集11 TEST1
    const testSet11Test1 = await prisma.testSet.findFirst({
        where: { name: '公式TOEIC Listening & Reading 問題集11 TEST1' },
    })

    if (testSet11Test1) {
        const existingAnswerSet = await prisma.answerSet.findFirst({
            where: { testSetId: testSet11Test1.id },
        })

        if (!existingAnswerSet) {
            // Read answer data from JSON file
            const answerDataPath = path.join(__dirname, '..', 'data', 'answer-set-11-test1.json')
            const answerData = JSON.parse(fs.readFileSync(answerDataPath, 'utf-8')) as Record<string, string>

            // Filter out empty answers and convert to Record<number, string>
            const correctAnswers: Record<number, string> = {}
            for (const [questionId, answer] of Object.entries(answerData)) {
                if (answer && answer.trim() !== '') {
                    correctAnswers[parseInt(questionId, 10)] = answer
                }
            }

            // Create AnswerSet
            await prisma.answerSet.create({
                data: {
                    testSetId: testSet11Test1.id,
                    name: '模範解答',
                    userId: adminUser.id,
                    answers: {
                        create: Object.entries(correctAnswers).map(([questionId, correctAnswer]) => ({
                            questionId: parseInt(questionId, 10),
                            correctAnswer,
                        })),
                    },
                },
            })
            console.log('✅ Created answer set for: 公式TOEIC Listening & Reading 問題集11 TEST1')
        } else {
            console.log('⏭️  Answer set already exists for: 公式TOEIC Listening & Reading 問題集11 TEST1')
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