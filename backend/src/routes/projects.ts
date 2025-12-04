import { Hono } from 'hono';

type Bindings = {
  DB: D1Database;
};

const projects = new Hono<{ Bindings: Bindings }>();

// Mock data for now, will replace with D1 queries later
let mockProjects = [
  {
    id: 'p1',
    name: 'Summer Collection 2024',
    category: 'Fashion',
    platforms: ['Shopify', 'Instagram'],
    status: 'Ready for Review',
    createdAt: '2024-05-08T10:00:00Z',
    deliveryDate: '2024-05-12',
    thumbnail: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80',
    creativeBrief: 'We need a high-end urban look. Think New York streets, midday sun, sharp shadows.',
    packageType: 'DFY Pack',
    itemQuantity: 1,
    totalCost: 29.00,
    progressDay: 4,
    totalDays: 4,
    priority: 'Standard',
    clientName: 'Sarah Jenning',
    clientEmail: 'sarah@luxeboutique.com',
    internalNotes: 'Client prefers warm tones. Watch out for over-saturation.'
  }
];

projects.get('/', (c) => {
  return c.json({ success: true, projects: mockProjects });
});

projects.get('/:id', (c) => {
  const id = c.req.param('id');
  const project = mockProjects.find(p => p.id === id);
  
  if (!project) {
    return c.json({ success: false, error: 'Project not found' }, 404);
  }
  
  return c.json({ success: true, project });
});

projects.post('/', async (c) => {
  const body = await c.req.json();
  const newProject = {
    id: `p${mockProjects.length + 1}`,
    ...body,
    status: 'Submitted',
    createdAt: new Date().toISOString()
  };
  
  mockProjects.push(newProject);
  return c.json({ success: true, project: newProject }, 201);
});

projects.put('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const index = mockProjects.findIndex(p => p.id === id);
  
  if (index === -1) {
    return c.json({ success: false, error: 'Project not found' }, 404);
  }
  
  mockProjects[index] = { ...mockProjects[index], ...body };
  return c.json({ success: true, project: mockProjects[index] });
});

projects.delete('/:id', (c) => {
  const id = c.req.param('id');
  const index = mockProjects.findIndex(p => p.id === id);
  
  if (index === -1) {
    return c.json({ success: false, error: 'Project not found' }, 404);
  }
  
  mockProjects.splice(index, 1);
  return c.json({ success: true, message: 'Project deleted' });
});

export default projects;