import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useToast } from './use-toast';

export interface CartItem {
    id: number;
    name: string;
    price: string;
    image: string | null;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });

    const toast = useToast();

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Omit<CartItem, 'quantity'>) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.id === product.id);
            if (existingItem) {
                toast.addToast('success', `Added another ${product.name} to cart!`);
                return currentItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            toast.addToast('success', `${product.name} added to cart!`);
            return [...currentItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: number) => {
        const item = items.find((item) => item.id === productId);
        if (item) {
            toast.addToast('info', `${item.name} removed from cart`);
        }
        setItems((currentItems) =>
            currentItems.filter((item) => item.id !== productId)
        );
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity < 1) return;
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        toast.addToast('info', 'Cart cleared');
        setItems([]);
    };

    const cartCount = items.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = items.reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
