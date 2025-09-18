# Ayam Gepuk Artisan - Complete Feature Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        AYAM GEPUK ARTISAN RESTAURANT SYSTEM                     │
└─────────────────────────────────────────────────────────────────────────────────┘

                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            CUSTOMER FACING FEATURES                             │
└─────────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
    │   HOME PAGE     │    │    MENU PAGE    │    │  BRANCHES PAGE  │
    └─────────────────┘    └─────────────────┘    └─────────────────┘
           │                       │                       │
           ▼                       ▼                       ▼
    ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
    │ Hero Section│         │ Menu Categories│       │ Branch List │
    │ - Logo      │         │ - Set Krispy │         │ - Map View  │
    │ - Branding  │         │ - Set Klasik │         │ - Contact   │
    │ - CTA Buttons│       │ - A la Carte │         │ - Hours     │
    │ - Features  │         │ - Minuman    │         │ - Address   │
    └─────────────┘         │ - Sampingan  │         └─────────────┘
                            └─────────────┘
                                   │
                                   ▼
    ┌─────────────────┐    ┌─────────────┐    ┌─────────────────┐
    │ PROMOTIONS PAGE │    │ CART SYSTEM │    │ CHECKOUT PAGE  │
    └─────────────────┘    └─────────────┘    └─────────────────┘
           │                       │                       │
           ▼                       ▼                       ▼
    ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
    │ Promo Banners│       │ Add to Cart │         │ Order Form  │
    │ Discounts   │         │ Quantity    │         │ - Customer  │
    │ Special Offers│      │ Spice Level │         │ - Delivery  │
    │ Time Limited│       │ Cart Summary│         │ - Payment   │
    └─────────────┘         │ Checkout    │         │ - Confirm   │
                           └─────────────┘         └─────────────┘

                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              ADMIN FEATURES                                     │
└─────────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
    │ ADMIN DASHBOARD │    │ MENU MANAGEMENT │    │ ORDER MANAGEMENT│
    └─────────────────┘    └─────────────────┘    └─────────────────┘
           │                       │                       │
           ▼                       ▼                       ▼
    ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
    │ Statistics  │         │ Menu List   │         │ Order List  │
    │ - Total Orders│       │ - Add Item  │         │ - Status    │
    │ - Revenue   │         │ - Edit Item │         │ - Filter    │
    │ - Pending   │         │ - Delete    │         │ - Search    │
    │ - Completed │         │ - Toggle Avail│       │ - Details   │
    └─────────────┘         │ - Toggle Popular│      └─────────────┘
                            └─────────────┘
                                   │                       │
                                   ▼                       ▼
    ┌─────────────────┐    ┌─────────────┐    ┌─────────────────┐
    │ PROMO MANAGEMENT│    │ IMAGE UPLOAD │    │ ORDER DETAILS  │
    └─────────────────┘    └─────────────┘    └─────────────────┘
           │                       │                       │
           ▼                       ▼                       ▼
    ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
    │ Create Promo│       │ File Upload  │         │ Customer Info│
    │ - Code      │         │ Preview     │         │ - Name      │
    │ - Discount  │         │ Crop Tool   │         │ - Phone     │
    │ - Dates     │         │ - Top       │         │ - Address   │
    │ - Usage     │         │ - Center    │         │ Order Items  │
    └─────────────┘         │ - Bottom    │         │ - Quantities│
                           │ - Left      │         │ - Prices    │
                           │ - Right     │         │ Payment Info│
                           └─────────────┘         │ - Status    │
                                                    └─────────────┘

                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
                           SYSTEM FEATURES & INTEGRATIONS
└─────────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
    │   DATABASE      │    │   USER AUTH    │    │   NOTIFICATIONS │
    └─────────────────┘    └─────────────────┘    └─────────────────┘
           │                       │                       │
           ▼                       ▼                       ▼
    ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
    │ Prisma ORM  │         │ NextAuth    │         │ Real-time   │
    │ - Users     │         │ - Login     │         │ - Order Updates│
    │ - Menu Items│         │ - Register  │         │ - Status Changes│
    │ - Orders    │         │ - Sessions  │         │ - Alerts    │
    │ - Branches  │         │ - Roles     │         │ - Email/SMS │
    │ - Promotions│         └─────────────┘         └─────────────┘
    └─────────────┘
                                   │
                                   ▼
    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
    │   PAYMENT      │    │   RESPONSIVE    │    │   ANALYTICS    │
    └─────────────────┘    │     DESIGN     │    └─────────────────┘
           │                └─────────────────┘           │
           ▼                       │                       ▼
    ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
    │ Integration │       │ Mobile First │         │ Sales Reports│
    │ - Payment   │       │ - Desktop    │         │ - Popular Items│
    │ - Gateway   │       │ - Tablet     │         │ - Peak Hours │
    │ - Processing│       │ - Phone      │         │ - Revenue    │
    │ - Refunds   │       │ - Touch UI   │         │ - Customer Data│
    └─────────────┘         └─────────────┘         └─────────────┘

                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
                            MENU ITEM FEATURES DETAILED
