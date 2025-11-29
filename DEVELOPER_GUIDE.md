# Developer Guide

This document provides an overview of the application structure, guides you on where to make changes, and tracks the feature implementation roadmap.

## 1. Documentation
Currently, the following documentation files exist in the project:
- **Developer Guide**: `DEVELOPER_GUIDE.md` (This file)
- **Walkthrough**: `.gemini/antigravity/brain/.../walkthrough.md` (Recent changes)
- **Cart Documentation**: `CART_IMPLEMENTATION_DOCUMENTATION.md` (Empty)

## 2. Key File Paths
Here is a quick reference to the most important directories and files:

| Type | Path | Description |
|------|------|-------------|
| **Routes** | `routes/web.php` | Define all web URLs and link them to controllers. |
| **Controllers** | `app/Http/Controllers/` | Backend logic (PHP). Handle requests and return responses. |
| **Models** | `app/Models/` | Database models (Eloquent). Interact with the database. |
| **Migrations** | `database/migrations/` | Database schema definitions. |
| **Pages** | `resources/js/pages/` | Main React page views. Corresponds to routes. |
| **Components** | `resources/js/components/` | Reusable UI elements (Buttons, Headers, Inputs). |
| **Layouts** | `resources/js/layouts/` | Application layouts (e.g., `app-header-layout.tsx`). |
| **Hooks** | `resources/js/hooks/` | Custom React hooks for logic reuse. |
| **Styles** | `resources/css/app.css` | Global styles and Tailwind configuration. |

## 3. How to Add a New Page
To add a new page (e.g., a "Contact Us" page):

1.  **Create the Frontend Page**:
    Create a new file `resources/js/pages/contact.tsx`.
    ```tsx
    import AppLayout from '@/layouts/app-layout';
    import { Head } from '@inertiajs/react';

    export default function Contact() {
        return (
            <AppLayout breadcrumbs={[{ title: 'Contact', href: '/contact' }]}>
                <Head title="Contact Us" />
                <div className="p-4">
                    <h1 className="text-2xl font-bold">Contact Us</h1>
                    <p>Welcome to the contact page.</p>
                </div>
            </AppLayout>
        );
    }
    ```

2.  **Register the Route**:
    Open `routes/web.php` and add the route.
    ```php
    use Inertia\Inertia;

    Route::get('/contact', function () {
        return Inertia::render('contact');
    })->name('contact');
    ```

## 4. How to Add a Function
### Backend Function (PHP)
If you need to handle data, save to the database, or process logic:
1.  **Create or Update a Controller**:
    Example: `app/Http/Controllers/ProductController.php`.
    ```php
    public function search(Request $request) {
        // Your logic here
        return Inertia::render('products/index', ['results' => ...]);
    }
    ```
2.  **Add the Route**:
    Link the URL to your function in `routes/web.php`.

### Frontend Function (React)
If you need UI interactivity (like the search bar):
1.  **Edit the Component**:
    Open the relevant file in `resources/js/components/` (e.g., `app-header.tsx`).
2.  **Add Logic**:
    Use React hooks (`useState`, `useEffect`) or create a custom hook in `resources/js/hooks/`.

---

## 5. Feature Roadmap

### ✅ Implemented Features

#### Product Features
- ✅ **Product image zoom/magnifier** - `ProductImageViewer.tsx` with zoom controls
- ✅ **360-degree product viewer** - Drag-to-rotate in 3D space
- ✅ **Product reviews and ratings system** - Basic star rating display (static)

#### Shopping Cart
- ✅ **Mini cart dropdown** - Cart button in header
- ✅ **Cart page with quantity updates** - Full cart management
- ✅ **Price calculator** - Basic price display

#### Search & Filter
- ✅ **Live search** - Auto-search with 300ms debounce in header

#### User Account
- ✅ **Profile management** - Settings page available
- ✅ **Authentication** - Login/Register with Laravel Fortify

#### Other Features
- ✅ **Admin role system** - Product CRUD restricted to admins

---

### 🔨 To Be Implemented

#### Product Features
- ⬜ **Product quick view modal** - Modal to preview product without navigation
  - *Implementation*: Create `ProductQuickView.tsx` component, add "Quick View" button to product cards
  - *Files*: `resources/js/components/ProductQuickView.tsx`, `resources/js/pages/products/index.tsx`

- ⬜ **Product comparison tool** - Compare multiple products side-by-side
  - *Implementation*: Create comparison state management, comparison page
  - *Files*: `resources/js/hooks/use-comparison.tsx`, `resources/js/pages/compare.tsx`

- ⬜ **Size guide/chart** - Modal with sizing information
  - *Implementation*: Add size guide data to products table, create modal component
  - *Files*: Migration for size_guide column, `resources/js/components/SizeGuide.tsx`

- ⬜ **Product recommendations** - "You may also like" section
  - *Implementation*: Backend algorithm for recommendations, frontend component
  - *Files*: `app/Http/Controllers/ProductController.php`, `resources/js/components/ProductRecommendations.tsx`

- ⬜ **Recently viewed products** - Track and display user's browsing history
  - *Implementation*: Use localStorage or session to track views
  - *Files*: `resources/js/hooks/use-recently-viewed.tsx`, component for display

- ⬜ **Wishlist/favorites** - Save products for later
  - *Implementation*: Create wishlist table, controller, and UI
  - *Files*: Migration, `app/Models/Wishlist.php`, `app/Http/Controllers/WishlistController.php`

