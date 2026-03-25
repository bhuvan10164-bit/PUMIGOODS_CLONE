import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id:       number;
  name:     string;
  brand:    string;
  price:    number;
  image?:   string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isDrawerOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>) {
      const { quantity = 1, ...itemData } = action.payload;
      const existing = state.items.find(i => i.id === itemData.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ ...itemData, quantity });
      }
      // Auto-open drawer when adding
      state.isDrawerOpen = true;
    },
    setDrawerOpen(state, action: PayloadAction<boolean>) {
      state.isDrawerOpen = action.payload;
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    increaseQty(state, action: PayloadAction<number>) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQty(state, action: PayloadAction<number>) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) item.quantity -= 1;
        else state.items = state.items.filter(i => i.id !== action.payload);
      }
    },
    clearCart(state) { state.items = []; },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart, setDrawerOpen } =
  cartSlice.actions;
export default cartSlice.reducer;

// Selectors
export const selectCartItems  = (s: { cart: CartState }) => s.cart.items;
export const selectCartCount  = (s: { cart: CartState }) =>
  s.cart.items.reduce((acc, i) => acc + i.quantity, 0);
export const selectCartTotal  = (s: { cart: CartState }) =>
  s.cart.items.reduce((acc, i) => acc + i.price * i.quantity, 0);

export const selectIsDrawerOpen = (s: { cart: CartState }) => s.cart.isDrawerOpen;
