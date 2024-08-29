import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';

export async function GET() {
    await dbConnect();

    const users = await User.find({}, '-password');
    return new Response(JSON.stringify(users), { status: 200 });
}
