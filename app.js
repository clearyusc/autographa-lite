const electron = require('electron');
const session = require('electron').session;
 if(require('electron-squirrel-startup')) return;

// Module to control application life.
const {app} = electron
// Module to create native browser window.
const {BrowserWindow} = electron;

const autoUpdater = require('electron').autoUpdater;
const appVersion = require('./package.json').version;
const os = require('os').platform();

const fs = require('fs');
const path = require('path');

// this should be placed at top of main.js to handle setup events quickly
// if (handleSquirrelEvent()) {
//   // squirrel event handled and app will exit in 1000ms, so don't do anything else
//   return;
// }

var updateFeed = 'http://localhost:3000/releases/win32/0.0.2/Autographa';

autoUpdater.setFeedURL(updateFeed);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
    width: 800,
	height: 600,
    'min-width': 600,
    'min-height': 300,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden',
    'webPreferences': {'session': session},
    show: false
    });

    // and load the index.html of the app.
    win.loadURL(`file:${__dirname}/app/views/index.html`);

    //loading window gracefully
    win.once('ready-to-show', () => {
	// Open the DevTools.
	//win.webContents.openDevTools();	
        win.maximize();
        win.show();


    });

    // Emitted when the window is closed.
    win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
	win = null;
	if (process.platform !== 'darwin') {
	    app.quit();
	}
    });
}

// var dbSetup = 

function preProcess() {
    handleUpdates
     .then((response) => {

         //return dbSetup;
         return new Promise(
        function (resolve, reject) {
        // Setup database.
        var dbUtil = require(`${__dirname}/app/util/DbUtil.js`);
        dbUtil.setupTargetDb
            .then((response) => {
            console.log(response);
            return dbUtil.setupRefDb;
            })
            .then((response) => {
            console.log(response);
            resolve(response);
            })
            .catch((err) => {
            console.log('Error while DB setup. ' + err);
            reject(err);
            });
        });
     })
     .then((response) => {
        // copyFolderRecursiveSync(`${__dirname}/db`, app.getPath('userData'));
        createWindow();
     })
     .catch((err) => {
         console.log('Error while App intialization.' + err);
     });
 //    dbSetup
	// .then((response) => {
	//     createWindow();
 //        copyFolderRecursiveSync(`${__dirname}/db`, app.getPath('userData'));
	// })
	// .catch((err) => {
	//     console.log('Error while App intialization.' + err);
	// });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', preProcess);



// if (process.env.NODE_ENV !== 'development') {
//   updateFeed = os === 'darwin' ?
//     'https://mysite.com/updates/latest' :
//     'http://localhost/releases/win32';
// }





// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
    app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
    createWindow();
    }
});


function copyFileSync( source, target ) {

    var targetFile = target;

    //if target is a directory a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync( source, target ) {
    var files = [];

    //check if folder needs to be created or integrated
    var targetFolder = path.join( target, path.basename( source ) );
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    //copy
    if ( fs.existsSync( source ) && fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder );
            } else {
                copyFileSync( curSource, targetFolder );
            }
        } );
    }
}

var handleUpdates = new Promise(
    function (resolve, reject) {
    // If DB does not exist in the application dir
    if(!fs.existsSync(path.join(`${__dirname}`, 'db'))){
        if(fs.existsSync(app.getPath('userData')+'/db')){
            copyFolderRecursiveSync((app.getPath('userData')+'/db'), path.join(`${__dirname}`));
        }else{
            console.log("resolve")
            resolve('new installation');
        }

    }
    // Check if backup location has DB folder.
    // If yes. Copy db from Backup to installation folder.
    // then
    var dbBackedUp = false;
    autoUpdater.checkForUpdates();
    autoUpdater.on('update-available', () => {
        console.info('Found available update!')
        // Check if DB folder does not exist then.
            // resolve('Updates available now.'); 
    });

    autoUpdater.on('update-not-available', () => {
        console.info('There are no updates available.')
        resolve('No updates available now.');
    });

    autoUpdater.on('update-downloaded', () => {
        console.info('update downloaded.');
         // If DB folder exists then back-up DB here and if successful.
        if(fs.existsSync(path.join(`${__dirname}`, 'db'))){
            copyFolderRecursiveSync(path.join(`${__dirname}`, 'db'), app.getPath('userData'));
            dbBackedUp = true;
        }
        // then (after backing up folders)
        if(dbBackedUp) {
            autoUpdater.quitAndInstall();
        }
    });
    
    autoUpdater.on('error', (e) => {
        console.error(e.message)
        reject('Error doing update.');
    });
    });
