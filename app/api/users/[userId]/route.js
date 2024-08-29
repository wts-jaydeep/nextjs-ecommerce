import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';

export async function GET(req, { params }) {
    await dbConnect();
    const { userId } = params;

    const users = await User.findById(userId, '-password');
    return new Response(JSON.stringify(users), { status: 200 });
}

export async function PUT(req, { params }) {
    await dbConnect();

    const { userId } = params;
    const { name, email, contactNo } = await req.json();

    const user = await User.findById(userId);
    if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.contactNo = contactNo || user.contactNo;

    await user.save();
    return new Response(JSON.stringify({ message: 'User updated successfully' }), { status: 200 });
}
