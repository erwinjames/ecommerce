import { ShoppingBag } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-purple-600 text-white">
                <ShoppingBag className="size-5" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-bold">
                    Ecommerce Store
                </span>
            </div>
        </>
    );
}
