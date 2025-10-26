import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { pipeline } from 'node:stream/promises';

import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CALCULATE_FILE = 'fileToCalculateHashFor.txt';
const calculatePath = path.join(__dirname, 'files', CALCULATE_FILE);
const ERR_MSG = 'FS operation failed';

const calculateHash = async () => {
  try {
    const hash = createHash('sha256');
    const input = createReadStream(calculatePath);

    await pipeline(input, hash);

    const result = hash.digest('hex');
    console.log(result);

    return result;
  } catch(err) {
    throw new Error(ERR_MSG); 
  };
};

await calculateHash();
