import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createGunzip } from 'node:zlib';

import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ARCHIVE_FILE = 'archive.gz';
const DECOMPRESS_FILE = 'fileToCompress.txt';

const archivePath = path.join(__dirname, 'files', ARCHIVE_FILE);
const decompressPath = path.join(__dirname, 'files', DECOMPRESS_FILE);

const ERR_MSG = 'FS operation failed';

const decompress = async () => {
  const source = createReadStream(archivePath);
  const gunzip = createGunzip();
  const goal = createWriteStream(decompressPath);

  try {
    await pipeline(source, gunzip, goal);
  } catch (err) {
    console.error('Error during stream');
    throw new Error(ERR_MSG);
  }
};

await decompress();
