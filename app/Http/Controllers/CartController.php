<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    public function store(Request $request)
    {
        $product = $request->validate([
            'id' => 'required|integer',
            'name' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'nullable|string',
        ]);

        $cart = Session::get('cart', []);

        if (isset($cart[$product['id']])) {
            $cart[$product['id']]['quantity']++;
        } else {
            $cart[$product['id']] = [
                'id' => $product['id'],
                'name' => $product['name'],
                'price' => $product['price'],
                'image' => $product['image'],
                'quantity' => 1,
            ];
        }

        Session::put('cart', $cart);

        return redirect()->back()->with('success', 'Product added to cart!');
    }

    public function index()
    {
        $cart = Session::get('cart', []);
        return inertia('cart/index', [
            'cartItems' => array_values($cart),
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = Session::get('cart', []);

        if (isset($cart[$id])) {
            $cart[$id]['quantity'] = $validated['quantity'];
            Session::put('cart', $cart);
            return redirect()->back()->with('success', 'Cart updated!');
        }

        return redirect()->back()->with('error', 'Item not found in cart.');
    }

    public function destroy($id)
    {
        $cart = Session::get('cart', []);

        if (isset($cart[$id])) {
            unset($cart[$id]);
            Session::put('cart', $cart);
            return redirect()->back()->with('success', 'Item removed from cart!');
        }

        return redirect()->back()->with('error', 'Item not found in cart.');
    }

    public function clear()
    {
        Session::forget('cart');
        return redirect()->back()->with('success', 'Cart cleared!');
    }
}
