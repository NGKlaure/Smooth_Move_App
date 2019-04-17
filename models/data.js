import mongoose, { Schema } from 'mongoose';

// Define data schema
var dataSchema = new Schema({
  x: String,
  y: String,
  z: String,
  
});

// Export Mongoose model
export default mongoose.model('data', dataSchema);