import { access, constants, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

const DELETE_FILE = 'fileToRemove.txt';
const ERR_MSG = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deletePath = path.join(__dirname, 'files', DELETE_FILE);

const remove = async () => {
  try {
    await access(deletePath, constants.F_OK);
  } catch (err) {
    console.error(`Error: file ${DELETE_FILE} doesn't exist`);
    throw new Error(ERR_MSG);
  }

  try {
    await unlink(deletePath);
    console.log('File successfully deleted');
  } catch (err) {
    console.error('Unexpected FS error');
    throw new Error(ERR_MSG);
  }
};

await remove();
