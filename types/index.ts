export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Project {
  _id: string;
  userId: string;
  title: string;
  description: string;
  thumbnail?: string;
  images?: string[];
  videos?: string[];
  technologies?: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  status?: 'completed' | 'in-progress' | 'planning';
  startDate?: string;
  endDate?: string;
  order?: number;
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProjectInput {
  title: string;
  description: string;
  thumbnail?: string;
  images?: string[];
  videos?: string[];
  technologies?: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  status?: string;
  startDate?: string;
  endDate?: string;
  isPublished?: boolean;
}