// let generate = require('../dist/snailMarkDown');
let generate = require('../src/index')
let ary = Object.keys(generate);
// console.log(ary)
// ary.forEach(element => {
//     console.log('+____________+'+element+":::::"+generate[element].toString())
// });

generate.deal('./testData/testMd','./testData/mdDoc','./testData/htmlTemplate.html')
