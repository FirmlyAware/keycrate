# KeyCrate Desktop App

## 🎉 Windows .EXE Successfully Built!

Your KeyCrate desktop application has been compiled into a Windows executable.

### 📦 Build Output

**Location:** `release/KeyCrate-Setup-1.1.0.exe` (87 MB)

**What's Included:**
- Full installer with setup wizard
- System tray integration
- Global keyboard shortcut: **Ctrl+Shift+K** (show/hide app)
- Auto-update capability
- Uninstaller

---

## 🚀 Installation & Usage

### Install the App

1. Navigate to: `keycrate-app/release/`
2. Double-click: **KeyCrate-Setup-1.1.0.exe**
3. Follow the installation wizard
4. Choose installation directory
5. Create desktop/start menu shortcuts

### Run the App

After installation:
- **Desktop shortcut:** Double-click KeyCrate icon
- **Start menu:** Search for "KeyCrate"
- **Global shortcut:** Press `Ctrl+Shift+K` anywhere in Windows

### Features

**System Tray:**
- App minimizes to system tray (doesn't close)
- Right-click tray icon for menu
- Single-click to show/hide

**Global Shortcut:**
- Press `Ctrl+Shift+K` from anywhere
- Instantly shows/hides KeyCrate
- Works even when app is in background

**Window Controls:**
- Minimize: Hides to tray
- Maximize: Full screen
- Close: Minimizes to tray (doesn't quit)

---

## 🛠️ Development

### Run in Development Mode

```bash
npm run electron
```

This starts:
1. Vite dev server (http://localhost:3000)
2. Electron app pointing to dev server
3. Dev tools enabled

### Build Commands

```bash
# Build Windows installer
npm run electron:build:win

# Build for macOS (requires macOS)
npm run electron:build:mac

# Build for Linux
npm run electron:build:linux

# Build for all platforms
npm run electron:build
```

### Build Output

All builds go to `release/` directory:
- **Windows:** `.exe` installer
- **macOS:** `.dmg` and `.zip`
- **Linux:** `.AppImage` and `.deb`

---

## 📁 Project Structure

```
keycrate-app/
├── electron/
│   ├── main.js          # Main Electron process
│   └── preload.js       # Preload script (security bridge)
├── src/                 # React app source
├── dist/                # Built React app (after npm run build)
├── release/             # Electron builds (.exe, .dmg, etc.)
└── package.json         # Scripts and dependencies
```

---

## ⚙️ Configuration

### Change App Icon

1. Place icons in `build/` directory:
   - `icon.ico` (Windows, 256x256)
   - `icon.icns` (macOS)
   - `icon.png` (Linux, 512x512)

2. Rebuild:
   ```bash
   npm run electron:build:win
   ```

### Change Global Shortcut

Edit `electron/main.js` line 68:
```javascript
globalShortcut.register('CommandOrControl+Shift+K', () => {
  // Change 'CommandOrControl+Shift+K' to your preferred shortcut
});
```

### App Settings

Edit `package.json` "build" section:
- `appId`: Unique app identifier
- `productName`: Display name
- `directories`: Build output paths

---

## 🐛 Troubleshooting

### App Won't Start
- Check Windows Defender/antivirus
- Run as administrator
- Check `%APPDATA%/KeyCrate/logs`

### Global Shortcut Not Working
- Another app may be using Ctrl+Shift+K
- Check shortcut conflicts in Windows
- Change shortcut in `electron/main.js`

### Build Errors
```bash
# Clear caches and rebuild
rm -rf node_modules dist release
npm install
npm run electron:build:win
```

---

## 📝 Notes

**Installer Type:**
- NSIS installer (Windows standard)
- Not one-click (user chooses directory)
- Creates uninstaller automatically

**Security:**
- App is not code-signed (Windows may show warning)
- To sign: Get code signing certificate
- Add certificate to `electron-builder` config

**Distribution:**
- Current build: 87 MB (includes Electron runtime)
- Can be compressed for distribution
- GitHub Releases recommended for hosting

---

## 🎯 Next Steps

1. **Test the app:** Run the installer and test all features
2. **Create icon:** Replace placeholder icon in `build/`
3. **Code sign (optional):** For production distribution
4. **Auto-updates:** Configure with electron-updater
5. **Release:** Upload to GitHub Releases

---

## 🔗 Resources

- [Electron Docs](https://www.electronjs.org/docs/latest/)
- [electron-builder](https://www.electron.build/)
- [Auto-updates Guide](https://www.electron.build/auto-update)

---

**Built with:** Electron 38.3.0, Vite 5, React 18
