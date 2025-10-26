import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

const OLD_FILE = 'wrongFilename.txt';
const NEW_FILE = 'properFilename.md';
const ERR_MSG = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(path.dirname(__filename), 'files');

const oldPath = path.join(__dirname, OLD_FILE);
const newPath = path.join(__dirname, NEW_FILE);

const rename = async () => {
  try {
    await fs.access(oldPath, fs.constants.F_OK);
  } catch (err) {
  console.error(`Error: file ${OLD_FILE} doesn't exist`);
  throw new Error(ERR_MSG);
  }

  try {
    await fs.access(newPath, fs.constants.F_OK);
    console.error(`Error: file ${NEW_FILE} exist`);
    throw new Error(ERR_MSG);
  } catch (err) {
    if (err.message === ERR_MSG) {
      throw err;
    }
  }

  try {
    await fs.rename(oldPath, newPath);
    console.log('File renamed successfully.');
  } catch (err) {
    console.error('Unexpected FS error');
    throw new Error(ERR_MSG);
  }
}

await rename();
