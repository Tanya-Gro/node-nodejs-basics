import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { stdin, stdout } from 'node:process';

import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WRITE_FILE = 'fileToWrite.txt';
const writePath = path.join(__dirname, 'files', WRITE_FILE);
const ERR_MSG = 'FS operation failed';

const write = async () => {
  const source = stdin;
  const stream = createWriteStream(writePath);
  console.log('Waiting for input...');
  try {
    await pipeline(source, stream);
  } catch (err) {
    console.error('Error during stream');
    throw new Error(ERR_MSG);
  }
};

await write();
