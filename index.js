#! /usr/bin/env node

const _ = require('lodash');
const shell = require('shelljs');
//const path = require('path');

const packagesToInstall = [
  "@avoine/mobile-components",
  "react-native-elements",
  "react-native-vector-icons",
  "react-navigation",
  "react-redux",
  "redux",
]

const usage = (msg) => {
  console.log(msg);
  console.log("")
  console.log('Usage:');
  console.log('avoine-mobile-init projectname');
}

console.log('Initing Avoine Mobile Application')
console.log('=================================')
console.log();

const params = process.argv.slice(2);

if (_.isEmpty(params[0])) {
  usage('Please, provide new project path');
}

const installPath = params[0].toLowerCase();

console.log('Run react-native init ' + installPath);
shell.exec('react-native init ' + installPath);


console.log('Copy Avoine Mobile Application template to ' + installPath)
const currentPath = process.cwd()
const sourcePath = __dirname + '/template/*'
const targetPath = currentPath + '/' + installPath
shell.cp('-R', sourcePath, targetPath)


console.log('Install packages needed by Avoine Mobile Application')
shell.cd(targetPath);
const packageString = packagesToInstall.join(' ');
shell.exec('npm i --save install ' + packageString)


console.log('Linking react-native packages')
shell.exec('react-native link')

console.log('Done!')