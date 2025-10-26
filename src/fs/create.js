import {access, constants, writeFile} from 'node:fs/promises';
import path from 'node:path';

const CONTENT = 'I am fresh and young';
const ERR_MSG = 'FS operation failed';

const file = 'fresh.txt';
const filePath = path.join(process.cwd(), 'fs', 'files', file);

const create = async() => {
  try {
    await access(filePath, constants.F_OK);
    throw new Error (ERR_MSG);
  } catch (err) {
    if (err?.code === 'ENOENT') {
      await writeFile(filePath, CONTENT, 'utf-8');
    } else {
      console.log(err)
    }
  }
};

await create();
