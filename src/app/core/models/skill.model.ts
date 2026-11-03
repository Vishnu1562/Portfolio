export type SkillCategory = 'All' | 'Frontend' | 'Backend' | 'Mobile' | 'Cloud & Tools';

export interface SkillItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'Cloud & Tools';
  level: string;
  tag: string;
  iconName: string;
}
