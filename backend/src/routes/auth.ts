import { Hono } from 'hono';

type Bindings = {
  DB: D1Database;
  SESSION_KV: KVNamespace;
  RESEND_API_KEY: string;
};

const auth = new Hono<{ Bindings: Bindings }>();

auth.post('/login', async (c) => {
  const { email } = await c.req.json();

  if (!email) {
    return c.json({ success: false, error: 'Email is required' }, 400);
  }

  // Generate a secure token
  const token = crypto.randomUUID();
  const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

  // Store token in KV
  await c.env.SESSION_KV.put(token, JSON.stringify({ email, expiresAt }), {
    expirationTtl: 900, // 15 minutes in seconds
  });

  // Send email via Resend (Mocking for now as we don't have the API key yet)
  console.log(`Sending magic link to ${email} with token ${token}`);
  
  // In a real implementation, we would use fetch to call Resend API here
  // const res = await fetch('https://api.resend.com/emails', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${c.env.RESEND_API_KEY}`,
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     from: 'onboarding@resend.dev',
  //     to: email,
  //     subject: 'Login to ModelMagic',
  //     html: `<p>Click <a href="http://localhost:5173/auth/verify?token=${token}">here</a> to login.</p>`
  //   })
  // });

  return c.json({ success: true, message: 'Magic link sent' });
});

auth.get('/verify-token', async (c) => {
  const token = c.req.query('token');

  if (!token) {
    return c.json({ success: false, error: 'Token is required' }, 400);
  }

  const sessionData = await c.env.SESSION_KV.get(token);

  if (!sessionData) {
    return c.json({ success: false, error: 'Invalid or expired token' }, 401);
  }

  const { email } = JSON.parse(sessionData);

  // In a real app, we would fetch or create the user in D1 here
  // For now, we'll return a mock user
  const user = {
    id: 'u1',
    email,
    name: 'Mock User',
    role: 'client',
    company: 'Mock Company',
    avatar: 'https://via.placeholder.com/150',
    plan: 'Starter'
  };

  // Delete the token after use (single use)
  await c.env.SESSION_KV.delete(token);

  return c.json({ success: true, user, token });
});

export default auth;