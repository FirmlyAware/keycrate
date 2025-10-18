# KeyCrate v1.1.0 - Desktop App Release 🚀

**Release Date:** October 19, 2025
**Tag:** v1.1.0
**Type:** Major Feature Release

---

## 🎉 What's New

### Desktop Application
KeyCrate is now available as a **native desktop application** for Windows, macOS, and Linux!

#### Key Features:
- **⌨️ Global Keyboard Shortcut** - Press `Ctrl+Alt+K` from anywhere to instantly show/hide KeyCrate
- **📦 System Tray Integration** - Minimizes to tray, stays running in background
- **🔄 Auto-Updates** - Automatically checks for and installs new versions
- **⚡ Native Performance** - Faster startup and better resource usage than web version
- **🔒 Offline Capable** - Works without internet connection
- **🎯 Quick Access** - Launch from desktop, start menu, or global shortcut

### Installation Methods:
1. **Windows:** Download and run `KeyCrate-Setup-v1.1.0.exe`
2. **macOS:** Download and install `.dmg` file
3. **Linux:** Download `.AppImage` or `.deb` package

---

## ✨ Features

### Comprehensive Shortcut Reference
- **Shortcut Bible** - Master list of categorized keyboard shortcuts
- **Windows Shortcuts** - OS navigation and window management
- **Document Editing** - Universal text editing shortcuts
- **Web Development** - NPM, Git, and development tools

### Command Database
- **CMD & PowerShell** - File system and process management
- **Networking Commands** - Diagnostic and troubleshooting tools
- **System Tools** - Windows utilities and registry tools
- **Python & Scripting** - Package management and virtual environments

### Productivity Tools
- **Custom Shortcut Creator** - Define your own shortcuts with local storage
- **Draggable Toolbox** - Floating palette for frequently-used items
- **Search Functionality** - Find any command or shortcut instantly
- **Export/Import** - Share toolbox configurations

### User Experience
- **Dark/Light Theme** - Comfortable viewing in any environment
- **Workflow Examples** - Step-by-step usage guides
- **Release Notes** - Track new features and updates
- **In-App Feedback** - Suggest shortcuts and improvements

---

## 📥 Downloads

### Windows (Recommended)
**File:** `KeyCrate-Setup-1.1.0.exe`
**Size:** 87 MB
**Type:** NSIS Installer + Portable

**System Requirements:**
- Windows 10 or later
- 200 MB free disk space
- No additional dependencies

### macOS
**File:** `KeyCrate-1.1.0.dmg`
**Size:** ~90 MB
**Requirements:** macOS 10.13+

### Linux
**Files:**
- `KeyCrate-1.1.0.AppImage` (Universal)
- `KeyCrate-1.1.0.deb` (Debian/Ubuntu)

**Requirements:** Modern Linux distro (2020+)

---

## 🚀 Quick Start

### 1. Install
- Download the installer for your platform
- Run the installer and follow the wizard
- Choose installation directory (optional)

### 2. Launch
- **Desktop shortcut:** Double-click KeyCrate icon
- **Start menu:** Search for "KeyCrate"
- **Global shortcut:** Press `Ctrl+Alt+K`

### 3. Use
- Browse shortcuts in left sidebar
- Search for specific commands
- Add favorites to toolbox
- Access anytime with global shortcut

---

## 🎯 Global Shortcut

**Default:** `Ctrl+Alt+K` (Windows/Linux) or `Cmd+Alt+K` (macOS)

**Actions:**
- Press once: Show KeyCrate
- Press again: Hide KeyCrate
- Works from any application

**Customize:**
Edit `electron/main.js` line 87 to change the shortcut

---

## 🔧 Technical Details

### Built With:
- **Electron** 38.3.0 - Desktop framework
- **React** 18.2.0 - UI framework
- **Vite** 5.4.20 - Build tool
- **Tailwind CSS** 3.3.5 - Styling
- **Lucide Icons** 0.292.0 - Icon library
- **electron-updater** 6.6.2 - Auto-update system

### Architecture:
- **Main Process:** Electron app shell, system integration
- **Renderer Process:** React application, UI
- **IPC Bridge:** Secure communication via preload script
- **Context Isolation:** Enhanced security model

### Build Info:
- **Build Time:** ~45 seconds
- **Bundle Size:** 185 KB (gzipped: 58 KB)
- **Startup Time:** <2 seconds
- **Memory Usage:** ~150 MB

---

## 📝 Changelog

