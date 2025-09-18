# Ayam Gepuk Artisan - Comprehensive Testing Checklist

## 📋 Testing Instructions
- **Status**: ✅ Pass / ❌ Fail / ⚠️ Partial / 🔍 Not Tested
- **Priority**: 🔴 Critical / 🟡 High / 🟢 Medium / 🔵 Low
- **Environment**: Test on Desktop, Tablet, and Mobile devices

---

## 🏠 HOME PAGE TESTING

### 1.1 Hero Section
- [ ] **Logo Display**
  - [ ] Logo appears correctly in navigation bar
  - [ ] Logo appears in hero section
  - [ ] Logo is properly sized and not pixelated
  - [ ] Logo links to home page when clicked

- [ ] **Branding Elements**
  - [ ] "Ayam Gepuk Artisan" text displays correctly
  - [ ] Orange color scheme is consistent
  - [ ] Tagline displays properly
  - [ ] Brand badge shows "🍗 Authentic Malaysian Crispy Chicken"

- [ ] **CTA Buttons**
  - [ ] "Order Now" button is visible and clickable
  - [ ] "Find Branch" button is visible and clickable
  - [ ] Buttons have proper hover effects
  - [ ] Buttons are responsive on mobile

- [ ] **Feature Cards**
  - [ ] Fast Delivery card shows correct info (30-45 mins)
  - [ ] Rating card shows 4.8 with 2,500+ reviews
  - [ ] Branches card shows 5 branches in Klang Valley
  - [ ] All icons display correctly

### 1.2 Hero Image & Floating Elements
- [ ] **Hero Image Container**
  - [ ] Background gradient displays correctly
  - [ ] Image container shows proper styling
  - [ ] Transform animation works on hover
  - [ ] Logo displays inside hero image

- [ ] **Floating Elements**
  - [ ] "20% OFF" badge displays in top-right
  - [ ] "HOT DEAL" badge displays in bottom-left
  - [ ] Floating elements are properly positioned
  - [ ] Elements are visible on all screen sizes

---

## 📱 MENU PAGE TESTING

### 2.1 Menu Categories
- [ ] **Category Display**
  - [ ] All 5 categories show: Set Krispy, Set Klasik, A la Carte, Minuman, Sampingan
  - [ ] Category icons display correctly
  - [ ] Category descriptions show properly
  - [ ] Active category is highlighted

- [ ] **Category Selection**
  - [ ] Clicking category filters items correctly
  - [ ] Category switching is smooth
  - [ ] Selected category persists
  - [ ] Category filter works on mobile

### 2.2 Menu Items Display
- [ ] **Item Cards**
  - [ ] All menu items display with correct information
  - [ ] Item images show with proper crop positions
  - [ ] Prices display correctly in RM format
  - [ ] Descriptions show properly without overflow

- [ ] **Item Status**
  - [ ] Available items show "Add to Cart" button
  - [ ] Unavailable items are grayed out
  - [ ] Popular items show "Popular" badge
  - [ ] Spice level indicators display correctly

### 2.3 Spice Level System
- [ ] **Spice Level Display**
  - [ ] Spice levels show 0-5 red indicators
  - [ ] No spice items show no indicators
  - [ ] Spice level labels are correct
  - [ ] Visual representation is clear

- [ ] **Spice Level Selection**
  - [ ] Users can click to change spice level
  - [ ] Selected spice level updates visually
  - [ ] Spice level selection affects cart item
  - [ ] Default spice level is maintained

### 2.4 Cart Functionality
- [ ] **Add to Cart**
  - [ ] "Add to Cart" button works for all items
  - [ ] Cart count updates in navigation
  - [ ] Cart badge shows correct quantity
  - [ ] Items are added with selected spice level

- [ ] **Cart Sidebar**
  - [ ] Cart opens when cart button is clicked
  - [ ] Cart items display correctly
  - [ ] Item quantities can be adjusted
  - [ ] Items can be removed from cart
  - [ ] Cart total calculates correctly
  - [ ] Cart closes properly

