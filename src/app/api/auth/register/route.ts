import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma/prisma"
import { hashPassword } from "@/lib/auth-utils"
import { signInSchema } from "@/lib/zod"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // バリデーション
    const validatedData = signInSchema.parse(body)
    
    // 既存ユーザーの確認
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: "このメールアドレスは既に登録されています" },
        { status: 400 }
      )
    }
    
    // パスワードをハッシュ化
    const hashedPassword = await hashPassword(validatedData.password)
    
    // ユーザーを作成
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.email.split('@')[0], // デフォルト名としてメールアドレスの@前を使用
      }
    })
    
    return NextResponse.json(
      { 
        message: "ユーザーが正常に作成されました",
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      },
      { status: 201 }
    )
    
  } catch (error) {
    console.error("登録エラー:", error)
    
    if (error instanceof Error && error.message.includes("Invalid email")) {
      return NextResponse.json(
        { error: "無効なメールアドレスです" },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: "ユーザー登録に失敗しました" },
      { status: 500 }
    )
  }
} 