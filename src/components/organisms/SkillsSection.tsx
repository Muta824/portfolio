import React from 'react';
import { SkillCard } from '../molecules/SkillCard';
import { RiNextjsFill } from "react-icons/ri";
import { FaReact } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { SiPrisma } from "react-icons/si";
import { DiPostgresql } from "react-icons/di";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaGithub, FaJava } from "react-icons/fa";
import { BsCCircle } from "react-icons/bs";

// 公式SVGアイコン
const Icons = {
    Nextjs: <RiNextjsFill />,
    React: <FaReact />,
    TypeScript: <BiLogoTypescript />,
    Prisma: <SiPrisma />,
    PostgreSQL: <DiPostgresql />,
    TailwindCss: <RiTailwindCssFill />,
    GitHub: <FaGithub />,
    C: <BsCCircle />,
    Java: <FaJava />,
};

const skillsData = [
    {
        name: 'C',
        icon: Icons.C,
        level: 3,
    },
    {
        name: 'Java',
        icon: Icons.Java,
        level: 2.5,
    },
    {
        name: 'TypeScript',
        icon: Icons.TypeScript,
        level: 3,
    },
    {
        name: 'React',
        icon: Icons.React,
        level: 3,
    },
    {
        name: 'Next.js',
        icon: Icons.Nextjs,
        level: 3,
    },
    {
        name: 'PostgreSQL',
        icon: Icons.PostgreSQL,
        level: 1.5,
    },
    {
        name: 'Prisma',
        icon: Icons.Prisma,
        level: 2,
    },
    {
        name: 'Tailwind CSS',
        icon: Icons.TailwindCss,
        level: 3,
    },
    {
        name: 'Git/GitHub',
        icon: Icons.GitHub,
        level: 2,
    }
];

export function SkillsSection() {
  return (
        <section id="skills" className="">
            <div className="mx-auto px-4">
                <div className="mt-24 mb-8 text-center">
                    <div className="inline-flex px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-2xl text-white font-medium">
                        🚀 Skills
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skillsData.map((skill) => (
                        <SkillCard
                            key={skill.name}
                            name={skill.name}
                            icon={skill.icon}
                            level={skill.level}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}; 