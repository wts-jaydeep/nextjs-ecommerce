'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch('/api/products');
            const data = await res.json();
            console.log("data", data)
            setProducts(data);
            setCategories([...new Set(data.map(product => product.category))]);
        }
        fetchProducts();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (order) => {
        setSortOrder(order);
        const sortedProducts = [...products].sort((a, b) =>
            order === 'asc' ? a.price - b.price : b.price - a.price
        );
        setProducts(sortedProducts);
    };

    const handleFilter = (category) => {
        setProducts(products.filter(product => product.category === category));
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search products"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border border-gray-300 rounded-md p-2 w-full max-w-sm"
                />
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleSort('asc')}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Sort by Price: Low to High
                    </button>
                    <button
                        onClick={() => handleSort('desc')}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Sort by Price: High to Low
                    </button>
                </div>
            </div>

            <div className="flex space-x-4 mb-6">
                <h3 className="font-bold">Categories:</h3>
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => handleFilter(category)}
                        className="bg-gray-200 px-3 py-1 rounded-md"
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                    <div key={product._id} className="border rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={product.thumbnail}
                            alt={product.title}
                            width={0}
                            height={0}
                            sizes='100vw'
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="font-bold text-lg">{product.title}</h2>
                            <p className="text-gray-600 text-sm">{product.description.substring(0, 100)}...</p>
                            <p className="text-green-600 font-semibold mt-2">${product.price}</p>
                            <Link href={`/products/${product._id}`}>
                                <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
