// components/ProductList.tsx

'use client';

import { useState, useEffect } from 'react';
import { Input } from './ui/input';
import ProductCard from './ProductCard';
import { Product } from '../context/CartContext';

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Replace with API call or database fetch in production
    const fetchProducts = async () => {
      const data: Product[] = [
        {
          id: 1,
          name: 'Product 1',
          description: 'Description for Product 1',
          price: 19.99,
          image: '/placeholder.svg',
        },
        // Add more products here
      ];
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-sm mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}