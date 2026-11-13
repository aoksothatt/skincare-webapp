"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { ToastMessage } from "./types";

interface CartItemEntry {
  variantId: string;
  qty: number;
}

interface CartContextValue {
  items: CartItemEntry[];
  count: number;
  addItem: (variantId: string, qty?: number, customMessage?: string) => void;
  removeItem: (variantId: string) => void;
  updateQty: (variantId: string, qty: number) => void;
  clearCart: () => void;
  toasts: ToastMessage[];
  showToast: (text: string, type?: "info" | "success" | "warn") => void;
  removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItemEntry[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (text: string, type: "info" | "success" | "warn" = "success") => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const newToast: ToastMessage = { id, text, type };

      setToasts((prev) => [...prev, newToast]);

      // Automatically auto-dismiss toast after 3500ms
      setTimeout(() => {
        removeToast(id);
      }, 3500);
    },
    [removeToast]
  );

  const addItem = useCallback(
    (variantId: string, qty: number = 1, customMessage: string = "Added to cart") => {
      if (!variantId || qty <= 0) return;

      setItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.variantId === variantId);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            qty: updated[existingIndex].qty + qty,
          };
          return updated;
        }
        return [...prev, { variantId, qty }];
      });

      showToast(customMessage, "success");
    },
    [showToast]
  );

  const removeItem = useCallback((variantId: string) => {
    setItems((prev) => prev.filter((item) => item.variantId !== variantId));
  }, []);

  const updateQty = useCallback((variantId: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((item) => item.variantId !== variantId));
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.variantId === variantId ? { ...item, qty } : item))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const count = useMemo(() => {
    return items.reduce((sum, item) => sum + item.qty, 0);
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      count,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      toasts,
      showToast,
      removeToast,
    }),
    [items, count, addItem, removeItem, updateQty, clearCart, toasts, showToast, removeToast]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

/**
 * Accessible floating toast notifications with aria-live polite
 */
function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-surface border border-line shadow-lg text-ink text-sm animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <div className="flex items-center gap-2.5">
            <span
              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                toast.type === "warn"
                  ? "bg-warn"
                  : toast.type === "info"
                  ? "bg-skya"
                  : "bg-accent"
              }`}
            />
            <span className="font-medium">{toast.text}</span>
          </div>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss notification"
            className="p-1 rounded-lg text-muted hover:text-ink hover:bg-soft/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
