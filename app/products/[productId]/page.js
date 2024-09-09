"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default async function ProductPage({ params }) {
  const [product, setProduct] = useState({});
  const { addToCart } = useCart();
  // console.log("process.env.NEXT_PUBLIC_API_URL",`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.productId}`)

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.productId}`);
      if (!res.ok) {
        notFound();
      }
      const data = await res.json();
      setProduct(data);
    }
    fetchProduct();
  }, [params]);

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Gallery */}
        <div className="flex flex-col space-y-4">
          <Image
            src={product?.thumbnail}
            alt={product?.title}
            className="w-full h-96 object-cover rounded-lg shadow-md"
            width={0}
            height={0}
            sizes='100vw'
          />
          <div className="grid grid-cols-3 gap-2">
            {/* Placeholder for additional images */}
            <Image
              src={product?.thumbnail}
              alt="Gallery Image"
              className="w-full h-24 object-cover rounded-md shadow-sm"
              width={0}
              height={0}
              sizes='100vw'
            />
            <Image
              src={product?.thumbnail}
              alt="Gallery Image"
              className="w-full h-24 object-cover rounded-md shadow-sm"
              width={0}
              height={0}
              sizes='100vw'
            />
            <Image
              src={product?.thumbnail}
              alt="Gallery Image"
              className="w-full h-24 object-cover rounded-md shadow-sm"
              width={0}
              height={0}
              sizes='100vw'
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">{product.title}</h1>
          <div className="text-lg text-gray-600">
            <span className="font-semibold text-green-600 text-2xl">${product.price}</span>
          </div>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <div className="flex items-center space-x-2">
            <span className="text-yellow-500 text-xl">★ ★ ★ ★ ☆</span>
            <span className="text-gray-500">(24 reviews)</span>
          </div>

          <div className="flex items-center space-x-4 mt-6">
            <button className="bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-md shadow-md hover:bg-blue-700 transition-colors" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
            {/* <button className="border border-blue-600 text-blue-600 text-lg font-semibold py-3 px-6 rounded-md shadow-md hover:bg-blue-600 hover:text-white transition-colors">
              Buy Now
            </button> */}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Product Details</h2>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li><strong>Category:</strong> {product.category}</li>
              <li><strong>Brand:</strong> {product.brand}</li>
              <li><strong>Stock:</strong> {product.stock} items available</li>
              <li><strong>SKU:</strong> {product.sku}</li>
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Customer Reviews</h2>
            <div className="mt-4 space-y-4">
              <div className="bg-gray-100 p-4 rounded-md shadow-sm">
                <p className="font-semibold text-gray-800">John Doe</p>
                <p className="text-sm text-gray-600">★ ★ ★ ★ ☆</p>
                <p className="mt-2 text-gray-700">Great product, exactly what I needed. Highly recommend!</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md shadow-sm">
                <p className="font-semibold text-gray-800">Jane Smith</p>
                <p className="text-sm text-gray-600">★ ★ ★ ☆ ☆</p>
                <p className="mt-2 text-gray-700">Good quality, but a bit pricey for what it offers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
