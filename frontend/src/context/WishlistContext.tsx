import React, { createContext, useContext, useState, useEffect } from "react";

// Define a structure for wishlist items that includes type
interface WishlistItem {
  id: number;
  type: 'book' | 'course';
}

type WishlistContextType = {
  wishlist: number[];  // Kept for backward compatibility
  addToWishlist: (itemId: number, itemType?: 'book' | 'course') => void;
  removeFromWishlist: (itemId: number, itemType?: 'book' | 'course') => void;
  isInWishlist: (itemId: number, itemType?: 'book' | 'course') => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage with backward compatibility
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    const storedWishlistItems = localStorage.getItem("wishlistItems");
    
    // If new format exists, use it
    if (storedWishlistItems) {
      try {
        return JSON.parse(storedWishlistItems);
      } catch (error) {
        console.error("Error parsing wishlistItems:", error);
        return [];
      }
    }
    
    // Migrate from old format if it exists
    if (storedWishlist) {
      try {
        const oldWishlist = JSON.parse(storedWishlist) as number[];
        // Convert old format to new format - assume all existing items are books
        return oldWishlist.map(id => ({ id, type: 'book' as const }));
      } catch (error) {
        console.error("Error parsing old wishlist:", error);
        return [];
      }
    }
    
    return [];
  });

  // Derived wishlist array for backward compatibility
  const wishlist = wishlistItems.map(item => item.id);

  // Update localStorage when wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
    // Keep old format for backward compatibility during transition
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlistItems, wishlist]);

  const addToWishlist = (itemId: number, itemType: 'book' | 'course' = 'book') => {
    setWishlistItems((prev) => {
      // Check if the item with the same ID and type is already in wishlist
      if (!prev.some(item => item.id === itemId && item.type === itemType)) {
        return [...prev, { id: itemId, type: itemType }];
      }
      return prev;
    });
  };

  const removeFromWishlist = (itemId: number, itemType?: 'book' | 'course') => {
    setWishlistItems((prev) => {
      if (itemType) {
        // If type is provided, remove only items with matching type and ID
        return prev.filter(item => !(item.id === itemId && item.type === itemType));
      } else {
        // For backward compatibility, remove all items with the ID regardless of type
        return prev.filter(item => item.id !== itemId);
      }
    });
  };

  const isInWishlist = (itemId: number, itemType?: 'book' | 'course'): boolean => {
    if (itemType) {
      // Check for specific type
      return wishlistItems.some(item => item.id === itemId && item.type === itemType);
    } else {
      // For backward compatibility, check if any item with the ID exists
      return wishlistItems.some(item => item.id === itemId);
    }
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      addToWishlist, 
      removeFromWishlist, 
      isInWishlist 
    }}>
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