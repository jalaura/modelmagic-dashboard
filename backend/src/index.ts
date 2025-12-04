import { Hono } from 'hono';
import { cors } from 'hono/cors';
import auth from './routes/auth';
import projects from './routes/projects';
import assets from './routes/assets';
import users from './routes/users';
import sse from './routes/sse';

type Bindings = {
  DB: D1Database;
  SESSION_KV: KVNamespace;
  RESEND_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use('/*', cors());

app.get('/', (c) => {
  return c.text('ModelMagic API is running!');
});

app.route('/api/auth', auth);
app.route('/api/projects', projects);
app.route('/api/assets', assets);
app.route('/api/users', users);
app.route('/api/sse', sse);

export default app;