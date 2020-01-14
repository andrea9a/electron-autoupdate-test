// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
// const electron = require('electron');
const { ipcRenderer } = require('electron');

console.log("seondig")
ipcRenderer.send('variable-request', ['token']);

ipcRenderer.on('variable-reply', function (event, args) {
  console.log(args[0]); // "name"
  document.getElementById("titolo").innerHTML = args[0]
});