const { app, BrowserWindow, globalShortcut, ipcMain, Menu, Tray } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;
let tray;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, '../public/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    show: false,
    backgroundColor: '#1f2937'
  });

  // Load the app
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Handle window close
  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });
}

function createTray() {
  const iconPath = path.join(__dirname, '../public/icon.png');
  tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show KeyCrate',
      click: () => {
        mainWindow.show();
      }
    },
    {
      label: 'Hide KeyCrate',
      click: () => {
        mainWindow.hide();
      }
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.isQuitting = true;
        app.quit();
      }
    }
  ]);

  tray.setToolTip('KeyCrate - Shortcut Reference');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });
}

function registerGlobalShortcuts() {
  // Global shortcut to show/hide the app
  // Default: Ctrl+Alt+K (less likely to conflict than Ctrl+Shift+K)
  const shortcut = 'CommandOrControl+Alt+K';

  const ret = globalShortcut.register(shortcut, () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  if (!ret) {
    console.log(`Global shortcut registration failed for ${shortcut}`);
    console.log('Another application may be using this shortcut.');
  } else {
    console.log(`Global shortcut registered: ${shortcut}`);
    console.log('Press Ctrl+Alt+K anywhere to show/hide KeyCrate');
  }
}

// Auto-updater configuration
function setupAutoUpdater() {
  if (isDev) {
    console.log('Auto-updater disabled in development mode');
    return;
  }

  // Configure update settings
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;

  // Update available
  autoUpdater.on('update-available', (info) => {
    console.log('Update available:', info.version);
    mainWindow.webContents.send('update-available', info);
  });

  // Update not available
  autoUpdater.on('update-not-available', (info) => {
    console.log('Update not available');
  });

  // Update downloaded
  autoUpdater.on('update-downloaded', (info) => {
    console.log('Update downloaded');
    mainWindow.webContents.send('update-downloaded', info);
  });

  // Error occurred
  autoUpdater.on('error', (err) => {
    console.log('Update error:', err);
  });

  // Check for updates on app start (after 3 seconds)
  setTimeout(() => {
    autoUpdater.checkForUpdates();
  }, 3000);

  // Check for updates every 6 hours
  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 6 * 60 * 60 * 1000);
}

app.whenReady().then(() => {
  createWindow();
  createTray();
  registerGlobalShortcuts();
  setupAutoUpdater();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } else {
      mainWindow.show();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  // Unregister all shortcuts
  globalShortcut.unregisterAll();
});

// IPC handlers for communication with renderer
ipcMain.handle('minimize-window', () => {
  mainWindow.minimize();
});

ipcMain.handle('maximize-window', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.handle('close-window', () => {
  mainWindow.hide();
});

ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});
