# Contributing to ModelMagic Dashboard

Thank you for your interest in contributing to ModelMagic Dashboard! We welcome contributions from the community.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/modelmagic-dashboard.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Run tests and linting: `npm run lint && npm run type-check`
6. Commit your changes: `git commit -m "feat: Add your feature"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Create a Pull Request

## Development Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

## Code Style

- We use ESLint and Prettier for code formatting
- Run `npm run format` before committing
- Follow TypeScript best practices
- Write meaningful commit messages following [Conventional Commits](https://www.conventionalcommits.org/)

## Commit Message Format

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Pull Request Guidelines

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Keep PRs focused on a single feature or fix
5. Provide a clear description of changes

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community

## Questions?

Feel free to open an issue for any questions or concerns.
