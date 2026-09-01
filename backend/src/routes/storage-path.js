const path = require('node:path');
const fs = require('node:fs');

const STORAGE_DIR = path.join(__dirname, '..', '..', 'storage');

fs.mkdirSync(STORAGE_DIR, { recursive: true });

module.exports = { STORAGE_DIR };