- ⬜ **Stock availability checker** - Real-time stock status
  - *Implementation*: Add stock column to products, display availability
  - *Files*: Migration for stock column, update product display logic

#### Shopping Cart
- ⬜ **Save for later functionality** - Move items from cart to saved list
  - *Implementation*: Add "saved" status to cart items
  - *Files*: Update `CartController.php`, add UI toggle

- ⬜ **Cart abandonment reminder** - Email users about abandoned carts
  - *Implementation*: Background job to check abandoned carts, email service
  - *Files*: `app/Jobs/SendCartReminderJob.php`, email template

- ⬜ **Discount system** - Apply promo codes and calculate discounts
  - *Implementation*: Create coupons table, validation logic
  - *Files*: Migration, `app/Models/Coupon.php`, `app/Http/Controllers/CouponController.php`

#### Search & Filter
- ⬜ **Autocomplete** - Show suggestions as user types
  - *Implementation*: Enhance search to return suggestions
  - *Files*: Update `ProductController.php`, add dropdown to search input

- ⬜ **Advanced filter sidebar** - Filter by price, size, color, brand
  - *Implementation*: Add filter UI, update backend to handle multiple filters
  - *Files*: `resources/js/components/ProductFilters.tsx`, update `ProductController.php`

- ⬜ **Sort options** - Sort by price, popularity, new arrivals
  - *Implementation*: Add sort dropdown, update query logic
  - *Files*: Update `ProductController.php`, add sort UI to products page

- ⬜ **Search suggestions** - Popular searches, trending products
  - *Implementation*: Track search queries, display popular ones
  - *Files*: Create search_logs table, analytics component

#### Checkout
- ⬜ **Multi-step checkout process** - Step-by-step checkout flow
  - *Implementation*: Create checkout page with steps (shipping, payment, review)
  - *Files*: `resources/js/pages/checkout.tsx`, `app/Http/Controllers/CheckoutController.php`

- ⬜ **Guest checkout option** - Allow checkout without account
  - *Implementation*: Modify checkout to accept guest info
  - *Files*: Update checkout logic to handle guest users

- ⬜ **Order summary sidebar** - Show order details during checkout
  - *Implementation*: Component showing cart items, totals
  - *Files*: `resources/js/components/OrderSummary.tsx`

- ⬜ **Promo code/coupon input** - Apply discounts at checkout
  - *Implementation*: Input field, validation, price recalculation
  - *Files*: Integrate with coupon system

- ⬜ **Multiple payment methods** - Credit card, PayPal, etc.
  - *Implementation*: Integrate payment gateways (Stripe, PayPal)
  - *Files*: Payment service providers, checkout controller

- ⬜ **Address autocomplete** - Google Places API integration
  - *Implementation*: Integrate Google Places API for address input
  - *Files*: Address input component with API integration

#### User Account
- ⬜ **Order tracking page** - Track order status and shipping
  - *Implementation*: Create orders table, tracking page
  - *Files*: Migration, `app/Models/Order.php`, `resources/js/pages/orders/track.tsx`

- ⬜ **Order history** - View past orders
  - *Implementation*: Display user's orders with details
  - *Files*: `resources/js/pages/orders/history.tsx`, `app/Http/Controllers/OrderController.php`

- ⬜ **Saved addresses** - Store multiple shipping addresses
  - *Implementation*: Create addresses table, CRUD operations
  - *Files*: Migration, `app/Models/Address.php`, address management UI

- ⬜ **Return/exchange request** - Submit return requests
  - *Implementation*: Create returns table, request form
  - *Files*: Migration, `app/Models/Return.php`, return request form

#### Other Features
- ⬜ **Newsletter subscription popup** - Email collection modal
  - *Implementation*: Modal component, newsletter table
  - *Files*: `resources/js/components/NewsletterPopup.tsx`, subscription controller

- ⬜ **Live chat widget** - Customer support chat
  - *Implementation*: Integrate third-party chat service (Intercom, Tawk.to)
  - *Files*: Chat widget component

- ⬜ **Price drop alerts** - Notify users when price decreases
  - *Implementation*: Track price changes, notification system
  - *Files*: Price history table, alert job

- ⬜ **Inventory countdown timer** - "Only X left in stock"
  - *Implementation*: Display stock count with urgency messaging
  - *Files*: Update product display component

- ⬜ **Flash sale banner** - Promotional banner for sales
  - *Implementation*: Banner component with sale info
  - *Files*: `resources/js/components/FlashSaleBanner.tsx`

- ⬜ **Social proof notifications** - "X people bought this"
  - *Implementation*: Track purchases, display notifications
  - *Files*: `resources/js/components/SocialProofNotification.tsx`

---

## 6. Implementation Priority Suggestions

### Phase 1 - Core Shopping Experience
1. Product quick view modal
2. Advanced filter sidebar
3. Sort options
4. Stock availability checker
5. Wishlist/favorites

### Phase 2 - Checkout & Orders
1. Multi-step checkout process
2. Order tracking page
3. Order history
4. Promo code/coupon system
5. Multiple payment methods

### Phase 3 - Engagement & Retention
1. Product recommendations
2. Recently viewed products
3. Newsletter subscription
4. Price drop alerts
5. Social proof notifications

### Phase 4 - Advanced Features
1. Product comparison tool
2. Live chat widget
3. Cart abandonment reminders
4. Return/exchange system
5. Flash sale banners
