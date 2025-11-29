import { Head, Link } from '@inertiajs/react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { useCart } from '@/hooks/use-cart';
import { useEffect } from 'react';

interface CartItem {
    id: number;
    name: string;
    price: string;
    image: string | null;
    quantity: number;
}

export default function Index() {
    const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

    // Sync with server-side cart on mount
    useEffect(() => {
        // If you want to sync with backend, you can do it here
        // For now, we're using localStorage via useCart hook
    }, []);

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        updateQuantity(productId, newQuantity);
    };

    const handleRemoveItem = (productId: number) => {
        removeFromCart(productId);
    };

    const handleClearCart = () => {
        if (confirm('Are you sure you want to clear your cart?')) {
            clearCart();
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: 'Shop',
                    href: '/dashboard',
                },
                {
                    title: 'Cart',
                    href: '/cart',
                },
            ]}
        >
            <Head title="Shopping Cart" />

            <div className="py-12 bg-gray-50 dark:bg-black min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="px-4 sm:px-0">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    Shopping Cart
                                </h2>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    {items.length === 0
                                        ? 'Your cart is empty'
                                        : `${items.length} ${items.length === 1 ? 'item' : 'items'} in your cart`}
                                </p>
                            </div>
                            <Link href="/dashboard">
                                <Button variant="outline" className="gap-2">
                                    <ArrowLeft className="w-4 h-4" />
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>

                        {items.length === 0 ? (
                            /* Empty Cart State */
                            <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-zinc-800 mb-6">
                                    <ShoppingCart className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    Your cart is empty
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-8">
                                    Looks like you haven't added anything to your cart yet.
                                </p>
                                <Link href="/dashboard">
                                    <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                                        Start Shopping
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Cart Items */}
                                <div className="lg:col-span-2 space-y-4">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800 hover:shadow-lg transition-shadow"
                                        >
                                            <div className="flex gap-6">
                                                {/* Product Image */}
                                                <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-800">
                                                    {item.image ? (
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                                            No Image
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Product Details */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                                        P {item.price}
                                                    </p>

                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-4 mt-4">
                                                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-zinc-800 rounded-full px-1 py-1">
                                                            <button
                                                                onClick={() =>
                                                                    handleQuantityChange(
                                                                        item.id,
                                                                        item.quantity - 1
                                                                    )
                                                                }
                                                                className="w-8 h-8 rounded-full bg-white dark:bg-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors flex items-center justify-center"
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                <Minus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                                                            </button>
                                                            <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() =>
                                                                    handleQuantityChange(
                                                                        item.id,
                                                                        item.quantity + 1
                                                                    )
                                                                }
                                                                className="w-8 h-8 rounded-full bg-white dark:bg-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors flex items-center justify-center"
                                                            >
                                                                <Plus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                                                            </button>
                                                        </div>

                                                        <button
                                                            onClick={() => handleRemoveItem(item.id)}
                                                            className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors flex items-center gap-2 text-sm font-medium"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Item Total */}
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                                        Subtotal
                                                    </p>
                                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                                        P {(parseFloat(item.price) * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Clear Cart Button */}
                                    <Button
                                        variant="outline"
                                        onClick={handleClearCart}
                                        className="w-full gap-2 text-red-500 hover:text-red-600 border-red-200 hover:border-red-300 dark:border-red-800 dark:hover:border-red-700"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Clear Cart
                                    </Button>
                                </div>

                                {/* Order Summary */}
                                <div className="lg:col-span-1">
                                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800 sticky top-4">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                            Order Summary
                                        </h3>

                                        <div className="space-y-4 mb-6">
                                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                                <span>Subtotal</span>
                                                <span className="font-semibold">P {totalPrice.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                                <span>Shipping</span>
                                                <span className="font-semibold">Free</span>
                                            </div>
                                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                                <span>Tax</span>
                                                <span className="font-semibold">P 0.00</span>
                                            </div>

                                            <div className="border-t border-gray-200 dark:border-zinc-700 pt-4">
                                                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                                                    <span>Total</span>
                                                    <span>P {totalPrice.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <Button className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 gap-2 py-6 text-lg font-semibold">
                                            <CreditCard className="w-5 h-5" />
                                            Proceed to Checkout
                                        </Button>

                                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                                            Secure checkout powered by your payment provider
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
