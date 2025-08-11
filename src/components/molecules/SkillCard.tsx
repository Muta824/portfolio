import React from 'react';
import { Card } from './Card';
import { Text } from '../atoms/Text';

interface SkillCardProps {
  name: string;
  icon: React.ReactNode;
  level: number; // 1-5
  experience: string;
  description: string;
  className?: string;
}

export const SkillCard: React.FC<SkillCardProps> = ({ 
  name, 
  icon, 
  level, 
  experience, 
  description,
  className = '' 
}) => {
  const getLevelColor = (level: number) => {
    if (level >= 5) return 'from-emerald-500 to-teal-500';
    if (level >= 4) return 'from-blue-500 to-cyan-500';
    if (level >= 3) return 'from-amber-500 to-orange-500';
    return 'from-gray-400 to-gray-500';
  };

  const getLevelText = (level: number) => {
    if (level >= 5) return 'Expert';
    if (level >= 4) return 'Advanced';
    if (level >= 3) return 'Intermediate';
    return 'Beginner';
  };

  const getLevelWidth = (level: number) => {
    return `${(level / 5) * 100}%`;
  };

  return (
    <Card className={`group relative overflow-hidden p-6 hover:scale-105 transition-all duration-300 ${className}`}>
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getLevelColor(level)} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
      
      {/* Icon */}
      <div className="relative z-10 flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
        <div className="w-12 h-12 text-gray-700 dark:text-gray-300">
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <Text variant="h3" className="mb-2 font-bold text-gray-900 dark:text-white">
          {name}
        </Text>
        
        <Text variant="body" className="mb-4 text-gray-600 dark:text-gray-300 text-sm">
          {description}
        </Text>

        {/* Experience */}
        <div className="mb-4">
          <Text variant="small" className="text-gray-500 dark:text-gray-400">
            {experience}
          </Text>
        </div>

        {/* Skill Level */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <Text variant="small" className="text-gray-600 dark:text-gray-300 font-medium">
              {getLevelText(level)}
            </Text>
            <Text variant="small" className="text-gray-500 dark:text-gray-400">
              {level}/5
            </Text>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getLevelColor(level)} rounded-full transition-all duration-500 ease-out`}
              style={{ width: getLevelWidth(level) }}
            />
          </div>
        </div>

        {/* Stars */}
        <div className="flex justify-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-lg ${
                star <= level 
                  ? 'text-yellow-400' 
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white dark:to-gray-800 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
    </Card>
  );
}; 