### 2.5 Menu Data Verification
- [ ] **Set Krispy Items**
  - [ ] SET A Krispy: RM7.99 with correct description
  - [ ] SET B Krispy: RM11.99 with correct description
  - [ ] SET C Krispy: RM15.99 with correct description
  - [ ] All use menu1.jpg with different crop positions

- [ ] **Set Klasik Items**
  - [ ] SET A Klasik: RM7.99 with correct description
  - [ ] SET B Klasik: RM11.99 with correct description
  - [ ] SET C Klasik: RM15.99 with correct description
  - [ ] All use menu2.jpg with different crop positions

- [ ] **A la Carte Items**
  - [ ] Ayam Goreng Krispy: RM4.70
  - [ ] Ayam Goreng Quarter: RM7.00
  - [ ] Ayam Goreng Klasik: RM4.20
  - [ ] Descriptions match actual menu

- [ ] **Side Dishes & Drinks**
  - [ ] Tempe Goreng: RM2.20
  - [ ] Kerabu: RM2.50
  - [ ] Teh Tarik: RM2.00
  - [ ] Air Mineral: RM1.50

---

## 📍 BRANCHES PAGE TESTING

### 3.1 Branch List
- [ ] **Branch Information**
  - [ ] All 5 branches display correctly
  - [ ] Branch names show properly
  - [ ] Contact information is accurate
  - [ ] Operating hours display correctly

- [ ] **Branch Cards**
  - [ ] Cards show branch name, address, phone
  - [ ] Cards are clickable and interactive
  - [ ] Hover effects work properly
  - [ ] Cards are responsive on mobile

### 3.2 Branch Map
- [ ] **Map Display**
  - [ ] Map component loads correctly
  - [ ] Branch locations are marked on map
  - [ ] Map is interactive (zoom, pan)
  - [ ] Map markers show branch names on hover

- [ ] **Map Integration**
  - [ ] Clicking markers shows branch info
  - [ ] Map works on mobile devices
  - [ ] Map loads without errors
  - [ ] Location permissions work if applicable

### 3.3 Branch Details
- [ ] **Contact Information**
  - [ ] Phone numbers are clickable (tel: links)
  - [ ] Email addresses are clickable (mailto: links)
  - [ ] Addresses are formatted correctly
  - [ ] Hours show "11:00 AM - 10:00 PM (Daily)"

---

## 🎁 PROMOTIONS PAGE TESTING

### 4.1 Promotion Display
- [ ] **Promo Banners**
  - [ ] Promotion banners display correctly
  - [ ] Discount percentages show properly
  - [ ] Time limits are displayed
  - [ ] Promo codes are visible

- [ ] **Promotion Details**
  - [ ] Promotion descriptions are clear
  - [ ] Terms and conditions are accessible
  - [ ] Valid dates show correctly
  - [ ] Usage limits display if applicable

### 4.2 Promotion Interaction
- [ ] **Promo Application**
  - [ ] Promo codes can be copied
  - [ ] Promo terms can be viewed
  - [ ] Promo countdown timers work
  - [ ] Expired promos are grayed out

---

## 🛒 CHECKOUT PAGE TESTING

### 5.1 Checkout Form
- [ ] **Customer Information**
  - [ ] Name field accepts text input
  - [ ] Phone field accepts phone numbers
  - [ ] Email field accepts email format
  - [ ] Form validation works correctly

- [ ] **Delivery Options**
  - [ ] Delivery option can be selected
  - [ ] Pickup option can be selected
  - [ ] Address field shows for delivery
  - [ ] Address validation works

### 5.2 Order Summary
- [ ] **Order Items**
  - [ ] All cart items display correctly
  - [ ] Quantities and prices are accurate
  - [ ] Spice levels are shown for each item
  - [ ] Subtotal calculates correctly

- [ ] **Pricing**
  - [ ] Subtotal is calculated correctly
  - [ ] Delivery fee shows when applicable
  - [ ] Discounts are applied if any
  - [ ] Total amount is accurate

### 5.3 Payment Processing
- [ ] **Payment Methods**
  - [ ] Payment options display correctly
  - [ ] Selected payment method is highlighted
  - [ ] Payment form fields work
  - [ ] Payment validation works

