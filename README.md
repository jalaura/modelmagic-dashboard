# ModelMagic Dashboard

A comprehensive client and admin dashboard for ModelMagic - a done-for-you product photography service. Features magic link authentication, role-based access control, and complete project management capabilities.

## Features

- **Magic Link Authentication** - Secure, passwordless login via email
- **Role-Based Access** - Separate client and admin interfaces
- **Project Management** - Track photography projects from submission to delivery
- **File Upload & Management** - Handle project assets and deliverables
- **Real-time Updates** - Live project status tracking
- **Responsive Design** - Works seamlessly on desktop and mobile

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Context API
- **Deployment**: Cloudflare Pages
- **Authentication**: Resend (magic link email service)
- **Backend**: Cloudflare Workers

## Local Development

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

## Deployment

This project is configured for deployment on Cloudflare Pages with automatic builds from the main branch.

## Project Structure

```
├── components/          # Reusable React components
├── pages/              # Page components (Dashboard, Login, etc.)
├── public/             # Static assets
├── types.ts            # TypeScript type definitions
├── context.tsx         # Global app context and state management
├── authService.ts      # Authentication service
├── index.html          # Entry HTML file
```

## Authentication

The dashboard uses magic link authentication powered by Resend. Users receive a secure login link via email, eliminating the need for passwords.

## License

Private - All rights reserved
