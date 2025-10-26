import { access, constants, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

const READ_FILE = 'fileToRead.txt';
const ERR_MSG = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readPath = path.join(__dirname, 'files', READ_FILE);

const read = async () => {
  try {
    await access(readPath, constants.F_OK);
  } catch (err) {
    console.error(`Error: file ${READ_FILE} doesn't exist`);
    throw new Error(ERR_MSG);
  }

  try {
    const contents = await readFile(readPath, { encoding: 'utf8' });
    if (contents) {
      console.log('-= File content: =-');
      console.log(contents);
      console.log('-= The END =-');
    } else {
      console.log(`"${READ_FILE}" file is empty`);
    }
  } catch (err) {
    console.error('Unexpected FS error');
    throw new Error(ERR_MSG);
  }
};

await read();
