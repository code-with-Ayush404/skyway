import fs from 'fs';
import https from 'https';
import path from 'path';

const url = 'https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/footage/table-mountain.mp4';
const dest = path.resolve('frontend/public/videos/india-tourism.mp4');

console.log(`Downloading video from ${url} to ${dest}...`);

const file = fs.createWriteStream(dest);

https.get(url, (response) => {
  if (response.statusCode !== 200) {
    console.error(`Failed to get video: Status Code ${response.statusCode}`);
    return;
  }
  
  response.pipe(file);
  
  file.on('finish', () => {
    file.close();
    console.log('Download completed successfully!');
  });
}).on('error', (err) => {
  fs.unlink(dest, () => {});
  console.error(`Error downloading: ${err.message}`);
});
