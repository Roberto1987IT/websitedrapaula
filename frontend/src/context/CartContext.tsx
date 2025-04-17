import React, { createContext, useContext, useState } from 'react';
import { Book } from '../bookData';
// Define Course interface since it's not exported from courseData
export interface Course {
  id: number;
  title: string;
  image: string;
  instructor: string;
  description?: string;
  date: string;
  Localizacao: string;
  price: string | number;  // Support both string and number types for price
  learningOutcomes?: string[];
}

interface BookCartItem {
  type: 'book';
  book: Book;
  quantity: number;
}

interface CourseCartItem {
  type: 'course';
  course: Course;
  quantity: number;
}

type CartItem = BookCartItem | CourseCartItem;

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Book | Course, itemType: 'book' | 'course', quantity?: number) => void;
  removeFromCart: (itemId: number, itemType: 'book' | 'course') => void;
  updateQuantity: (itemId: number, itemType: 'book' | 'course', quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Book | Course, itemType: 'book' | 'course', quantity: number = 1) => {
    setCart((prevCart) => {
      // Check if this item already exists in the cart
      const existingItem = prevCart.find(
        cartItem => 
          (itemType === 'book' && cartItem.type === 'book' && 'book' in cartItem && cartItem.book.id === item.id) ||
          (itemType === 'course' && cartItem.type === 'course' && 'course' in cartItem && cartItem.course.id === item.id)
      );

      if (existingItem) {
        // Update quantity if item exists
        return prevCart.map(cartItem => {
          if (
            (itemType === 'book' && cartItem.type === 'book' && 'book' in cartItem && cartItem.book.id === item.id) ||
            (itemType === 'course' && cartItem.type === 'course' && 'course' in cartItem && cartItem.course.id === item.id)
          ) {
            return { ...cartItem, quantity: cartItem.quantity + quantity };
          }
          return cartItem;
        });
      }

      // Add new item if it doesn't exist
      if (itemType === 'book') {
        return [...prevCart, { type: 'book', book: item as Book, quantity }];
      } else {
        return [...prevCart, { type: 'course', course: item as Course, quantity }];
      }
    });
  };

  const removeFromCart = (itemId: number, itemType: 'book' | 'course') => {
    setCart(prevCart => prevCart.filter(item => 
      !(itemType === 'book' && item.type === 'book' && item.book.id === itemId) && 
      !(itemType === 'course' && item.type === 'course' && item.course.id === itemId)
    ));
  };

  const updateQuantity = (itemId: number, itemType: 'book' | 'course', quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId, itemType);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item => {
        if (
          (itemType === 'book' && item.type === 'book' && item.book.id === itemId) ||
          (itemType === 'course' && item.type === 'course' && item.course.id === itemId)
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};