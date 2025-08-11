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