<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Product::create([
            'name' => 'Premium Wireless Headphones',
            'description' => 'Experience crystal clear sound with our latest noise-cancelling technology. Perfect for travel and work.',
            'price' => 299.99,
            'image' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        ]);

        \App\Models\Product::create([
            'name' => 'Minimalist Watch',
            'description' => 'A timeless classic. Genuine leather strap with a sapphire crystal face. Water resistant up to 50m.',
            'price' => 149.50,
            'image' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
        ]);

        \App\Models\Product::create([
            'name' => 'Smart Fitness Tracker',
            'description' => 'Track your health metrics in real-time. Heart rate monitoring, sleep tracking, and 7-day battery life.',
            'price' => 89.99,
            'image' => 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80',
        ]);

        \App\Models\Product::create([
            'name' => 'Designer Sunglasses',
            'description' => 'Protect your eyes in style. UV400 protection with polarized lenses and a durable acetate frame.',
            'price' => 199.00,
            'image' => 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
        ]);
    }
}
