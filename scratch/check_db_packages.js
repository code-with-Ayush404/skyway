import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('backend/.env') });

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/starline_travel";
console.log('Connecting to:', mongoUri);

try {
  await mongoose.connect(mongoUri);
  console.log('Connected!');
  
  const tourSchema = new mongoose.Schema({}, { strict: false });
  const Tour = mongoose.model('Tour', tourSchema, 'tours');
  
  const tours = await Tour.find();
  console.log('Tours count:', tours.length);
  if (tours.length > 0) {
    tours.forEach((t, i) => {
      console.log(`${i+1}: ${t.get('title')} - Image: ${t.get('image')}`);
    });
  } else {
    console.log('No tours in database.');
  }
  
  await mongoose.disconnect();
} catch (e) {
  console.error('Error:', e);
}
