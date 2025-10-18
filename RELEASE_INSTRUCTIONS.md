# Creating a GitHub Release for KeyCrate Desktop

## 📦 Your .exe File is Ready!

**Location:** `C:\Users\accou\Desktop\keycrate\keycrate-app\release\KeyCrate-Setup-1.1.0.exe`
**Size:** 87 MB

---

## 🚀 Creating a GitHub Release (Manual)

### Step 1: Go to GitHub Releases

1. Open: https://github.com/FirmlyAware/keycrate/releases
2. Click: **"Draft a new release"** button

### Step 2: Create the Release

**Tag version:**
```
v1.1.0
```

**Release title:**
```
KeyCrate v1.1.0 - Desktop App Release
```

**Description:** (Copy/paste this)
```markdown
# KeyCrate v1.1.0 Desktop App 🚀

The ultimate reference app for shortcuts, commands, and developer tools - now as a native desktop application!

## ✨ New in This Release

### Desktop Application
- **Native Windows app** with system tray integration
- **Global shortcut**: Press `Ctrl+Alt+K` anywhere to show/hide KeyCrate
- **Auto-update support**: Automatically checks for new versions
- **Offline capable**: Works without internet connection
- **Fast startup**: Instant access to shortcuts and commands

### Features
- Comprehensive shortcut reference (Windows, text editing, development)
- Command database (CMD, PowerShell, Git, NPM, Python, networking)
- Custom shortcut creator with local storage
- Draggable productivity toolbox
- Dark/light theme support
- Search functionality across all content
- Export/import toolbox configurations

## 📥 Download & Installation

### Windows
1. Download `KeyCrate-Setup-1.1.0.exe` below
2. Run the installer
3. Follow the setup wizard
4. Launch KeyCrate from desktop or start menu
5. Press `Ctrl+Alt+K` from anywhere to show/hide

**System Requirements:**
- Windows 10 or later
- 200 MB free disk space
- No additional dependencies needed

## 🎯 Quick Start

1. **Launch the app** from desktop shortcut
2. **Browse categories** in the left sidebar
3. **Search** for any command or shortcut
4. **Add to toolbox** using the + icon
5. **Press Ctrl+Alt+K** to quickly access anytime

## 🔧 Configuration

### Change Global Shortcut
The default shortcut is `Ctrl+Alt+K`. If you need to change it:
- Open: `electron/main.js`
- Find: line 87
- Modify: `'CommandOrControl+Alt+K'` to your preference
- Rebuild the app

### System Tray
- App minimizes to system tray (doesn't close)
- Right-click tray icon for menu
- Single-click to show/hide window

## 🐛 Known Issues

- Default Electron icon (custom icon coming in next release)
- First launch may show Windows Defender warning (app is not code-signed)

## 📝 Changelog

### Added
- Native Electron desktop application
- Global keyboard shortcut support
- System tray integration
- Auto-update mechanism
- Offline functionality

### Changed
- Moved from web-only to cross-platform desktop app
- Improved performance and startup time

### Technical
- Built with Electron 38.3.0
- React 18 frontend
- Vite 5 build system
- electron-updater for automatic updates

## 🙏 Support

- Star ⭐ this repo if you find it helpful!
- Report bugs via [GitHub Issues](https://github.com/FirmlyAware/keycrate/issues)
- Consider [sponsoring](https://github.com/sponsors/FirmlyAware) development

## 📄 License

CC BY-NC 4.0 - Free for personal and educational use.
Commercial use requires permission.

---

**Built with ⌨️ by developers, for developers**
```

### Step 3: Upload the .exe File

1. Scroll to **"Attach binaries"** section
2. **Drag and drop** or click to upload:
   - File: `KeyCrate-Setup-1.1.0.exe`
   - Location: `C:\Users\accou\Desktop\keycrate\keycrate-app\release\`

### Step 4: Publish

1. ✅ Check **"Set as the latest release"**
2. Click **"Publish release"**

---

## 🎉 After Publishing

### Your release will be available at:
```
https://github.com/FirmlyAware/keycrate/releases/tag/v1.1.0
```

### Users can download:
- Direct .exe download link
- Auto-update will check this release

### The auto-updater will:
- Check for new releases automatically
- Download updates when available
- Notify users of new versions
- Install on app restart

---

## 🔄 Future Releases

### When you have a new version (e.g., v1.2.0):

1. Update `package.json` version to `1.2.0`
2. Rebuild: `npm run electron:build:win`
3. Create new release on GitHub
4. Upload new .exe
5. Auto-updater will notify existing users!

---

## 📊 Release Checklist

- [x] .exe file built successfully
- [x] Code committed and pushed to GitHub
- [ ] GitHub release created with v1.1.0 tag
- [ ] .exe file uploaded to release
- [ ] Release published as latest
- [ ] Download link tested
- [ ] Auto-update tested (after second release)

---

## 💡 Optional: GitHub CLI Method

If you install GitHub CLI (`gh`), you can create releases via command line:

```bash
# Install GitHub CLI first (https://cli.github.com/)

# Create release
gh release create v1.1.0 \
  release/KeyCrate-Setup-1.1.0.exe \
  --title "KeyCrate v1.1.0 - Desktop App Release" \
  --notes-file RELEASE_NOTES.md
```

---

## 🛠️ Troubleshooting

**"Windows protected your PC" warning:**
- Click "More info"
- Click "Run anyway"
- This happens because the app is not code-signed
- Consider getting a code signing certificate for future releases

**Release not showing auto-update:**
- Ensure release is marked as "latest"
- Check `package.json` has correct version
- Wait 5-10 minutes for GitHub CDN to update

---

**Need help?** Open an issue on GitHub!
