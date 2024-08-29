import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';
import bcrypt from 'bcrypt';

export async function POST(req) {
  await dbConnect();
  
  const { name, email, password, contactNo } = await req.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    contactNo,
  });

  await user.save();
  return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
}
