import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const globalForPrisma = global as unknown as {
    prisma: PrismaClient
}

// ビルド時はAccelerateを無効化（エンジンのダウンロードが不要になる）
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                    process.env.NODE_ENV === 'production'

const prisma = globalForPrisma.prisma || (
    isBuildTime 
        ? new PrismaClient()  // ビルド時は通常のPrisma Client
        : new PrismaClient().$extends(withAccelerate())  // 実行時はAccelerate使用
)

globalForPrisma.prisma = prisma

export default prisma