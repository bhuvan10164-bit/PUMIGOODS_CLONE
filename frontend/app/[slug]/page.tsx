'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProductBySlug } from '@/services/api';
import { Heart, Share2, Scale, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';

export default function ProductDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchProductBySlug(slug as string)
        .then((res) => {
          if (res.data && res.data.length > 0) {
            const prod = res.data[0];
            setProduct(prod);
            setActiveImage(prod.images.before_image);
          } else {
            setError("Product not found");
          }
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
          setError("Failed to load product details.");
        })
        .finally(() => setLoading(false));
    }
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images.before_image,
        brand: product.category, // using category as brand for now
        quantity: quantity
      }));
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error || !product) return <div className="min-h-screen flex items-center justify-center">{error || "Product not found"}</div>;

  return (
    <div className="bg-[#fafaf8] min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-8 flex items-center gap-2.5 font-sans">
          <Link href="/" className="hover:text-[#2e8b4a] transition-colors text-gray-400">Home</Link>
          <span className="text-gray-300 font-light">/</span>
          <Link href="/shop" className="hover:text-[#2e8b4a] transition-colors text-gray-400">{product.category}</Link>
          <span className="text-gray-300 font-light">/</span>
          <span className="text-gray-800 font-semibold">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Gallery */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="order-2 md:order-1 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[600px]">
              {product.images.gallery?.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 flex-shrink-0 border-2 transition-all rounded-lg overflow-hidden ${activeImage === img ? 'border-[#2e8b4a]' : 'border-transparent'}`}
                >
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="order-1 md:order-2 flex-1 bg-white rounded-2xl overflow-hidden shadow-sm aspect-square relative">
               <img src={activeImage || product.images.before_image} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl text-gray-800 mb-4 font-serif leading-tight">
              {product.name}
            </h1>
            
            <p className="text-2xl text-[#2e8b4a] font-bold mb-6 font-serif">
              ${product.price.toFixed(2)}
            </p>

            <div className="space-y-4 mb-8">
              {Object.entries(product.description).map(([key, value]) => (
                <div key={key} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2e8b4a] mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <span className="font-semibold capitalize">{key.replace(/_/g, ' ')}:</span> {value as string}
                  </p>
                </div>
              ))}
            </div>

            {/* Quantity and Cart */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 bg-white">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="text-gray-400 hover:text-gray-800 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-12 text-center bg-transparent border-none focus:ring-0 text-sm font-bold"
                />
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="text-gray-400 hover:text-gray-800 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-[#2e8b4a] text-white font-bold py-3 px-8 rounded-full hover:bg-[#226e3a] transition-all shadow-lg shadow-green-900/10"
              >
                ADD TO CART
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-8 font-medium">
              <button className="flex items-center gap-1.5 hover:text-[#2e8b4a] transition-colors uppercase tracking-wider text-[10px]">
                <Scale size={16} /> Compare
              </button>
              <button className="flex items-center gap-1.5 hover:text-[#2e8b4a] transition-colors uppercase tracking-wider text-[10px]">
                <Heart size={16} /> Add to wishlist
              </button>
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-2 text-xs text-gray-400 uppercase tracking-widest font-bold">
              <p>Category: <span className="text-gray-600 font-normal">{product.category}</span></p>
              <p>Tag: <span className="text-gray-600 font-normal">{product.category}</span></p>
              <div className="flex items-center gap-3 pt-2">
                <span>Share:</span>
                <div className="flex items-center gap-4 text-gray-600">
                  <Share2 size={16} className="cursor-pointer hover:text-[#2e8b4a]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