- [ ] **Order Submission**
  - [ ] "Place Order" button works
  - [ ] Order confirmation shows
  - [ ] Order number is generated
  - [ ] User receives confirmation

---

## 👨‍💼 ADMIN DASHBOARD TESTING

### 6.1 Dashboard Overview
- [ ] **Statistics Cards**
  - [ ] Total Orders count displays correctly
  - [ ] Pending Orders count updates in real-time
  - [ ] Preparing Orders count is accurate
  - [ ] Completed Orders count is correct
  - [ ] Revenue total shows proper RM format

- [ ] **Dashboard Navigation**
  - [ ] Admin sidebar loads correctly
  - [ ] All navigation links work
  - [ ] Active page is highlighted
  - [ ] Mobile menu works properly

### 6.2 Order Management
- [ ] **Order List**
  - [ ] Orders display with correct information
  - [ ] Order status badges show correct colors
  - [ ] Customer information is displayed
  - [ ] Order totals show correctly

- [ ] **Order Filtering**
  - [ ] "All" tab shows all orders
  - [ ] "Pending" tab filters correctly
  - [ ] "Confirmed" tab filters correctly
  - [ ] "Preparing" tab filters correctly
  - [ ] "Completed" tab filters correctly

- [ ] **Order Status Updates**
  - [ ] Status dropdown works for each order
  - [ ] Status changes update order immediately
  - [ ] Status flow follows correct sequence
  - [ ] Status changes are reflected in statistics

- [ ] **Order Details**
  - [ ] Clicking order shows details panel
  - [ ] Customer information displays correctly
  - [ ] Order items show with quantities
  - [ ] Payment information is accurate
  - [ ] Action buttons work (Complete, Print, Contact)

### 6.3 Menu Management
- [ ] **Menu List**
  - [ ] All menu items display in admin
  - [ ] Items show with correct categories
  - [ ] Availability toggles work
  - [ ] Popular toggles work
  - [ ] Edit and delete buttons work

- [ ] **Menu Statistics**
  - [ ] Total Items count is correct
  - [ ] Available count updates with toggles
  - [ ] Popular count updates with toggles
  - [ ] Unavailable count is accurate

- [ ] **Menu Search & Filter**
  - [ ] Search by item name works
  - [ ] Search by description works
  - [ ] Category filter works correctly
  - [ ] Combined search and filter works

- [ ] **Menu Form - Add Item**
  - [ ] Form opens when "Add Menu Item" is clicked
  - [ ] All form fields accept input correctly
  - [ ] Image upload works with preview
  - [ ] Category selection works
  - [ ] Spice level selection works
  - [ ] Crop position selection works
  - [ ] Availability and popular toggles work
  - [ ] Form validation works
  - [ ] Item is added successfully

- [ ] **Menu Form - Edit Item**
  - [ ] Form opens with existing item data
  - [ ] All fields populate correctly
  - [ ] Changes can be made and saved
  - [ ] Item updates successfully
  - [ ] Form closes after save

- [ ] **Menu Form - Delete Item**
  - [ ] Delete confirmation works
  - [ ] Item is removed from list
  - [ ] Statistics update correctly
  - [ ] Item no longer appears in customer menu

### 6.4 Promotion Management
- [ ] **Promotion List**
  - [ ] All promotions display correctly
  - [ ] Promotion codes are unique
  - [ ] Discount types show correctly
  - [ ] Active/inactive status displays

- [ ] **Promotion Creation**
  - [ ] Form opens for new promotion
  - [ ] Code generation works
  - [ ] Discount amount can be set
  - [ ] Date range selection works
  - [ ] Usage limits can be set
  - [ ] Promotion saves correctly

---

## 🔧 SYSTEM FEATURES TESTING

### 7.1 User Authentication
- [ ] **Login System**
  - [ ] Login form displays correctly
  - [ ] Email/password validation works
  - [ ] Successful login redirects properly
  - [ ] Failed login shows error message
  - [ ] Session persistence works

- [ ] **User Roles**
  - [ ] Super Admin has full access
  - [ ] Manager has branch-level access
  - [ ] Staff has limited access
  - [ ] Role-based restrictions work

