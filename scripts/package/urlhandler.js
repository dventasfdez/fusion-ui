const fs = require('fs');

const main = () => {
  // read index.css
  const css = fs.readFileSync('dist/index.css', 'utf8');
  // change the path to the image

  const newCss = css.replace(/url\(\..\/(.*?)\)/g, 'url(./$1)');
  // write the new css to index.css
  fs.writeFileSync('dist/index.css', newCss);
};

main();
