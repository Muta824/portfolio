import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  // 認証プロバイダーを設定
  providers: [
    CredentialsProvider({
      // 認証プロバイダーの名前
      name: 'Credentials',
      credentials: {
        // メールアドレスの入力フィールド
        email: { label: "Email", type: "email" },
        // パスワードの入力フィールド
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // メールアドレスとパスワードが入力されていない場合は認証失敗
        if (!credentials?.email || !credentials?.password) return null;
        
        // メールアドレスに一致するユーザーをデータベースから取得
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        
        // メールアドレスに一致するユーザーが存在しない場合は認証失敗
        if (!user) return null;
        
        // ここでパスワードの検証を行う
        // 実際の実装では、bcrypt等を使用してパスワードを検証してください
        
        // パスワードが一致する場合はユーザー情報を返す
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        };
      }
    })
  ],
  // JWT(JSON Web Token)を使用してセッションを管理
  session: {
    strategy: 'jwt'
  },
  // サインインページのパスを設定
  pages: {
    signIn: '/auth/signin'
  }
};