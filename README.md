# Hello World NUC

A modern, production-ready React application built with Vite and deployed to a local NUC server.

## Features

- Interactive counter with increment, decrement, and reset functionality
- Persistent state using localStorage
- Keyboard shortcuts for better UX
- Dark mode support (auto-detects system preference)
- Comprehensive error boundary
- Full test coverage with Vitest
- Docker deployment ready
- ESLint and Prettier for code quality

## Quick Start

### Prerequisites

- Node.js 18+
- npm 8+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd hello-world-nuc

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at http://localhost:3000

## Available Scripts

### Development

```bash
npm run dev          # Start development server
npm run preview      # Preview production build locally
```

### Testing

```bash
npm test             # Run tests once
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### Code Quality

```bash
npm run lint         # Lint code with ESLint
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Building

```bash
npm run build        # Build for production
```

## Docker Deployment

### Build Docker Image

```bash
docker build -t hello-world-nuc .
```

### Run Container

```bash
docker run -p 80:80 hello-world-nuc
```

The app will be available at http://localhost

### Multi-stage Build

The Dockerfile uses a multi-stage build for optimal image size:
- Build stage: Node.js 18 Alpine for building the app
- Production stage: Nginx Alpine for serving static files

## Keyboard Shortcuts

- Arrow Up / `+` - Increment counter
- Arrow Down / `-` - Decrement counter
- `r` - Reset counter

## Project Structure

```
hello-world-nuc/
├── src/
│   ├── test/
│   │   └── setup.js          # Test configuration
│   ├── App.jsx               # Main application component
│   ├── App.css               # Application styles
│   ├── App.test.jsx          # Application tests
│   ├── ErrorBoundary.jsx     # Error boundary component
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles
├── Dockerfile                # Docker configuration
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── eslint.config.js          # ESLint configuration
└── .prettierrc               # Prettier configuration
```

## Technologies

- **React 18** - UI library
- **Vite 5** - Build tool and dev server
- **Vitest** - Unit testing framework
- **Testing Library** - React component testing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Docker** - Containerization
- **Nginx** - Production web server

## Configuration

### Environment Variables

The app version is automatically injected from package.json using Vite's define feature:

```javascript
VITE_APP_VERSION // Automatically set to package.json version
```

### Vite Configuration

- Base path: `/` (configurable in vite.config.js)
- Dev server port: 3000
- Test environment: jsdom

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

## Acknowledgments

Built with Claude AI and deployed to NUC (local network).
