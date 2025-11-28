<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\ProductController::class, 'index'])->name('dashboard');
    Route::get('/products', [\App\Http\Controllers\ProductController::class, 'index'])->name('products.index');

    // Cart routes
    Route::get('/cart', [\App\Http\Controllers\CartController::class, 'index'])->name('cart.index');
    Route::post('/cart', [\App\Http\Controllers\CartController::class, 'store'])->name('cart.store');
    Route::put('/cart/{id}', [\App\Http\Controllers\CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/{id}', [\App\Http\Controllers\CartController::class, 'destroy'])->name('cart.destroy');
    Route::delete('/cart', [\App\Http\Controllers\CartController::class, 'clear'])->name('cart.clear');

    // Admin-only product management routes
    Route::middleware(['admin'])->group(function () {
        Route::post('/products', [\App\Http\Controllers\ProductController::class, 'store'])->name('products.store');
        Route::put('/products/{product}', [\App\Http\Controllers\ProductController::class, 'update'])->name('products.update');
        Route::delete('/products/{product}', [\App\Http\Controllers\ProductController::class, 'destroy'])->name('products.destroy');
    });
});

require __DIR__ . '/settings.php';
