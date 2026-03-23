'use client';

import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCartItems, 
  selectCartTotal, 
  increaseQty, 
  decreaseQty, 
  removeFromCart,
  clearCart
} from '@/redux/cartSlice';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function Cart() {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  const deliveryFee = 50;
  const total = cartTotal + (cartItems.length > 0 ? deliveryFee : 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    
    alert('Order placed successfully! This is a demo store.');
    dispatch(clearCart());
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-4 max-w-7xl mx-auto w-full reveal reveal-2">
        <h1 className="display-font text-4xl mb-12 border-b border-[var(--color-border)] pb-6">Your Bag</h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-[var(--color-text-muted)] text-lg mb-6">Your bag is currently empty.</p>
            <Link href="/" className="px-8 py-3 bg-[var(--color-text-primary)] text-white font-medium hover:bg-black transition-colors rounded-full">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
             
             {/* Left Column: Cart Items */}
             <div className="lg:col-span-7 flex flex-col gap-8">
               {cartItems.map((item) => (
                 <div key={item.id} className="flex gap-6 pb-8 border-b border-[var(--color-border)] group">
                    <div className="relative w-24 h-32 bg-[#EFECE5] rounded-md overflow-hidden shrink-0">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-xs text-gray-400">No Img</div>
                      )}
                    </div>
                    
                    <div className="flex flex-col flex-grow">
                       <div className="flex justify-between items-start mb-1">
                         <span className="text-[10px] text-[var(--color-text-muted)] tracking-wider uppercase font-semibold">{item.brand}</span>
                         <span className="display-font text-[var(--color-accent)] font-semibold tnum text-lg">₹{item.price.toLocaleString()}</span>
                       </div>
                       
                       <h3 className="font-medium text-[var(--color-text-primary)] text-base leading-tight pr-8">{item.name}</h3>
                       
                       <div className="mt-auto flex items-center justify-between pt-4">
                          <div className="flex items-center border border-[var(--color-border)] rounded-full bg-[var(--color-surface)] px-1">
                            <button 
                              onClick={() => dispatch(decreaseQty(item.id))}
                              className="w-8 h-8 flex items-center justify-center text-[var(--color-text-muted)] hover:text-black transition-colors"
                              aria-label="Decrease quantity"
                            >−</button>
                            <span className="w-6 text-center text-sm font-medium tnum">{item.quantity}</span>
                            <button 
                              onClick={() => dispatch(increaseQty(item.id))}
                              className="w-8 h-8 flex items-center justify-center text-[var(--color-text-muted)] hover:text-black transition-colors"
                              aria-label="Increase quantity"
                            >+</button>
                          </div>
                          
                          <button 
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="text-xs text-[var(--color-text-muted)] underline underline-offset-4 hover:text-[var(--color-accent)] transition-colors"
                          >
                            Remove
                          </button>
                       </div>
                       
                       <div className="text-right mt-2 text-xs font-medium text-[var(--color-text-secondary)] tnum">
                          Subtotal: ₹{(item.price * item.quantity).toLocaleString()}
                       </div>
                    </div>
                 </div>
               ))}
             </div>

             {/* Right Column: Summary & Billing */}
             <div className="lg:col-span-5 relative">
                <div className="sticky top-24 flex flex-col gap-8">
                   
                   {/* Summary Card */}
                   <div className="bg-[#EFECE5] p-8 rounded-xl shadow-sm border border-[var(--color-border)]/50">
                      <h2 className="font-semibold text-sm uppercase tracking-wider mb-6 pb-4 border-b border-[var(--color-border)] text-[var(--color-text-primary)]">Order Summary</h2>
                      
                      <div className="flex flex-col gap-3 text-sm text-[var(--color-text-secondary)]">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span className="tnum">₹{cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery Options</span>
                          <span className="tnum">₹{deliveryFee.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-6 pt-6 border-t border-[var(--color-border)] border-dashed">
                        <span className="font-medium text-[var(--color-text-primary)]">Total</span>
                        <span className="display-font text-2xl font-bold text-[var(--color-accent)] tnum">₹{total.toLocaleString()}</span>
                      </div>
                   </div>

                   {/* Billing Form */}
                   <form onSubmit={handleCheckout} className="flex flex-col gap-6 bg-[var(--color-surface)] p-8 rounded-xl border border-[var(--color-border)] shadow-sm font-body">
                      <h2 className="font-semibold text-sm uppercase tracking-wider mb-2 text-[var(--color-text-primary)]">Shipping Details</h2>
                      
                      <div className="space-y-5">
                         <div className="relative group">
                           <input required type="text" id="name" placeholder=" " className="peer w-full bg-transparent border-b border-[var(--color-border)] py-2 text-sm focus:outline-none focus:border-[var(--color-text-primary)] transition-colors rounded-none placeholder-transparent" />
                           <label htmlFor="name" className="absolute left-0 -top-3.5 text-xs text-[var(--color-text-muted)] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[var(--color-text-primary)] cursor-text">Full Name</label>
                         </div>
                         
                         <div className="relative group">
                           <input required type="tel" id="mobile" placeholder=" " className="peer w-full bg-transparent border-b border-[var(--color-border)] py-2 text-sm focus:outline-none focus:border-[var(--color-text-primary)] transition-colors rounded-none placeholder-transparent" />
                           <label htmlFor="mobile" className="absolute left-0 -top-3.5 text-xs text-[var(--color-text-muted)] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[var(--color-text-primary)] cursor-text">Phone Number</label>
                         </div>

                         <div className="relative group">
                           <input required type="text" id="address" placeholder=" " className="peer w-full bg-transparent border-b border-[var(--color-border)] py-2 text-sm focus:outline-none focus:border-[var(--color-text-primary)] transition-colors rounded-none placeholder-transparent" />
                           <label htmlFor="address" className="absolute left-0 -top-3.5 text-xs text-[var(--color-text-muted)] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[var(--color-text-primary)] cursor-text">Street Address</label>
                         </div>

                         <div className="grid grid-cols-2 gap-4">
                           <div className="relative group">
                             <input required type="text" id="city" placeholder=" " className="peer w-full bg-transparent border-b border-[var(--color-border)] py-2 text-sm focus:outline-none focus:border-[var(--color-text-primary)] transition-colors rounded-none placeholder-transparent" />
                             <label htmlFor="city" className="absolute left-0 -top-3.5 text-xs text-[var(--color-text-muted)] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[var(--color-text-primary)] cursor-text">City</label>
                           </div>
                           <div className="relative group">
                             <input required type="text" id="pin" placeholder=" " className="peer w-full bg-transparent border-b border-[var(--color-border)] py-2 text-sm focus:outline-none focus:border-[var(--color-text-primary)] transition-colors rounded-none placeholder-transparent" />
                             <label htmlFor="pin" className="absolute left-0 -top-3.5 text-xs text-[var(--color-text-muted)] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[var(--color-text-primary)] cursor-text">Pincode</label>
                           </div>
                         </div>
                      </div>

                      <button type="submit" className="mt-8 w-full bg-[var(--color-accent)] text-white py-4 rounded-full display-font text-lg hover:bg-[var(--color-accent-hover)] transition-colors shadow-sm active:scale-[0.98]">
                        Place Order
                      </button>
                   </form>
                </div>
             </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
