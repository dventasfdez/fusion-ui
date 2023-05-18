/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// move declarations from components/ to every named folder
const path = require('path');
const fs = require('fs-extra');

const getFolders = (dir) => {
  return fs.readdirSync(dir).filter((file) => {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
};

const getFiles = (dir) => {
  return fs.readdirSync(dir).filter((file) => {
    return fs.statSync(path.join(dir, file)).isFile();
  });
};

function main() {
  const folders = getFolders('./dist/components');

  folders.forEach((folder) => {
    const subfolders = getFiles(`./dist/components/${folder}`);
    subfolders.forEach((file) => {
      const composedFile = file === folder.split('.')[0] ? 'index.d.ts' : `${file}`;
      fs.moveSync(
        path.join(__dirname, `../dist/components/${folder}/${file}`),
        path.join(__dirname, `../dist/${folder}/${composedFile}`)
      );
    });
  });
  fs.moveSync(path.join(__dirname, '../dist/components/index.d.ts'), path.join(__dirname, '../dist/index.d.ts'), {
    overwrite: true,
  });

  fs.rm('./dist/components', {recursive: true}, (err) => {
    if (err) throw err;
  });
}

main();
