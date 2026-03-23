'use client';

import { useEffect, useState } from 'react';
import { fetchProducts } from '@/services/api';
import Hero from '@/components/Hero';
import ProductCards from '@/components/ProductCards';
import TestimonialInstagram from '@/components/TestimonialInstagram';
import SubscribeSection from '@/components/SubscribeSection';
import Footer from '@/components/Footer';
import MagazineCarousel from '@/components/MagazineCarousel';
import Navbar from '@/components/Navbar';


export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then((res) => {
        console.log("Products response:", res);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setError("Unable to load the collection at this time. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
     
      <Hero />
      <ProductCards products={products} /> 
      <MagazineCarousel/>
      <TestimonialInstagram/>
      <SubscribeSection/>
     
      

    </div>
  );
}
