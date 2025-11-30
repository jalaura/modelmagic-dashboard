
import { Project, ProjectStatus, Platform, Asset, User, Notification, TeamMember, Message } from './types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 't1',
    name: 'Jessica Martinez',
    role: 'Lead Editor',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    isOnline: true,
    email: 'jessica@modelmagic.com'
  },
  {
    id: 't2',
    name: 'Marcus Thompson',
    role: 'Account Manager',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    isOnline: false,
    email: 'marcus@modelmagic.com'
  },
  {
    id: 't3',
    name: 'Sofia Chen',
    role: 'Senior Retoucher',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    isOnline: true,
    email: 'sofia@modelmagic.com'
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Summer Collection 2024',
    category: 'Fashion',
    platforms: [Platform.SHOPIFY, Platform.INSTAGRAM],
    status: ProjectStatus.READY_FOR_REVIEW,
    createdAt: '2024-05-08T10:00:00Z',
    deliveryDate: '2024-05-12',
    thumbnail: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80',
    creativeBrief: 'We need a high-end urban look. Think New York streets, midday sun, sharp shadows.',
    packageType: 'DFY Pack',
    itemQuantity: 1,
    totalCost: 29.00,
    assignedEditor: TEAM_MEMBERS[0],
    progressDay: 4,
    totalDays: 4,
    priority: 'Standard',
    clientName: 'Sarah Jenning',
    clientEmail: 'sarah@luxeboutique.com',
    internalNotes: 'Client prefers warm tones. Watch out for over-saturation.'
  },
  {
    id: 'p2',
    name: 'Silk Scarves Drop',
    category: 'Accessories',
    platforms: [Platform.ETSY],
    status: ProjectStatus.BEING_EDITED,
    createdAt: '2024-05-11T09:30:00Z',
    deliveryDate: '2024-05-13',
    thumbnail: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80',
    creativeBrief: 'Clean studio background, soft lighting, focus on texture details.',
    packageType: 'Image Only',
    itemQuantity: 3,
    totalCost: 29.97,
    assignedEditor: TEAM_MEMBERS[2],
    progressDay: 2,
    totalDays: 2,
    priority: 'Urgent',
    clientName: 'Sarah Jenning',
    clientEmail: 'sarah@luxeboutique.com'
  },
  {
    id: 'p3',
    name: 'Eco-Friendly Totes',
    category: 'Bags',
    platforms: [Platform.AMAZON],
    status: ProjectStatus.COMPLETED,
    createdAt: '2024-05-01T14:20:00Z',
    deliveryDate: '2024-05-03',
    thumbnail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80',
    creativeBrief: 'Lifestyle home setting, earthy tones, natural lighting.',
    packageType: 'DFY Pack',
    itemQuantity: 2,
    totalCost: 58.00,
    assignedEditor: TEAM_MEMBERS[0],
    progressDay: 2,
    totalDays: 2,
    priority: 'Low',
    clientName: 'Sarah Jenning',
    clientEmail: 'sarah@luxeboutique.com',
    qaChecklist: {
      imageQuality: true,
      briefCompliance: true,
      specsCheck: true
    }
  },
  {
    id: 'p4',
    name: 'Vintage Denim',
    category: 'Fashion',
    platforms: [Platform.INSTAGRAM],
    status: ProjectStatus.QA_REVIEW,
    createdAt: '2024-05-12T11:00:00Z',
    deliveryDate: '2024-05-14',
    thumbnail: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=400&q=80',
    creativeBrief: 'Outdoor adventure vibe, mountains or forest background.',
    packageType: 'Video Only',
    itemQuantity: 1,
    totalCost: 19.99,
    assignedEditor: TEAM_MEMBERS[2],
    progressDay: 1,
    totalDays: 2,
    priority: 'Standard',
    clientName: 'Sarah Jenning',
    clientEmail: 'sarah@luxeboutique.com'
  }
];

export const MOCK_ASSETS: Asset[] = [
  { id: 'a1', projectId: 'p1', projectName: 'Summer Collection 2024', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', name: 'Look_01.jpg', size: '2.4 MB', dimensions: '2000x2500', status: 'approved', createdAt: '2024-05-11', editedBy: TEAM_MEMBERS[0] },
  { id: 'a2', projectId: 'p1', projectName: 'Summer Collection 2024', url: 'https://images.unsplash.com/photo-1529139574466-a302d27460ae?auto=format&fit=crop&w=800&q=80', name: 'Look_02.jpg', size: '2.1 MB', dimensions: '2000x2500', status: 'pending', createdAt: '2024-05-11', editedBy: TEAM_MEMBERS[0] },
  { id: 'a3', projectId: 'p1', projectName: 'Summer Collection 2024', url: 'https://images.unsplash.com/photo-1550614000-4b9519e02d48?auto=format&fit=crop&w=800&q=80', name: 'Look_03.jpg', size: '2.8 MB', dimensions: '2000x2500', status: 'revision', createdAt: '2024-05-11', editedBy: TEAM_MEMBERS[0] },
  { id: 'a4', projectId: 'p3', projectName: 'Eco-Friendly Totes', url: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=1000&q=80', name: 'Tote_Main.jpg', size: '1.9 MB', dimensions: '2000x2000', status: 'approved', createdAt: '2024-05-04', editedBy: TEAM_MEMBERS[0] },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Review Ready', message: 'Jessica has finished editing Summer Collection 2024.', time: '2 hours ago', read: false, type: 'success', sender: TEAM_MEMBERS[0] },
  { id: 'n2', title: 'Production Update', message: 'Sofia started working on Silk Scarves Drop.', time: '5 hours ago', read: false, type: 'info', sender: TEAM_MEMBERS[2] },
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    sender: TEAM_MEMBERS[0],
    content: "Hi Sarah! I've just started on the Summer Collection. The lighting references you sent are perfect. I'll have the first draft ready for QA by tomorrow.",
    timestamp: '2024-05-10T14:30:00Z',
    projectId: 'p1'
  },
  {
    id: 'm2',
    sender: { id: 'u1', name: 'Sarah Jenning', email: 'sarah@luxeboutique.com', company: 'Luxe Boutique', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', plan: 'Growth', role: 'client' },
    content: "Thanks Jessica! Please make sure the shadows aren't too harsh on the silk items.",
    timestamp: '2024-05-10T14:35:00Z',
    projectId: 'p1'
  },
  {
    id: 'm3',
    sender: TEAM_MEMBERS[2],
    content: "Just a heads up, I'm waiting on the high-res files for the Denim project. Could you re-upload?",
    timestamp: '2024-05-12T09:00:00Z',
    projectId: 'p4'
  }
];
