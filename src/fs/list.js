import { stat, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'url';
import path from 'node:path';

const SOURCE_FOLDER = 'files';
const ERR_MSG = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourcePath = path.join(__dirname, SOURCE_FOLDER);

const list = async () => {
  try {
    const stats = await stat(sourcePath); 
    if (!stats.isDirectory()) { 
      throw new Error(ERR_MSG);
    }
  } catch (err) {
    console.error(`Error: folder "${SOURCE_FOLDER}" doesn't exist`);
    throw new Error(ERR_MSG);
  }

  try {
    const files = await readdir(sourcePath); 
    if (files.length > 0) {
      console.log(`Files in "${SOURCE_FOLDER}":`);
      files.forEach((file, index) => console.log(`${index + 1}) ${file}`));
    } else {
      console.log(`There are no files in "${SOURCE_FOLDER}" folder`);
    }
  } catch (err) {
    console.error('Unexpected FS error');
    throw new Error(ERR_MSG);
  }
};

await list();
