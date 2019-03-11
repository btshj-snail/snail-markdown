#!/usr/bin/env node

// console.log('Snail Markdown > ')

const program = require('commander');
const generate = require('../src/generateHtml');

// program
//   .version('1.0.0','-v --version')
//   .option('-s,--source','set source folder')
//   .option('-t,--target','set save position of folder')
//   .option('-p,--html-template','set the template of html file')

program
    .command('resolve <source> <target> <html-template>')
    .action(function(source,target,htmlTemplate,cmd){
        console.log("源地址:",source,'----',"目标地址:",target,'----',"HTML模板地址:",htmlTemplate)
        generate.deal(source,target,htmlTemplate)
    })


program.parse(process.argv);
