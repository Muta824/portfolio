import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const accelerateUrl = process.env.ACCELERATE_DATABASE_URL

if (!accelerateUrl) {
    throw new Error('ACCELERATE_DATABASE_URL is required to initialize PrismaClient.')
}

const createPrismaClient = () =>
    new PrismaClient({
        datasources: {
            db: {
                url: accelerateUrl,
            },
        },
    }).$extends(withAccelerate())

type PrismaClientWithAccelerate = ReturnType<typeof createPrismaClient>

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClientWithAccelerate }

const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}

export default prisma