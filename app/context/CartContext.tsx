'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
    id: number;
    product_id: number;
    name: string;
    price: number;
    promotion_price?: number;
    quantity: number;
    image?: string;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
    updateItem: (product_id: number, quantity: number) => void;
    removeItem: (product_id: number) => void;
    clearCart: () => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    // 🔹 Charger le panier depuis localStorage au démarrage
    useEffect(() => {
        const stored = localStorage.getItem('cart');
        if (stored) {
            setItems(JSON.parse(stored));
        }
    }, []);

    // 🔹 Sauvegarder le panier à chaque changement
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addItem = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
        setItems(prev => {
            const exist = prev.find(i => i.product_id === item.product_id);
            if (exist) {
                return prev.map(i =>
                    i.product_id === item.product_id
                        ? { ...i, quantity: i.quantity + quantity }
                        : i
                );
            }
            return [...prev, { ...item, quantity }];
        });
    };

    const updateItem = (product_id: number, quantity: number) => {
        setItems(prev => prev.map(i => i.product_id === product_id ? { ...i, quantity } : i));
    };

    const removeItem = (product_id: number) => {
        setItems(prev => prev.filter(i => i.product_id !== product_id));
    };

    const clearCart = () => setItems([]);

    const total = items.reduce(
        (acc, i) => acc + (i.promotion_price ?? i.price) * i.quantity,
        0
    );

    return (
        <CartContext.Provider value={{ items, addItem, updateItem, removeItem, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook pratique pour utiliser le cart
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};
