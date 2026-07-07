import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { wishlistAPI } from "../api";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const [count, setCount] = useState(0);

  const refresh = useCallback(async () => {
    if (!user) {
      setWishlistIds(new Set());
      setCount(0);
      return;
    }
    try {
      const [countRes, listRes] = await Promise.all([
        wishlistAPI.count(),
        wishlistAPI.getAll({ size: 200, page: 1 }),
      ]);
      setCount(countRes?.data ?? 0);
      const ids = new Set(
        (listRes?.data?.content ?? []).map((w) => w.bookId)
      );
      setWishlistIds(ids);
    } catch {
      // silent fail — badges just show 0
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggle = async (bookId) => {
    const res = await wishlistAPI.toggle(bookId);
    const added = res?.data?.added ?? false;
    setWishlistIds((prev) => {
      const next = new Set(prev);
      added ? next.add(bookId) : next.delete(bookId);
      return next;
    });
    setCount((prev) => (added ? prev + 1 : Math.max(0, prev - 1)));
    return added;
  };

  return (
    <WishlistContext.Provider value={{ wishlistIds, count, toggle, refresh }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
