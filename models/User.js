import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  },
  password: {
    type: String,
    required: true
  }
});

export default mongoose.models.User || mongoose.model('User', UserSchema, 'User');
