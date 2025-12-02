import { Navigation } from '@/components/organisms/Navigation';
import { SkillsSection } from '@/components/organisms/SkillsSection';
import { AppSection } from '@/components/organisms/appSection';
import { ContributionGraph } from '@/components/organisms/ContributionGraph';
import './globals.css';

export default function Page() {
    return (
        <>
            {/* Navigation */}
            <Navigation />
            
            {/* Skills Section */}
            <SkillsSection />

            {/* GitHub Contributions Graph */}
            <ContributionGraph />

            {/* Application Section */}
            <AppSection />
        </>
    )
}