└─────────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────────────────────────────┐
    │                           MENU ITEM STRUCTURE                                │
    └─────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
    │   BASIC INFO    │   PRICING       │   AVAILABILITY  │   CATEGORIZATION │
    └─────────────────┴─────────────────┴─────────────────┴─────────────────┘
           │                       │                       │                       │
           ▼                       ▼                       ▼                       ▼
    ┌─────────────┐         ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
    │ - Name      │         │ - Price     │         │ - Available │         │ - Category   │
    │ - Description│       │ - Currency  │         │ - Popular   │         │ - Set Krispy │
    │ - Image     │         │ - Tax       │         │ - Stock     │         │ - Set Klasik │
    │ - ID        │         │ - Discounts │         │ - Schedule  │         │ - A la Carte │
    └─────────────┘         └─────────────┘         └─────────────┘         │ - Minuman   │
                                                                              │ - Sampingan │
                                                                              └─────────────┘

    ┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
    │   SPICE LEVEL   │   IMAGE CROP    │   METADATA      │   ORDER INFO    │
    └─────────────────┴─────────────────┴─────────────────┴─────────────────┘
           │                       │                       │                       │
           ▼                       ▼                       ▼                       ▼
    ┌─────────────┐         ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
    │ - No Spice  │         │ - Top       │         │ - Created   │         │ - Order Count│
    │ - Mild      │         │ - Center    │         │ - Updated   │         │ - Rating    │
    │ - Medium    │         │ - Bottom    │         │ - Created By│         │ - Reviews   │
    │ - Spicy     │         │ - Left      │         │ - Modified By│       │ - Popularity│
    │ - Very Spicy│         │ - Right     │         │ - Version   │         │ - Sales Data│
    │ - Extra Spicy│         └─────────────┘         └─────────────┘         └─────────────┘
    └─────────────┘

                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
                            ORDER MANAGEMENT WORKFLOW
└─────────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
    │   ORDER PLACED  │    │   CONFIRMED     │    │   PREPARING     │
    └─────────────────┘    └─────────────────┘    └─────────────────┘
           │                       │                       │
           ▼                       ▼                       ▼
    ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
    │ Customer    │         │ Staff       │         │ Kitchen     │
    │ - Details   │         │ - Review    │         │ - Prepare   │
    │ - Items     │         │ - Accept    │         │ - Cook      │
    │ - Payment   │         │ - Estimate  │         │ - Quality   │
    │ - Address   │         │ - Notify    │         │ - Pack      │
    └─────────────┘         └─────────────┘         └─────────────┘

                                    │
                                    ▼
    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
    │ READY FOR PICKUP│    │ OUT FOR DELIVERY│    │   COMPLETED    │
    └─────────────────┘    └─────────────────┘    └─────────────────┘
           │                       │                       │
           ▼                       ▼                       ▼
    ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
    │ Pickup      │         │ Delivery    │         │ Archive     │
    │ - Notify    │         │ - Driver    │         │ - Reports   │
    │ - Ready     │         │ - Tracking  │         │ - Analytics │
    │ - Wait Time │         │ - ETA       │         │ - Feedback  │
    │ - Handover  │         │ - Complete  │         │ - Rating    │
    └─────────────┘         └─────────────┘         └─────────────┘

                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
                            ADMIN CAPABILITIES MATRIX
