import { Hono } from 'hono';

type Bindings = {
  DB: D1Database;
};

const users = new Hono<{ Bindings: Bindings }>();

// Mock data for now
let mockUsers = [
  { id: 'u1', name: 'Sarah Jenning', email: 'sarah@luxeboutique.com', company: 'Luxe Boutique', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', plan: 'Growth', role: 'client', status: 'active', lastLogin: '2024-05-12T10:30:00Z' },
  { id: 'u2', name: 'Michael Chen', email: 'michael@techgear.com', company: 'TechGear', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', plan: 'Enterprise', role: 'client', status: 'active', lastLogin: '2024-05-11T15:45:00Z' },
];

users.get('/', (c) => {
  return c.json({ success: true, users: mockUsers });
});

users.get('/:id', (c) => {
  const id = c.req.param('id');
  const user = mockUsers.find(u => u.id === id);
  
  if (!user) {
    return c.json({ success: false, error: 'User not found' }, 404);
  }
  
  return c.json({ success: true, user });
});

users.post('/', async (c) => {
  const body = await c.req.json();
  const newUser = {
    id: `u${mockUsers.length + 1}`,
    ...body,
    status: 'active',
    created_at: new Date().toISOString()
  };
  
  mockUsers.push(newUser);
  return c.json({ success: true, user: newUser }, 201);
});

users.put('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const index = mockUsers.findIndex(u => u.id === id);
  
  if (index === -1) {
    return c.json({ success: false, error: 'User not found' }, 404);
  }
  
  mockUsers[index] = { ...mockUsers[index], ...body };
  return c.json({ success: true, user: mockUsers[index] });
});

users.delete('/:id', (c) => {
  const id = c.req.param('id');
  const index = mockUsers.findIndex(u => u.id === id);
  
  if (index === -1) {
    return c.json({ success: false, error: 'User not found' }, 404);
  }
  
  mockUsers.splice(index, 1);
  return c.json({ success: true, message: 'User deleted' });
});

export default users;