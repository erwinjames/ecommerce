import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { ShoppingBag } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white p-4">
            <Head title="Log in" />
            
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-4 shadow-lg animate-pulse">
                        <ShoppingBag className="w-8 h-8 text-purple-400" />
                    </div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                        Welcome Back
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Enter your credentials to access your store
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="flex flex-col gap-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className="text-gray-300">Email address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder="name@example.com"
                                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password" className="text-gray-300">Password</Label>
                                            {canResetPassword && (
                                                <TextLink
                                                    href={request()}
                                                    className="ml-auto text-sm text-purple-400 hover:text-purple-300"
                                                    tabIndex={5}
                                                >
                                                    Forgot password?
                                                </TextLink>
                                            )}
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            placeholder="••••••••"
                                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            tabIndex={3}
                                            className="border-white/20 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                                        />
                                        <Label htmlFor="remember" className="text-gray-300">Remember me</Label>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="mt-2 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-200 transform hover:scale-[1.02]"
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="login-button"
                                    >
                                        {processing && <Spinner className="mr-2" />}
                                        Sign In
                                    </Button>
                                </div>

                                {canRegister && (
                                    <div className="text-center text-sm text-gray-400">
                                        Don't have an account?{' '}
                                        <TextLink href={register()} tabIndex={5} className="text-purple-400 hover:text-purple-300 font-medium">
                                            Create an account
                                        </TextLink>
                                    </div>
                                )}
                            </>
                        )}
                    </Form>

                    {status && (
                        <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center text-sm font-medium text-green-400">
                            {status}
                        </div>
                    )}
                </div>
                
                <div className="mt-8 text-center text-xs text-gray-500">
                    &copy; 2025 Ecommerce System. All rights reserved.
                </div>
            </div>
        </div>
    );
}