### 7.2 Responsive Design
- [ ] **Desktop View (1920x1080)**
  - [ ] All content fits properly
  - [ ] Navigation is accessible
  - [ ] Forms are usable
  - [ ] No horizontal scrolling

- [ ] **Tablet View (768x1024)**
  - [ ] Layout adapts correctly
  - [ ] Touch targets are adequate
  - [ ] Navigation works
  - [ ] Forms are usable

- [ ] **Mobile View (375x667)**
  - [ ] Mobile menu works
  - [ ] Content stacks properly
  - [ ] Buttons are touch-friendly
  - [ ] No horizontal scrolling
  - [ ] Images scale correctly

### 7.3 Image Management
- [ ] **Image Upload**
  - [ ] File selection works
  - [ ] Image preview displays
  - [ ] Multiple formats supported (JPG, PNG)
  - [ ] File size validation works
  - [ ] Upload progress shows

- [ ] **Image Cropping**
  - [ ] Crop position options work
  - [ ] Preview updates with selection
  - [ ] Top, Center, Bottom, Left, Right all work
  - [ ] Cropped images display correctly

### 7.4 Notifications
- [ ] **Real-time Updates**
  - [ ] Order status changes trigger notifications
  - [ ] New order notifications work
  - [ ] Notification badges update
  - [ ] Notification sounds work if enabled

- [ ] **Notification Display**
  - [ ] Notifications appear in UI
  - [ ] Notifications can be dismissed
  - [ ] Notification history is accessible
  - [ ] Notifications work on mobile

### 7.5 Performance & Loading
- [ ] **Page Load Times**
  - [ ] Home page loads in < 3 seconds
  - [ ] Menu page loads in < 3 seconds
  - [ ] Admin dashboard loads in < 3 seconds
  - [ ] Images load progressively

- [ ] **Interactive Performance**
  - [ ] Button clicks respond immediately
  - [ ] Form submissions process quickly
  - [ ] Cart updates are instant
  - [ ] No noticeable lag in interactions

---

## 📊 DATA INTEGRITY TESTING

### 8.1 Menu Data Consistency
- [ ] **Price Accuracy**
  - [ ] All prices match the provided menu images
  - [ ] SET A Krispy: RM7.99
  - [ ] SET B Krispy: RM11.99
  - [ ] SET C Krispy: RM15.99
  - [ ] SET A Klasik: RM7.99
  - [ ] SET B Klasik: RM11.99
  - [ ] SET C Klasik: RM15.99
  - [ ] Ayam Goreng Krispy: RM4.70
  - [ ] Ayam Goreng Quarter: RM7.00
  - [ ] Ayam Goreng Klasik: RM4.20
  - [ ] Tempe Goreng: RM2.20
  - [ ] Kerabu: RM2.50
  - [ ] Teh Tarik: RM2.00
  - [ ] Air Mineral: RM1.50

- [ ] **Description Accuracy**
  - [ ] All descriptions match the actual menu
  - [ ] Set descriptions include correct components
  - [ ] A la carte descriptions are accurate
  - [ ] No spelling or grammar errors

### 8.2 Order Data Flow
- [ ] **Order Creation**
  - [ ] Orders save to database correctly
  - [ ] Order numbers are unique
  - [ ] Customer information saves properly
  - [ ] Order items save with correct details

- [ ] **Order Updates**
  - [ ] Status changes save to database
  - [ ] Update timestamps are recorded
  - [ ] Order history is maintained
  - [ ] No data corruption during updates

### 8.3 User Data Security
- [ ] **Data Protection**
  - [ ] Passwords are encrypted
  - [ ] Sensitive data is not exposed
  - [ ] Session tokens are secure
  - [ ] API endpoints are protected

---

## 🌐 CROSS-BROWSER TESTING

### 9.1 Browser Compatibility
- [ ] **Chrome (Latest)**
  - [ ] All features work correctly
  - [ ] Layout displays properly
  - [ ] Performance is good
  - [ ] No console errors

