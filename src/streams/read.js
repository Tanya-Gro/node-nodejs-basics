import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { stdout } from 'node:process';

import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const READ_FILE = 'fileToRead.txt';
const readPath = path.join(__dirname, 'files', READ_FILE);
const ERR_MSG = 'FS operation failed';

const read = async () => {
  try {
    const stream = createReadStream(readPath, { encoding: 'utf8' });
    await pipeline(stream, stdout);
  } catch (err) {
    console.error('Error during stream');
    throw new Error(ERR_MSG);
  }
};

await read();
