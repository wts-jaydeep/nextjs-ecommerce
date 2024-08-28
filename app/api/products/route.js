import Product from '@/models/Product';
import dbConnect from '@/utils/dbConnect';

export async function GET(req) {
    await dbConnect();

    const products = await Product.find({});
    return new Response(JSON.stringify(products), { status: 200 });
}