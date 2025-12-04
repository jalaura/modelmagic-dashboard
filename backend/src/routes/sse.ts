import { Hono } from 'hono';
import { streamSSE } from 'hono/streaming';

type Bindings = {
  DB: D1Database;
};

const sse = new Hono<{ Bindings: Bindings }>();

// Store connected clients
const clients = new Set<WritableStreamDefaultController>();

sse.get('/events', (c) => {
  return streamSSE(c, async (stream) => {
    // Add client to the set
    // Note: In a real distributed environment (Cloudflare Workers), 
    // we would need Durable Objects or similar to manage connections across instances.
    // For this single-instance mock, this simple Set works.
    
    console.log('Client connected to SSE');

    // Send initial connection message
    await stream.writeSSE({
      data: 'Connected to real-time updates',
      event: 'connected',
      id: String(Date.now()),
    });

    // Keep the connection open
    while (true) {
      // Send a heartbeat every 30 seconds to keep connection alive
      await stream.writeSSE({
        data: 'ping',
        event: 'heartbeat',
        id: String(Date.now()),
      });
      await stream.sleep(30000);
    }
  });
});

// Endpoint to trigger an event (for internal use or webhooks)
sse.post('/trigger', async (c) => {
  const { event, data } = await c.req.json();
  
  // In a real implementation with Durable Objects, we would broadcast to all connected clients here.
  // Since we can't easily share the `clients` Set across requests in standard Workers without DO,
  // we'll just log it for now.
  console.log(`Triggering event: ${event}`, data);
  
  return c.json({ success: true, message: 'Event triggered' });
});

export default sse;