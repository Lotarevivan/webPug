const fs = require('fs');
const htmlWebpackPlugin = require('html-webpack-plugin');
const testFolder = './src/pages';

// получаем директории страниц
const pagesDirs = fs.readdirSync(testFolder)

const generateHtmlPlugin = (title) => {
  return new htmlWebpackPlugin({
    title,
    filename: `${title.toLowerCase()}.html`,
    template: `./src/pages/${title.toLowerCase()}/${title.toLowerCase()}.pug`,
  });
}

//формируем массив для webpack.config
const populateHtmlPlugins = (pagesArray) => { 
  res = [];
  pagesArray.forEach(page => {
    res.push(generateHtmlPlugin(page));
  })
  return res;
}

const generatedPages = populateHtmlPlugins(pagesDirs);
module.exports = generatedPages