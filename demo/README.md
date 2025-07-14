# Gwitter Demos

This directory contains demonstration projects showing different ways to use Gwitter in your applications.

## Available Demos

### 🔧 [NPM Demo](./npm-demo/)
**Best for: Modern React applications with build tools**

- Full React + TypeScript + Vite setup
- Demonstrates NPM package installation
- Modern development workflow
- Perfect for new React projects or existing applications

**Features:**
- ✅ Hot reload development
- ✅ TypeScript support
- ✅ Modern build tools (Vite)
- ✅ Component-based architecture
- ✅ Production optimization

[→ View NPM Demo](./npm-demo/)

### 🌐 [UMD Demo](./umd-demo/)
**Best for: Existing websites without build tools**

- Plain HTML file with script tags
- No build process required
- Works with any existing website
- Perfect for adding Gwitter to blogs, documentation sites, or legacy applications

**Features:**
- ✅ Zero configuration
- ✅ CDN-based dependencies
- ✅ Copy-paste integration
- ✅ Universal browser support
- ✅ Instant setup

[→ View UMD Demo](./umd-demo/)

## Which Demo Should I Use?

### Choose NPM Demo if you:
- Are building a React application
- Use modern build tools (webpack, Vite, etc.)
- Want TypeScript support
- Prefer component-based development
- Need hot reload and development tools

### Choose UMD Demo if you:
- Have an existing website without build tools
- Want to add Gwitter to a static site
- Prefer simple HTML/CSS/JS setup
- Need quick integration
- Want to avoid complex toolchains

## Quick Comparison

| Feature | NPM Demo | UMD Demo |
|---------|----------|----------|
| **Setup Complexity** | Medium | Low |
| **Build Tools Required** | Yes (Vite) | No |
| **TypeScript Support** | ✅ Yes | ❌ No |
| **Hot Reload** | ✅ Yes | ❌ No |
| **Bundle Size Control** | ✅ Yes | ❌ No |
| **Integration Ease** | Medium | High |
| **Browser Compatibility** | Modern | Universal |
| **Production Optimization** | ✅ Yes | Limited |

## Getting Started

1. **Choose your preferred demo** based on your project needs
2. **Follow the setup instructions** in the respective README files
3. **Configure GitHub settings** with your repository details
4. **Customize** the appearance and behavior to match your needs

## Prerequisites for Both Demos

Before using either demo, you'll need to set up:

1. **GitHub Repository**: Create a repository for your Issues/content
2. **GitHub Personal Access Token**: Generate a token with appropriate permissions
3. **GitHub OAuth App**: Create an OAuth application for authentication

See the [main Gwitter documentation](../README.md) for detailed setup instructions.

## Demo Structure

```
demo/
├── npm-demo/           # React + NPM demonstration
│   ├── src/
│   │   ├── App.tsx     # Main React component
│   │   ├── App.css     # Component styles
│   │   ├── main.tsx    # Application entry point
│   │   └── index.css   # Global styles
│   ├── index.html      # HTML template
│   ├── package.json    # Dependencies and scripts
│   ├── vite.config.ts  # Build configuration
│   └── README.md       # NPM demo documentation
├── umd-demo/           # UMD/Browser demonstration
│   ├── index.html      # Complete HTML application
│   └── README.md       # UMD demo documentation
└── README.md           # This file
```

## Support

If you encounter issues with either demo:

1. Check the specific demo's README file for troubleshooting
2. Verify your GitHub configuration is correct
3. Ensure you have the required permissions and tokens
4. Visit the [main Gwitter repository](https://github.com/SimonAKing/Gwitter) for support

## Contributing

Found an issue with the demos or have suggestions for improvement?

1. Check existing issues in the [main repository](https://github.com/SimonAKing/Gwitter/issues)
2. Create a new issue with details about the demo and the problem
3. Submit a pull request with your improvements

## Learn More

- [Gwitter Main Documentation](../README.md)
- [Gwitter GitHub Repository](https://github.com/SimonAKing/Gwitter)
- [GitHub Issues API Documentation](https://docs.github.com/en/rest/issues)
- [GitHub OAuth Apps Guide](https://docs.github.com/en/developers/apps/building-oauth-apps)