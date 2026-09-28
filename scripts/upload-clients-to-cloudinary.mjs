import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: 'fifvpxxi',
  api_key: '926578226187476',
  api_secret: 'ztH_XCzj6ASX3_sWtEO9XIClKKU'
});

const clientsDir = path.resolve('public/clients');
const files = fs.readdirSync(clientsDir);

async function run() {
  const results = {};
  for (const file of files) {
    const filePath = path.join(clientsDir, file);
    console.log(`Uploading ${file}...`);
    const res = await cloudinary.uploader.upload(filePath, {
      folder: 'borocelling/clients',
      public_id: path.parse(file).name
    });
    results[file] = res.secure_url;
    console.log(`Uploaded ${file} -> ${res.secure_url}`);
  }
  console.log('\n--- FINAL RESULTS ---');
  console.log(JSON.stringify(results, null, 2));
}

run().catch(console.error);
