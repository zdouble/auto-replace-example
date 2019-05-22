const fs = require('fs');
let text = fs.readFileSync('./src/app.js', 'utf8');

const json = {};

text = text.replace(/<(.*?)[^>]*>\s*([^<>]*?)\s*<\/\1>/gm, ($0, $1, $2) => {
  json[$2] = $2
  return `<${$1}>I18n.t('${$2}')</${$1}>`
});

fs.writeFileSync('./src/app.js', text, (err) => {
    if(err) {
      console.log('替换失败');
      return;
    }
    console.log('替换成功');
})

fs.mkdir('locales', (err) => {
  if(err){
    console.log('创建目录失败');
    return;
  }
  console.log('创建目录成功');
})

text = `
export default ${JSON.stringify(json, null, 2)}
`;

fs.writeFile('./locales/en.js', text, (err) => {
  if(err) {
    console.log('写入失败');
    return;
  }
  console.log('写入成功');
});
