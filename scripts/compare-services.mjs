import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

const MONGODB_URI = 'mongodb+srv://websiteuser:berrisolpunjab17@cluster0.gpcpyk3.mongodb.net/tempbarrocelling?retryWrites=true&w=majority';
const serviceSchema = new mongoose.Schema({ title: String, slug: { type: String, required: true, unique: true }, content: { type: String, default: '' } }, { timestamps: true });
const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
function wc(text) { if (!text) return 0; return text.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length; }
async function run() {
  await mongoose.connect(MONGODB_URI);
  const jsonPath = path.resolve('scripts/scraped_services_raw.json');
  const rawData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const scrapedSlugs = Object.keys(rawData);
  const dbServices = await Service.find({}).select('slug content title');
  const dbSlugSet = new Set(dbServices.map(s => s.slug));
  const absent = scrapedSlugs.filter(s => !dbSlugSet.has(s));
  const stubs = dbServices.filter(s => wc(s.content) < 20 && scrapedSlugs.includes(s.slug));
  const noData = dbServices.filter(s => !scrapedSlugs.includes(s.slug));
  console.log('SCRAPED:', scrapedSlugs.length, 'DB:', dbServices.length);
  console.log('\nABSENT (' + absent.length + '):'); absent.forEach((s,i) => console.log(' '+(i+1)+'. '+s));
  console.log('\nSTUBS (' + stubs.length + '):'); stubs.forEach((s,i) => console.log(' '+(i+1)+'. '+s.slug));
  console.log('\nNO DATA (' + noData.length + '):'); noData.forEach((s,i) => console.log(' '+(i+1)+'. '+s.slug+' ('+wc(s.content)+' words)'));
  await mongoose.disconnect();
}
run().catch(console.error);
