
export enum ProjectStatus {
  DRAFT = 'Draft',
  SUBMITTED = 'Submitted',
  TEAM_ASSIGNED = 'Team Assigned',
  BEING_EDITED = 'Being Edited',
  QA_REVIEW = 'QA Review',
  READY_FOR_REVIEW = 'Ready for Review',
  COMPLETED = 'Completed'
}

export enum Platform {
  AMAZON = 'Amazon',
  ETSY = 'Etsy',
  SHOPIFY = 'Shopify',
  INSTAGRAM = 'Instagram',
  WEBSITE = 'Website'
}

export type PackageType = 'DFY Pack' | 'Image Only' | 'Video Only';
export type UserRole = 'client' | 'admin' | 'editor';
export type Priority = 'Urgent' | 'Standard' | 'Low';

export interface TeamMember {
  id: string;
  name: string;
  role: 'Lead Editor' | 'Account Manager' | 'QA Specialist' | 'Senior Retoucher';
  avatar: string;
  isOnline: boolean;
  email: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  platforms: Platform[];
  status: ProjectStatus;
  createdAt: string;
  deliveryDate: string;
  thumbnail: string;
  creativeBrief: string;
  packageType: PackageType;
  itemQuantity: number;
  totalCost: number;
  assignedEditor?: TeamMember;
  progressDay?: number;
  totalDays?: number;
  // Admin fields
  priority?: Priority;
  internalNotes?: string;
  clientName?: string;
  clientEmail?: string;
  qaChecklist?: {
    imageQuality: boolean;
    briefCompliance: boolean;
    specsCheck: boolean;
  };
}

export interface Asset {
  id: string;
  projectId: string;
  projectName: string;
  url: string;
  name: string;
  size: string;
  dimensions: string;
  status: 'pending' | 'approved' | 'revision';
  createdAt: string;
  editedBy?: TeamMember;
}

export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  avatar: string;
  plan: string;
  role: UserRole;
  status?: 'active' | 'inactive';
  lastLogin?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
  sender?: TeamMember;
}

export interface Message {
  id: string;
  sender: TeamMember | User;
  content: string;
  timestamp: string;
  projectId?: string;
}

export interface AdminStats {
  revenue: number;
  completedProjects: number;
  avgTurnaround: number; // hours
  clientSatisfaction: number;
}