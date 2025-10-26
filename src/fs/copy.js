import { stat, cp } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

const SOURCE_FOLDER = 'files';
const TARGET_FOLDER = 'files_copy';
const ERR_MSG = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourcePath = path.join(__dirname, SOURCE_FOLDER);
const targetPath = path.join(__dirname, TARGET_FOLDER);

const copy = async () => {
  try {
    const stats = await stat(sourcePath); 
    if (!stats.isDirectory()) { 
      throw new Error(ERR_MSG);
    }
  } catch (err) {
    console.error(err.message);
    throw new Error(ERR_MSG);
  }
  try {
    await cp(sourcePath, targetPath, {
      recursive: true,
      force: false,
      errorOnExist: true
    });
    console.log('Folder successfully copied.');
  } catch (err) {
    console.error(err.message);
    throw new Error(ERR_MSG);
  }
}

await copy();
