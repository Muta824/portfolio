'use client';

import { Card } from './Card';
import { Text } from '../atoms/Text';
import { Rating } from '@mui/material';

export function SkillCard({
    name,
    icon,
    level,
}: {
    name: string;
    icon: React.JSX.Element;
    level: number;
}) {
    return (
        <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800">
            <div className="flex items-center justify-between">
                <div className="text-4xl">
                    {icon}
                </div>
                <Rating 
                    name="rating"
                    value={level}
                    precision={0.1}
                    size="small"
                    className="p-1 dark:bg-gray-600 rounded-full"
                    readOnly 
                />
            </div>
            <Text variant="h3" className="pt-4">{name}</Text>
        </Card>
    )
}