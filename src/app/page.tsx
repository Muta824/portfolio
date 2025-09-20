import { Navigation } from '@/components/organisms/Navigation';
import { SkillsSection } from '@/components/organisms/SkillsSection';
import { AppSection } from '@/components/organisms/appSection';
import './globals.css';

export default function Page() {
    return (
        <>
            {/* ナビゲーション */}
            <Navigation />
            
            {/* 技術スキルセクション */}
            <SkillsSection />

            {/* アプリケーションセクション */}
            <AppSection />
        </>
  )
}
