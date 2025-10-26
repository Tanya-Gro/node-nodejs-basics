import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';

import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPRESS_FILE = 'fileToCompress.txt';
const ARCHIVE_FILE = 'archive.gz';

const compressPath = path.join(__dirname, 'files', COMPRESS_FILE);
const archivePath = path.join(__dirname, 'files', ARCHIVE_FILE);

const ERR_MSG = 'FS operation failed';

const compress = async () => {
  const source = createReadStream(compressPath);
  const gzip = createGzip();
  const goal = createWriteStream(archivePath);

  try {
    await pipeline(source, gzip, goal);
  } catch (err) {
    console.error('Error during stream');
    throw new Error(ERR_MSG);
  }
};

await compress();
