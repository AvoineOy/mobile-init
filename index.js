#! /usr/bin/env node

const _ = require('lodash');
const shell = require('shelljs');
const exec = require('shelljs.exec');
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

console.log('-- Executing `react-native init ' + installPath + '` to init React Native project --\n');
exec('react-native init ' + installPath);
console.log('\n[OK]\n')


console.log('-- Copying Avoine Mobile Application template to ' + installPath + ' --')
const currentPath = process.cwd()
const sourcePath = __dirname + '/template/*'
const targetPath = currentPath + '/' + installPath
shell.cp('-R', sourcePath, targetPath)
console.log('\n[OK]\n')


console.log('-- Installing packages needed by Avoine Mobile Application --')
shell.cd(targetPath);
const packageString = packagesToInstall.join(' ');
exec('npm i --save install ' + packageString)
console.log('\n[OK]\n')


console.log('-- Linking react-native packages --\n')
exec('react-native link')


console.log('\n[OK]\n')
console.log(
  '-- What\'s next --\n\n'
  + 'Run `cd ' + installPath + '` and `react-native run-ios` or `react-native run-android` to see your new application in action!\n'
  + '\n[DONE]\n'
)