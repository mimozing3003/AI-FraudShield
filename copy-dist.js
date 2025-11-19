const fs = require('fs-extra');
const path = require('path');

async function copyDist() {
  try {
    // Copy frontend/dist to dist
    await fs.copy(path.join(__dirname, 'frontend', 'dist'), path.join(__dirname, 'dist'));
    console.log('Successfully copied frontend/dist to dist');
  } catch (err) {
    console.error('Error copying files:', err);
    process.exit(1);
  }
}

copyDist();