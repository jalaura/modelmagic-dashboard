# ModelMagic Dashboard

[![CI/CD](https://github.com/jalaura/modelmagic-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/jalaura/modelmagic-dashboard/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)

A comprehensive client and admin dashboard for ModelMagic - a done-for-you product photography service. Features magic link authentication, role-based access control, and complete project management capabilities.

## ✨ Features

### Authentication
- **Magic Link Authentication** - Secure, passwordless login via email using Resend
- **Role-Based Access** - Separate client and admin interfaces with proper authorization

### Project Management
- **Project Tracking** - Complete photography project lifecycle from submission to delivery
- **File Upload & Management** - Handle project assets and deliverables
- **Real-time Updates** - Live project status tracking
- **Client Portal** - Intuitive interface for clients to manage their projects

### Design
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Modern UI** - Built with Tailwind CSS for a clean, professional look

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **React Context API** - State management

### Backend & Deployment
- **Cloudflare Pages** - Fast, global edge deployment
- **Cloudflare Workers** - Serverless API backend
- **Resend** - Email service for magic link authentication

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **GitHub Actions** - CI/CD pipeline
- **TypeScript** - Static type checking

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Cloudflare account (for deployment)
- Resend API key (for authentication)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/jalaura/modelmagic-dashboard.git
cd modelmagic-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
VITE_API_BASE_URL=https://api.modelsmagix.com
RESEND_API_KEY=your_resend_api_key_here
CLOUDFLARE_WORKER_URL=https://api.modelsmagix.com
```

4. **Start development server**
```bash
npm run dev
```

5. **Open http://localhost:5173 in your browser**

## 📜 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript type checking
```

## 🔐 Authentication

The application uses magic link authentication via Resend:

1. User enters their email address
2. Backend generates a secure token
3. Email with magic link is sent via Resend
4. User clicks link to authenticate
5. Session is established with appropriate role (client/admin)

## 📁 Project Structure

```
modelmagic-dashboard/
├── .github/
│   └── workflows/
│       └── ci.yml          # CI/CD pipeline
├── components/             # React components
├── pages/                  # Page components
├── public/                 # Static assets
├── .env.example           # Environment variables template
├── .eslintrc.json         # ESLint configuration
├── .prettierrc            # Prettier configuration
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

## 🚢 Deployment

This project is configured for automatic deployment to Cloudflare Pages via GitHub Actions.

### Automated Deployment

Push to the `main` branch triggers automatic deployment:

1. Code is linted and type-checked
2. Production build is created
3. Build is deployed to Cloudflare Pages
4. Deployment URL is provided

### Manual Deployment

```bash
npm run build
# Deploy the dist/ folder to your hosting provider
```

### Required GitHub Secrets

Configure these secrets in your repository settings:
- `CLOUDFLARE_API_TOKEN` - Cloudflare API token with Pages edit permissions
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Run tests and linting (`npm run lint && npm run type-check`)
4. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Deployed on [Cloudflare Pages](https://pages.cloudflare.com/)
- Email service by [Resend](https://resend.com/)

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Made with ❤️ for ModelMagic
