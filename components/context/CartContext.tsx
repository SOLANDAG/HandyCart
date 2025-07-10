import React, { createContext, ReactNode, useContext, useState } from 'react';


// Represents a single item in the shopping cart.
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: any;
  quantity: number;
}

// Represents an item marked as a favorite.
export interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  image: any;
}

// Context structure defining available data and operations related to the cart and favorites.
interface CartContextProps {
  cartItems: CartItem[];
  favorites: FavoriteItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  decreaseFromCart: (id: number) => void;
  clearCart: () => void;
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: number) => boolean;
}

// The internal cart context. Use `useCart()` to access.
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Provides cart and favorite state to child components.
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

// Adds an item to the cart or increases quantity if it already exists.
  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(ci => ci.id === item.id);
      if (existingItem) {
        return prev.map(ci =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

// Removes an item from the cart by its ID.
  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

// Decreases the quantity of an item in the cart. Removes it if quantity drops to 0.
  const decreaseFromCart = (id: number) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

// Empties the entire cart.
  const clearCart = () => {
    setCartItems([]);
  };

// Toggles an item in the favorites list.
// Adds it if not present, removes it if already favorited.
  const toggleFavorite = (item: FavoriteItem) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === item.id);
      return exists
        ? prev.filter(fav => fav.id !== item.id)
        : [...prev, item];
    });
  };

// Checks if an item is in the favorites list.
// @returns true if the item is a favorite, false otherwise.
  const isFavorite = (id: number) => {
    return favorites.some(fav => fav.id === id);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        favorites,
        addToCart,
        removeFromCart,
        decreaseFromCart,
        clearCart,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to access cart and favorite context.
// Throws an error if used outside the <CartProvider>.
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
