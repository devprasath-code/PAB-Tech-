/**
 * Types and interfaces for PAB TECH application
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  techStack: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'AI' | 'IoT' | 'Web/Dev' | 'Ed-tech' | 'Health-tech';
  description: string;
  imageUrl: string;
  techStack: string[];
  details: string[];
  outcome: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarDefault: string;
  avatarHover: string;
  bio: string;
  specialty: string[];
  quote: string;
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export interface ProcessStep {
  number: string;
  title: string;
  shortDesc: string;
  detailTitle: string;
  detailText: string;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  service: string;
  date: string;
  timeSlot: string;
  notes?: string;
}



