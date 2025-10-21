# KeyCrate

> The ultimate reference app for shortcuts, commands, and developer tools.

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![License](https://img.shields.io/badge/license-CC%20BY--NC%204.0-orange.svg)
![React](https://img.shields.io/badge/React-18+-61DAFB.svg)

## Overview

KeyCrate is a comprehensive, interactive reference application designed for developers and power users who want quick access to keyboard shortcuts, command-line tools, and productivity utilities. Built with React and featuring a sleek dark/light theme interface, KeyCrate helps you master your workflow efficiency.

## Features

- **Shortcut Bible** - Comprehensive categorised lists of Windows, application, and system shortcuts
- **Custom Shortcut Creator** - Design and save your own global shortcuts
- **Productivity Toolbox** - Floating, draggable palette for your favorite shortcuts and commands
- **Command Reference** - Extensive database of CLI commands for:
  - Windows (CMD & PowerShell)
  - NPM & Node.js
  - Git version control
  - Python & scripting
  - Networking & diagnostics
  - System troubleshooting
- **Dark/Light Theme** - Toggle between themes for comfortable viewing
- **Search Functionality** - Quickly find any shortcut or command
- **Export/Import** - Save and share your custom toolbox configurations

## Screenshot

![KeyCrate Interface](./screenshots/keycrate-preview.png)

## Installation

### 🖥️ Desktop App (Recommended)

**Windows:**
1. Download the latest release: [KeyCrate-Setup-v1.1.0.exe](https://github.com/FirmlyAware/keycrate/releases)
2. Run the installer
3. Launch from Start Menu or Desktop
4. Press **Ctrl+Alt+K** anywhere to show/hide KeyCrate

**Features:**
- ⚡ Native performance
- ⌨️ Global keyboard shortcut
- 📦 System tray integration
- 🔄 Auto-updates
- 🔒 Works offline

### 🌐 Web Development

**Prerequisites:**
- Node.js 16+ and npm
- Modern web browser

**Setup:**
1. Clone the repository:
```bash
git clone https://github.com/FirmlyAware/keycrate.git
cd keycrate-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser to `http://localhost:3000`

**Build for desktop:**
```bash
npm run electron:build:win    # Windows
npm run electron:build:mac    # macOS
npm run electron:build:linux  # Linux
```

## Usage

### Basic Navigation
- Browse categories from the left sidebar
- Use the search bar to find specific shortcuts or commands
- Click the toolbox icon to add items to your productivity toolbox

### Productivity Toolbox
- Click "Launch Toolbox" to open the floating palette
- Add shortcuts and commands using the plus icon
- Drag the toolbox anywhere on screen
- Enable checklist mode for task tracking
- Export your toolbox as a text file

### Custom Shortcuts
- Navigate to "My Custom Shortcuts"
- Define your shortcut name, key combination, and action
- Choose between URL launch, file open, or command execution
- Saved shortcuts persist in local storage

## Deployment

### Deploy to Vercel

```bash
npm run build
vercel --prod
```

### Deploy to Netlify

```bash
npm run build
netlify deploy --prod --dir=build
```

## Project Structure

```
keycrate-app/
├── src/
│   ├── components/         # React components
│   │   ├── Key.jsx
│   │   ├── TooltipButton.jsx
│   │   ├── WorkflowExample.jsx
│   │   ├── Modal.jsx
│   │   ├── MenuBar.jsx
│   │   ├── ProductivityToolboxApp.jsx
│   │   ├── HomeDashboard.jsx
│   │   ├── ReleaseNotes.jsx
│   │   └── CustomCreator.jsx
│   ├── __tests__/          # Component tests
│   ├── App.jsx             # Main application component
│   └── index.js            # Entry point
├── data/
│   └── showroomData.js     # Shortcut and command data
├── public/
│   └── index.html
├── package.json
└── README.md
```

## Technologies Used

- **React 18** - UI framework
- **Lucide React** - Icon library
- **Tailwind CSS** - Styling (utility-first CSS)
- **LocalStorage API** - Data persistence

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Ideas
- Add more shortcuts for different applications
- Expand command database with examples
- Improve UI/UX design
- Add keyboard navigation
- Create Electron wrapper for desktop app
- Add import/export for custom shortcuts

## Roadmap

- [ ] Electron desktop app with global shortcuts
- [ ] Cloud sync for custom shortcuts
- [ ] Multi-language support
- [ ] Plugin system for extensibility
- [ ] Mobile-responsive design
- [ ] Keyboard shortcut conflict detection
- [ ] Tutorial/onboarding flow

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0).

**You are free to:**
- Use, share, and modify for personal and educational purposes
- Fork and adapt the code for non-commercial projects

**You must:**
- Give appropriate credit to the original author
- Not use this project for commercial purposes without explicit written permission

For commercial licensing inquiries, please contact FirmlyAware via GitHub.

See the [LICENSE](LICENSE) file for full details.

## Acknowledgments

- Icon library: [Lucide Icons](https://lucide.dev/)
- Inspired by various productivity tools and shortcut reference apps
- Built with ❤️ for developers by developers

## Support & Donations

**Found KeyCrate helpful?**
- Star ⭐ this repository
- Share it with fellow developers
- Consider sponsoring development (see the "Sponsor" button above)

**Report Issues:**
- Bug reports: [GitHub Issues](https://github.com/FirmlyAware/keycrate/issues)
- Security vulnerabilities: See [SECURITY.md](SECURITY.md)
- Feature requests: Use GitHub Issues or in-app feedback form

## Author

**FirmlyAware**
- GitHub: [@FirmlyAware](https://github.com/FirmlyAware)

---

Made with ⌨️ by developers, for developers.
