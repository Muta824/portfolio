import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/lib/auth-utils'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 シードデータを作成中...')

    // テストユーザーのパスワードをハッシュ化
    const hashedPassword = await hashPassword('password123')

    // テストユーザーを作成
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

    console.log('✅ テストユーザーを作成しました:', testUser.email)

    // 管理者ユーザーを作成
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

    console.log('✅ 管理者ユーザーを作成しました:', adminUser.email)

    // TestSetを作成（既に存在する場合はスキップ）
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
            console.log('✅ テストセットを作成しました:', testSet.name)
        } else {
            console.log('⏭️  テストセットは既に存在します:', name)
        }
    }

    console.log('🎉 シードデータの作成が完了しました！')
}

main()
    .catch((e) => {
        console.error('❌ シードデータの作成に失敗しました:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })