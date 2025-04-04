import React, { createContext, useContext, useState, useEffect } from "react";
import { books } from "../bookData";

interface BookWishlistContextType {
  wishlist: any[]; // Store the full book objects
  addToWishlist: (bookId: number) => void;
  removeFromWishlist: (bookId: number) => void;
}

const BookWishlistContext = createContext<BookWishlistContextType | undefined>(undefined);

export const BookWishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    // Load wishlist from localStorage on mount
    const storedWishlist = JSON.parse(localStorage.getItem("bookWishlist") || "[]");
    setWishlist(storedWishlist);
  }, []);

  const addToWishlist = (bookId: number) => {
    const book = books.find((b) => b.id === bookId);
    if (book && !wishlist.some((item) => item.id === bookId)) {
      const updatedWishlist = [...wishlist, book];
      setWishlist(updatedWishlist);
      localStorage.setItem("bookWishlist", JSON.stringify(updatedWishlist));
    }
  };

  const removeFromWishlist = (bookId: number) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== bookId);
    setWishlist(updatedWishlist);
    localStorage.setItem("bookWishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <BookWishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </BookWishlistContext.Provider>
  );
};

export const useBookWishlist = () => {
  const context = useContext(BookWishlistContext);
  if (!context) {
    throw new Error("useBookWishlist must be used within a BookWishlistProvider");
  }
  return context;
};