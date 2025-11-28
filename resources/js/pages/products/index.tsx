import { Head, Link, router, usePage } from '@inertiajs/react';
import { ShoppingCart, Star, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { useCart } from '@/hooks/use-cart';
import ProductForm from '@/components/ProductForm';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string | null;
}

interface Props {
    products: Product[];
}

export default function Index({ products }: Props) {
    const { addToCart, cartCount } = useCart();
    const { auth } = usePage().props as any;
    const [showProductForm, setShowProductForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setShowProductForm(true);
    };

    const handleDelete = (productId: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/products/${productId}`);
        }
    };

    const handleCloseForm = () => {
        setShowProductForm(false);
        setEditingProduct(undefined);
    };

    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: 'Shop',
                    href: '/dashboard',
                },
            ]}
        >
            <Head title="Products" />

            <div className="py-12 bg-gray-50 dark:bg-black min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8 px-4 sm:px-0">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Featured Collection
                            </h2>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                Discover our premium selection of products
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {auth.isAdmin && (
                                <Button
                                    onClick={() => setShowProductForm(true)}
                                    className="gap-2 bg-purple-600 hover:bg-purple-700"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Product
                                </Button>
                            )}
                            <Link href="/cart">
                                <Button variant="outline" className="gap-2">
                                    <ShoppingCart className="w-4 h-4" />
                                    Cart ({cartCount})
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-0">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-zinc-800"
                            >
                                <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-zinc-800">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-gray-900">
                                        New
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-500 transition-colors">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-1 text-yellow-400 text-xs">
                                            <Star className="w-3 h-3 fill-current" />
                                            <span>4.9</span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                                        {product.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                                            P {product.price}
                                        </span>
                                        <Button
                                            size="sm"
                                            className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full px-6"
                                            onClick={() => addToCart(product)}
                                        >
                                            Add to Cart
                                        </Button>
                                    </div>

                                    {auth.isAdmin && (
                                        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-zinc-700">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="flex-1 gap-2"
                                                onClick={() => handleEdit(product)}
                                            >
                                                <Edit className="w-3 h-3" />
                                                Edit
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="flex-1 gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                <Trash2 className="w-3 h-3" />
                                                Delete
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {products.length === 0 && (
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-zinc-800 mb-4">
                                <ShoppingCart className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                No products found
                            </h3>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                Check back later for new arrivals.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <ProductForm
                open={showProductForm}
                onOpenChange={handleCloseForm}
                product={editingProduct}
            />
        </AppLayout>
    );
}
