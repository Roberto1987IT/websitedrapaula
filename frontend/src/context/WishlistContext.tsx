import React, { createContext, useContext, useState, useEffect } from "react";

type WishlistContextType = {
  wishlist: number[];
  addToWishlist: (itemId: number) => void;
  removeFromWishlist: (itemId: number) => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage
  const [wishlist, setWishlist] = useState<number[]>(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  // Update localStorage when wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (itemId: number) => {
    setWishlist((prev) => {
      // Check if the item is already in wishlist to avoid duplicates
      if (!prev.includes(itemId)) {
        return [...prev, itemId];
      }
      return prev;
    });
  };

  const removeFromWishlist = (itemId: number) => {
    setWishlist((prev) => prev.filter((id) => id !== itemId));
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