- [ ] **Firefox (Latest)**
  - [ ] All features work correctly
  - [ ] Layout displays properly
  - [ ] Performance is good
  - [ ] No console errors

- [ ] **Safari (Latest)**
  - [ ] All features work correctly
  - [ ] Layout displays properly
  - [ ] Performance is good
  - [ ] No console errors

- [ ] **Edge (Latest)**
  - [ ] All features work correctly
  - [ ] Layout displays properly
  - [ ] Performance is good
  - [ ] No console errors

---

## 📱 MOBILE-SPECIFIC TESTING

### 10.1 Touch Interactions
- [ ] **Touch Targets**
  - [ ] All buttons are at least 44px
  - [ ] Touch targets are properly spaced
  - [ ] No accidental touches
  - [ ] Touch feedback is provided

- [ ] **Gestures**
  - [ ] Swipe gestures work where expected
  - [ ] Pinch zoom works on images
  - [ ] Scroll is smooth
  - [ ] No gesture conflicts

### 10.2 Mobile Features
- [ ] **Device Integration**
  - [ ] Phone numbers are clickable
  - [ ] Email addresses are clickable
  - [ ] Address opens in maps
  - [ ] Share functionality works

- [ ] **Mobile Performance**
  - [ ] Pages load quickly on mobile data
  - [ ] Images are optimized for mobile
  - [ ] Battery usage is reasonable
  - [ ] Memory usage is efficient

---

## 🔍 ACCESSIBILITY TESTING

### 11.1 Screen Reader Support
- [ ] **ARIA Labels**
  - [ ] All interactive elements have proper labels
  - [ ] Form fields have proper descriptions
  - [ ] Navigation landmarks are correct
  - [ ] Dynamic content updates are announced

- [ ] **Keyboard Navigation**
  - [ ] Tab order is logical
  - [ ] All interactive elements are keyboard accessible
  - [ ] Focus indicators are visible
  - [ ] Skip links work correctly

### 11.2 Visual Accessibility
- [ ] **Color Contrast**
  - [ ] Text meets WCAG contrast ratios
  - [ ] Interactive elements have sufficient contrast
  - [ ] Color is not the only indicator of state
  - [ ] Text remains readable when zoomed

- [ ] **Text Scaling**
  - [ ] Text can be zoomed to 200%
  - [ ] Layout doesn't break with larger text
  - [ ] Text reflows properly
  - [ ] No horizontal scrolling at 200% zoom

---

## 📝 TESTING SUMMARY

### Test Results Overview
- **Total Test Cases**: [Count after testing]
- **Passed**: [Count after testing]
- **Failed**: [Count after testing]
- **Partial**: [Count after testing]
- **Not Tested**: [Count after testing]

### Critical Issues Found
- [ ] List any critical issues that block release
- [ ] List any high-priority bugs
- [ ] List any security concerns
- [ ] List any performance issues

### Recommendations
- [ ] List recommendations for improvement
- [ ] List features that need additional testing
- [ ] List areas that need optimization
- [ ] List documentation that needs updating

### Sign-off
- **Tester**: _________________________
- **Date**: _________________________
- **Environment**: _________________________
- **Build Version**: _________________________

---

## 🚀 RELEASE READINESS CHECKLIST

### Pre-Release Requirements
- [ ] All critical tests pass
- [ ] No high-priority bugs remain
- [ ] Performance meets requirements
- [ ] Security audit completed
- [ ] Documentation is updated
- [ ] Backup procedures are in place
- [ ] Monitoring is configured
- [ ] Error tracking is set up

### Deployment Checklist
- [ ] Staging environment tests pass
- [ ] Database migrations are tested
- [ ] SSL certificates are valid
- [ ] Domain configuration is correct
- [ ] CDN is configured properly
- [ ] Backup is created before deployment
- [ ] Rollback plan is documented
- [ ] Team is notified of deployment

### Post-Release Verification
- [ ] Production environment is accessible
- [ ] All features work in production
- [ ] Performance is acceptable
- [ ] Error rates are within limits
- [ ] User feedback is monitored
- [ ] Analytics are tracking correctly
- [ ] Backups are successful
- [ ] Monitoring alerts are working