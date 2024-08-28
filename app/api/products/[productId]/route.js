import Product from '@/models/Product';
import dbConnect from '@/utils/dbConnect';

export async function GET(req, { params }) {
    const { productId } = params;

    await dbConnect();
    
    const product = await Product.findById(productId);
    if (!product) {
        return new Response('Product not found', { status: 404 });
    }

    return new Response(JSON.stringify(product), { status: 200 });
}