### Added
- Native desktop application for Windows, macOS, Linux
- Global keyboard shortcut (`Ctrl+Alt+K`)
- System tray integration with context menu
- Auto-update mechanism via electron-updater
- Offline functionality
- Desktop installer (NSIS for Windows)
- Portable version option
- Application icon and branding

### Changed
- Migrated from web-only to cross-platform desktop
- Improved startup performance
- Enhanced security with context isolation
- Updated documentation for desktop usage

### Technical
- Add Electron main process and preload script
- Configure electron-builder for multi-platform builds
- Integrate electron-updater for GitHub releases
- Update Vite config for Electron compatibility
- Reorganize project structure for desktop builds

---

## 🐛 Known Issues

### Windows
- **First Launch Warning:** Windows may show "Windows protected your PC"
  - **Fix:** Click "More info" → "Run anyway"
  - **Reason:** App is not code-signed (future release will fix)

- **Default Icon:** Using Electron icon temporarily
  - **Fix:** Custom icon coming in v1.2.0

### macOS
- **Gatekeeper Warning:** "App is from an unidentified developer"
  - **Fix:** Right-click → Open → Confirm
  - **Reason:** App is not notarized (requires Apple developer account)

### Linux
- **AppImage Permissions:** May need to mark as executable
  - **Fix:** `chmod +x KeyCrate-1.1.0.AppImage`

---

## 🔄 Auto-Update

KeyCrate automatically checks for updates:
- **Frequency:** Every 6 hours
- **Source:** GitHub Releases
- **Process:** Downloads in background, installs on restart
- **Notification:** Alert when update is ready

**Manual Update:**
- Help → Check for Updates
- Or download new version manually

---

## 🔐 Security

### Desktop App Security:
- ✅ Context isolation enabled
- ✅ Node integration disabled
- ✅ Secure IPC bridge
- ✅ Content Security Policy
- ✅ No remote code execution
- ✅ Local data storage only

### Privacy:
- ✅ No analytics or tracking
- ✅ No data sent to servers
- ✅ Fully offline capable
- ✅ Local storage only

**Report Security Issues:** See [SECURITY.md](SECURITY.md)

---

## 📚 Documentation

- **User Guide:** [DESKTOP_APP.md](DESKTOP_APP.md)
- **Release Process:** [RELEASE_INSTRUCTIONS.md](RELEASE_INSTRUCTIONS.md)
- **Icon Guide:** [build/ICON_INSTRUCTIONS.md](build/ICON_INSTRUCTIONS.md)
- **Health Report:** [HEALTH_REPORT.md](HEALTH_REPORT.md)
- **Security Policy:** [SECURITY.md](SECURITY.md)

---

## 🙏 Support & Contributing

### Found a Bug?
- Report via [GitHub Issues](https://github.com/FirmlyAware/keycrate/issues)
- Include OS version and steps to reproduce

### Feature Requests
- Open an issue with [Feature Request] tag
- Or use in-app feedback form

### Want to Contribute?
- Fork the repository
- Make your changes
- Submit a pull request
- See [README.md](README.md) for guidelines

### Enjoy KeyCrate?
- ⭐ Star the repository
- 💙 Sponsor development via [GitHub Sponsors](https://github.com/sponsors/FirmlyAware)
- 📢 Share with fellow developers

---

## 📄 License

**Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**

**You are free to:**
- Use, share, and modify for personal/educational purposes
- Fork and adapt for non-commercial projects

**You must:**
- Give credit to FirmlyAware
- Not use commercially without permission

**For commercial licensing:** Contact via GitHub

See [LICENSE](LICENSE) for full details.

---

## 🎯 What's Next?

### Upcoming in v1.2.0:
- Custom application icon
- Code signing (remove Windows warning)
- Cloud sync for custom shortcuts
- Plugin system for extensions
- Keyboard shortcut conflict detection
- Tutorial/onboarding flow

### Future Plans:
- Mobile companion app
- Multi-language support
- Themes and customization
- Community shortcut library
- Advanced search with filters

---

## 🎊 Thank You!

Thank you for using KeyCrate! This release represents hundreds of hours of development to bring you the best shortcut reference tool available.

**Special thanks to:**
- The open-source community
- Early testers and contributors
- Everyone who provided feedback

**Stay productive!** ⌨️

---

**Download Now:** [GitHub Releases](https://github.com/FirmlyAware/keycrate/releases/tag/v1.1.0)

*Built with ❤️ by developers, for developers*
