import { Navigation } from '@/components/organisms/Navigation';
import { SkillsSection } from '@/components/organisms/SkillsSection';
import { AppSection } from '@/components/organisms/appSection';
import Image from 'next/image';
import './globals.css';

export default function Page() {
    return (
        <>
            {/* ナビゲーション */}
            <Navigation />
            
            {/* 技術スキルセクション */}
            <SkillsSection />

            <Image 
                className="mt-20 mx-auto"
                src="https://github.pumbas.net/api/contributions/Muta824?colour=7ACE65" 
                alt="Muta824's GitHub contributions" 
                width={800}
                height={800}
                unoptimized
            />

            {/* アプリケーションセクション */}
            <AppSection />
        </>
    )
}