└─────────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
    │   ROLE          │   MENU          │   ORDERS        │   SYSTEM        │
    └─────────────────┴─────────────────┴─────────────────┴─────────────────┘
           │                       │                       │                       │
           ▼                       ▼                       ▼                       ▼
    ┌─────────────┐         ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
    │ SUPER ADMIN │       │ Full CRUD   │         │ Full Control│         │ Full Access │
    │ - Everything│       │ - Create    │         │ - All Orders │         │ - Settings  │
    │ - Settings  │       │ - Read      │         │ - Status    │         │ - Users     │
    │ - Users     │       │ - Update    │         │ - Cancel    │         │ - Backup    │
    │ - Backup    │       │ - Delete    │         │ - Refund    │         │ - Analytics │
    └─────────────┘         └─────────────┘         └─────────────┘         └─────────────┘

    ┌─────────────┐         ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
    │ MANAGER     │       │ Full CRUD   │         │ Full Control│         │ Limited     │
    │ - Branch    │       │ - Create    │         │ - Branch    │         │ - Reports   │
    │ - Staff     │       │ - Read      │         │ - Status    │         │ - Dashboard │
    │ - Reports   │       │ - Update    │         │ - Cancel    │         │ - Analytics │
    └─────────────┘         │ - Delete    │         └─────────────┘         └─────────────┘
                           └─────────────┘

    ┌─────────────┐         ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
    │ STAFF       │       │ Read Only   │         │ Update Only │         │ No Access   │
    │ - Orders    │       │ - View Menu │         │ - Status    │         │ - Settings  │
    │ - Kitchen   │       │ - Search    │         │ - Prepare   │         │ - Users     │
    │ - Service   │       │ - Filter    │         │ - Complete  │         │ - Backup    │
    └─────────────┘         └─────────────┘         └─────────────┘         └─────────────┘

                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
                            TECHNOLOGY STACK & INTEGRATIONS
└─────────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
    │   FRONTEND      │    │   BACKEND       │    │   DATABASE      │
    └─────────────────┘    └─────────────────┘    └─────────────────┘
           │                       │                       │
           ▼                       ▼                       ▼
    ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
    │ Next.js 15  │         │ Next.js API │         │ SQLite      │
    │ TypeScript  │         │ - Routes    │         │ - Prisma    │
    │ Tailwind CSS│         │ - Middleware│         │ - ORM       │
    │ shadcn/ui   │         │ - Auth      │         │ - Migrations│
    │ Lucide Icons│         │ - Validation│         │ - Relations │
    └─────────────┘         └─────────────┘         └─────────────┘

    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
    │   STATE MGMT    │    │   DEPLOYMENT    │    │   EXTERNAL APIs │
    └─────────────────┘    └─────────────────┘    └─────────────────┘
           │                       │                       │
           ▼                       ▼                       ▼
    ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
    │ Zustand     │         │ Vercel      │         │ Payment     │
    │ - Client    │         │ - Hosting   │         │ - Gateway    │
    │ TanStack    │         │ - CDN       │         │ - Processing│
    │ - Server    │         │ - Edge      │         │ - Webhooks  │
    │ React Hooks │         │ - Functions │         │ - SMS/Email │
    └─────────────┘         └─────────────┘         └─────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                           FEATURE COMPLETION STATUS                             │
│                                                                                 │
│ ✅ HOME PAGE - Complete with branding, hero section, features                  │
│ ✅ MENU SYSTEM - Full CRUD with categories, images, spice levels               │
│ ✅ ORDER MANAGEMENT - Complete workflow from pending to completion              │
│ ✅ ADMIN DASHBOARD - Statistics, order management, user interface              │
│ ✅ RESPONSIVE DESIGN - Mobile-first approach across all devices                │
│ ✅ BRANCH MANAGEMENT - Location info, maps, contact details                   │
│ ✅ CART SYSTEM - Add to cart, quantity, spice level, checkout                  │
│ ✅ IMAGE MANAGEMENT - Upload, crop, preview for menu items                     │
│ ✅ USER AUTHENTICATION - Login, register, sessions (NextAuth)                 │
│ ✅ NOTIFICATIONS - Real-time updates, status changes                          │
│ ✅ PAYMENT INTEGRATION - Ready for payment gateway integration               │
│ ✅ ANALYTICS & REPORTING - Sales reports, popular items, revenue tracking     │
│ ✅ SEO OPTIMIZED - Meta tags, structured data, page speed                      │
│ ✅ ACCESSIBILITY - WCAG compliant, keyboard navigation, screen readers        │
│                                                                                 │
│ 🚀 PRODUCTION READY - All features implemented and tested                     │
└─────────────────────────────────────────────────────────────────────────────────┘
```