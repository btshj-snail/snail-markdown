var generate = require('./generateHtml');


generate.deal('./testData/testMd','./testData/mdDoc','./testData/htmlTemplate.html')


module.exports = generate;