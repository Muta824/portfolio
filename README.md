# Yuta Nakamura | Full-Stack Portfolio

## Overview

This repository contains my full-stack portfolio built with **Next.js**, **TypeScript**, and **PostgreSQL**.  
認証、データベース、API、UI設計など、フルスタック開発の主要要素を一通り実装しています。

ポートフォリオには以下のアプリを統合しています：

- TOEICスコア自動計算アプリ
- Todoアプリ
- 技術ブログ
- ストリーミング検索アプリ（TMDB API）
- AIチャットボット（Gemini API）

**より詳細な仕様やアーキテクチャの説明は、以下のChatBotに質問できます：**  
https://www.yuuta-nakamura.com/chat_bot

---

## Key Features 

- **フルスタック構成**：Next.js App Router + NextAuth + Prisma + PostgreSQL
- **認証実装**：Email/Password, GitHub OAuth, Google OAuth
- **API設計**：Next.js API Routes + Zodでのスキーマバリデーション
- **DBモデリング**：User / Blog / Todo / TOEIC / Searchログなど複数モデルを管理
- **UI/UX**：Tailwind CSS + Material UI + Framer Motion
- **外部API連携**：TMDB、Gemini API

---

## Tech Stack

**Frontend**
- Next.js / React
- TypeScript
- Tailwind CSS / Material UI / Framer Motion

**Backend**
- Next.js API Routes
- NextAuth.js
- Prisma
- PostgreSQL

**Other**
- Zod
- bcrypt
- date-fns

---

## Architecture

プロジェクトはAtomic Designおよび機能単位（features-based）で構成されています。

```
src/  
├── app/  
├── components/ (Atomic Design)  
├── features/  
├── lib/  
└── types/
```

**各機能の設計意図やAPIの仕組みなどの詳細はChatBotで解説します：**  
https://www.yuuta-nakamura.com/chat_bot

---

## Setup

```
git clone <repo> 
npm install 
npm run dev
```
環境変数などの詳細はこちら：  
`/docs/env.md`

---

## Screenshots



---

## Development Highlights

- Prisma Accelerateを利用した接続最適化
- データモデリング・マイグレーションの実践
- 認証ミドルウェアでの保護ルート設計
- BlogのMarkdownレンダリング
- TMDBとGemini API連携によるAPI設計

---

## Author

**Yuta Nakamura**  
Portfolio: [https://www.yuuta-nakamura.com/](https://www.yuuta-nakamura.com/)  
GitHub: [https://github.com/Muta824](https://github.com/Muta824)

---
