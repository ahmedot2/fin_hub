import fs from 'fs';
import fetch from 'node-fetch';

const SCREENSHOTS_DIR = './public/screenshots';
const DATA_FILE = './src/lib/data.ts';

async function fetchScreenshots() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  const urlRegex = /url: '([^']+)'/g;
  let match;
  const urls = [];
  while ((match = urlRegex.exec(data)) !== null) {
    urls.push(match[1]);
  }

  for (const url of urls) {
    if (!url.startsWith('http')) continue;

    const idMatch = /id: '([^']+)'/.exec(data.substring(data.indexOf(url) - 100, data.indexOf(url)));
    if (!idMatch) continue;
    const id = idMatch[1];

    const screenshotUrl = `https://image.thum.io/get/width/600/crop/400/${url}`;
    const filename = `${id}.png`;
    const filepath = `${SCREENSHOTS_DIR}/${filename}`;

    if (fs.existsSync(filepath)) {
      console.log(`Skipping ${filename}, already exists.`);
      continue;
    }

    console.log(`Fetching screenshot for ${url}...`);
    try {
      const response = await fetch(screenshotUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch screenshot for ${url}: ${response.statusText}`);
      }
      const buffer = await response.buffer();
      fs.writeFileSync(filepath, buffer);
      console.log(`Saved screenshot to ${filepath}`);
    } catch (error) {
      console.error(error);
    }
  }
}

fetchScreenshots();