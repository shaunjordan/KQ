const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');


let win;

//Creates new window
function createWindow() {
  win = new BrowserWindow({
    height: 650,
    width: 900,
    icon: path.join(__dirname,'assets/icons/png/64x64.png')
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  const menuTemplate = [
    {
      label: 'File',
      submenu: [
        {label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
        click(){
          app.quit();
          }
        },
        {role: 'reload'},
        {role: 'toggledevtools'}
      ]
    },
    {
      label: 'Edit',
      submenu: [
        // { label: 'Undo', selector: 'undo:', accelerator: process.platform == 'darwin' ? 'Cmd+Z' : 'Ctrl+Z' },
        // { label: 'Redo', selector: 'redo:', accelerator: process.platform == 'darwin' ? 'Shift+Cmd+Q' : 'Ctrl+Y' },
        // { type: 'separator' },
        // { label: 'Cut', selector: 'cut:', accelerator: process.platform == 'darwin' ? 'Cmd+X' : 'Ctrl+X' },
        // { label: 'Copy', selector: 'copy:', accelerator: process.platform == 'darwin' ? 'Cmd+C' : 'Ctrl+C' },
        // { label: 'Paste', selector: 'paste:', accelerator: process.platform == 'darwin' ? 'Cmd+V' : 'Ctrl+V' },
        // { label: 'Select All', selector: 'selectAll:', accelerator: process.platform == 'darwin' ? 'Cmd+A' : 'Ctrl+A' }
        {role:'undo'},
        {type:'separator'},
        {role:'cut'},
        {role:'copy'},
        {role:'paste'},
        {role:'selectall'}
      ]
    },
    {
      label: 'View',
      submenu: [
        {role:'togglefullscreen'},
        {role: 'minimize'},
        {role: 'zoomin'},
        {role: 'zoomout'}
      ]
    },
    {
      label: 'Help',
      submenu: [
        {label: 'Tutorial',
        accelerator: 'Ctrl+H',
        click: () => {openTutorial()}
        },
        {label: 'About',
        click: () => {openAboutWindow()}
        }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

  if(process.platform == 'darwin') {
    menuTemplate.unshift({});
  }

  win.on('closed', () => {
    win = null;
  });
}

// Tutorial Window
function openTutorial(){
  let tutorialWindow = new BrowserWindow({
    parent: win,
    modal: true,
    show: false,
    width: 600,
    height: 400,
    icon: path.join(__dirname,'assets/icons/png/64x64.png')
  });
  tutorialWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'windows/tutorial.html'),
    protocol: 'file:',
    slashes: true
  }));
  tutorialWindow.setMenu(null)
  tutorialWindow.once('ready-to-show', function(){
      tutorialWindow.show();
  });
}

// About Window
function openAboutWindow(){
  let aboutWindow = new BrowserWindow({
    parent: win,
    modal: true,
    show: false,
    width: 600,
    height: 400,
    icon: path.join(__dirname,'assets/icons/png/64x64.png')
  });
  aboutWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'windows/about.html'),
    protocol: 'file:',
    slashes: true
  }));
  aboutWindow.setMenu(null)
  aboutWindow.once('ready-to-show', function(){
      aboutWindow.show();
  });
}

app.on('ready', createWindow);

// Quit when all windows closed
app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit
  }
});

app.on('activate', () => {
  if(win === null) {
    createWindow();
  }
});
