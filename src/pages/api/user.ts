// getting-started.js
import mongoose from 'mongoose';

const { MONGODB_URI = '' } = process.env;
const uri = MONGODB_URI;

export default async function searchUser(paran: any = {}) {
  
  await mongoose.connect(uri);

  const user = await userModel.find(paran);

  await mongoose.disconnect();

  return user;
  }
  

  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    admin: Boolean,
  });

  const userModel = mongoose.models?.users || mongoose.model('users', userSchema);
  
  