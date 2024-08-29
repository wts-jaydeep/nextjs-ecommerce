import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
    match: [/^\d{10}$/, 'Please provide a valid contact number'],
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
