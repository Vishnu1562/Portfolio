export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  badge: string;
  summary: string;
  points: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  logoText?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  badge: string;
}
