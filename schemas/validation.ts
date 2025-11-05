import { z } from 'zod';

// Personal Info Schema
export const PersonalInfoSchema = z.object({
  fullName: z.string().min(2, 'שם מלא חייב להכיל לפחות 2 תווים'),
  email: z.string().email('כתובת אימייל לא תקינה'),
  phone: z.string().min(9, 'מספר טלפון לא תקין'),
  linkedin: z.string().url('כתובת LinkedIn לא תקינה').optional().or(z.literal('')),
  location: z.string().min(2, 'מיקום חייב להכיל לפחות 2 תווים'),
});

// Experience Schema
export const ExperienceSchema = z.object({
  role: z.string().min(2, 'תפקיד חייב להכיל לפחות 2 תווים'),
  company: z.string().min(2, 'שם חברה חייב להכיל לפחות 2 תווים'),
  period: z.string().min(3, 'תקופה לא תקינה'),
  description: z.array(z.string()).min(1, 'נדרש לפחות תיאור אחד'),
});

// Education Schema
export const EducationSchema = z.object({
  degree: z.string().min(2, 'תואר חייב להכיל לפחות 2 תווים'),
  institution: z.string().min(2, 'מוסד לימודי חייב להכיל לפחות 2 תווים'),
  period: z.string().min(3, 'תקופה לא תקינה'),
});

// Skill Schema
export const SkillSchema = z.object({
  category: z.string().min(2, 'קטגוריה חייבת להכיל לפחות 2 תווים'),
  items: z.array(z.string()).min(1, 'נדרש לפחות כישור אחד'),
});

// Project Schema
export const ProjectSchema = z.object({
  name: z.string().min(2, 'שם פרויקט חייב להכיל לפחות 2 תווים'),
  description: z.string().min(10, 'תיאור חייב להכיל לפחות 10 תווים'),
  technologies: z.array(z.string()).min(1, 'נדרשת לפחות טכנולוגיה אחת'),
  link: z.string().url('קישור לא תקין').optional().or(z.literal('')),
});

// Certification Schema
export const CertificationSchema = z.object({
  name: z.string().min(2, 'שם אישור חייב להכיל לפחות 2 תווים'),
  issuer: z.string().min(2, 'מנפיק חייב להכיל לפחות 2 תווים'),
  date: z.string().min(4, 'תאריך לא תקין'),
});

// Language Schema
export const LanguageSchema = z.object({
  language: z.string().min(2, 'שפה חייבת להכיל לפחות 2 תווים'),
  proficiency: z.enum(['Native', 'Fluent', 'Conversational', 'Basic'], {
    message: 'רמת שפה לא תקינה',
  }),
});

// User Knowledge Base Schema
export const UserKnowledgeBaseSchema = z.object({
  personalInfo: PersonalInfoSchema.optional(),
  professionalSummaryBase: z.string().optional(),
  experience: z.array(ExperienceSchema).optional(),
  education: z.array(EducationSchema).optional(),
  skills: z.array(SkillSchema).optional(),
  projects: z.array(ProjectSchema).optional(),
  certifications: z.array(CertificationSchema).optional(),
  languages: z.array(LanguageSchema).optional(),
});

// Job Description Schema
export const JobDescriptionSchema = z.string()
  .min(50, 'תיאור התפקיד קצר מדי (לפחות 50 תווים)')
  .max(10000, 'תיאור התפקיד ארוך מדי (מקסימום 10000 תווים)');

// Validate uploaded JSON
export function validateUserKnowledgeBase(data: unknown) {
  return UserKnowledgeBaseSchema.safeParse(data);
}

// Validate job description
export function validateJobDescription(text: string) {
  return JobDescriptionSchema.safeParse(text);
}

// Sanitize text input
export function sanitizeText(text: string): string {
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframe tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
}

// Validate file size (in bytes)
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_JSON_SIZE = 1 * 1024 * 1024; // 1MB
export const MAX_PDF_SIZE = 5 * 1024 * 1024; // 5MB

export function validateFileSize(file: File, maxSize: number): boolean {
  return file.size <= maxSize;
}
