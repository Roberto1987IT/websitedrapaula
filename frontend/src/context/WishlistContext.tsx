import React, { createContext, useContext, useState } from "react";

type WishlistContextType = {
  wishlist: number[];
  addToWishlist: (bookId: number) => void;
  removeFromWishlist: (bookId: number) => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const addToWishlist = (bookId: number) => {
    setWishlist((prev) => [...new Set([...prev, bookId])]);
  };

  const removeFromWishlist = (bookId: number) => {
    setWishlist((prev) => prev.filter((id) => id !== bookId));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};