import { Hono } from 'hono';

type Bindings = {
  DB: D1Database;
  R2: R2Bucket;
};

const assets = new Hono<{ Bindings: Bindings }>();

// Mock data for now
let mockAssets = [
  { id: 'a1', projectId: 'p1', projectName: 'Summer Collection 2024', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', name: 'Look_01.jpg', size: '2.4 MB', dimensions: '2000x2500', status: 'approved', createdAt: '2024-05-11' },
  { id: 'a2', projectId: 'p1', projectName: 'Summer Collection 2024', url: 'https://images.unsplash.com/photo-1529139574466-a302d27460ae?auto=format&fit=crop&w=800&q=80', name: 'Look_02.jpg', size: '2.1 MB', dimensions: '2000x2500', status: 'pending', createdAt: '2024-05-11' },
];

assets.get('/', (c) => {
  const projectId = c.req.query('projectId');
  if (projectId) {
    return c.json({ success: true, assets: mockAssets.filter(a => a.projectId === projectId) });
  }
  return c.json({ success: true, assets: mockAssets });
});

assets.post('/', async (c) => {
  const body = await c.req.json();
  const newAsset = {
    id: `a${mockAssets.length + 1}`,
    ...body,
    status: 'pending',
    createdAt: new Date().toISOString().split('T')[0]
  };
  
  mockAssets.push(newAsset);
  return c.json({ success: true, asset: newAsset }, 201);
});

assets.put('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const index = mockAssets.findIndex(a => a.id === id);
  
  if (index === -1) {
    return c.json({ success: false, error: 'Asset not found' }, 404);
  }
  
  mockAssets[index] = { ...mockAssets[index], ...body };
  return c.json({ success: true, asset: mockAssets[index] });
});

assets.delete('/:id', (c) => {
  const id = c.req.param('id');
  const index = mockAssets.findIndex(a => a.id === id);
  
  if (index === -1) {
    return c.json({ success: false, error: 'Asset not found' }, 404);
  }
  
  mockAssets.splice(index, 1);
  return c.json({ success: true, message: 'Asset deleted' });
});

// Presigned URL generation for R2 upload
assets.post('/presign', async (c) => {
  const { filename, contentType } = await c.req.json();
  const key = `uploads/${crypto.randomUUID()}/${filename}`;
  
  // In a real implementation, we would use aws-sdk or similar to generate the presigned URL
  // For now, we'll return a mock URL
  const uploadUrl = `https://mock-r2-upload.com/${key}`;
  
  return c.json({ success: true, uploadUrl, key });
});

export default assets;