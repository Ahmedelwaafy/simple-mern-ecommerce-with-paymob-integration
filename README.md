# EZeats - Food Ordering Application

EZeats is a full-stack web application where users can browse restaurant menus, manage their cart, and place orders with Paymob and Stripe payment integration.

---
### Checkout Process

The complete checkout process is recorded and can be viewed at:

[Click here](https://www.awesomescreenshot.com/video/39189326?key=953a8842a4e4f5505d9d85adaa9dfd3d)

## Features

### Frontend Features

- **Authentication**

  - Sign In / Sign Up with email and password
  - JWT token persistence using HTTP-only cookies
  - Protected routes for authenticated users

- **Menu Browsing**

  - Tab-based category browsing (Desserts, Boxes, etc.)
  - Filtering and animated item listings
  - Loading skeletons during data fetching
  - Item details with quantity selection and add-to-cart

- **Cart Management**

  - Floating "View Cart" button
  - Update quantity, remove items
  - Live item count and cart total
  - cart page with editable items

- **Checkout Process**

  - Payment via Paymob (card payment) and Stripe
  - Order summary with subtotal, delivery, total
  - Post-payment result page (success/failure)

- **Client-Side Enhancements**

  - **Redux Toolkit** for client state management
  - **Tanstack Query** for efficient server state management
  - **Localization (i18next)** for multi-language support
  - **Dark Mode** toggle with persistence
  - **CAPTCHA integration** to prevent bot form submissions
  - Dynamic SEO meta tags
  - Error Boundaries to catch UI crashes
  - Lazy Loading Routes for better performance

- **UI & Animation**
  - Framer Motion for smooth animations
  - ShadCN UI library components

---

### Backend Features

- **Authentication**

  - Secure user login with JWT
  - HTTP-only cookies for sessions

- **APIs**

  - Menu endpoints: list and filter menu items
  - Cart & order APIs
  - Checkout integration with Paymob and Stripe

- **Security**

  - Centralized error handling
  - Environment variables validation at runtime

- **Additional Backend Features**
  - Localization of API responses
  - Swagger UI documentation at `/api/docs`
  - Modular code structure (NestJS best practices)

> **Note**  
> _Cart clearing should happen after successful payment. However, Paymob’s webhook is inaccessible during development (localhost)_

---

## Tech Stack

### Frontend

- React.js
- TypeScript
- Tailwind CSS
- Redux Toolkit
- Tanstack Query (React Query)
- Framer Motion
- i18next
- ShadCN UI

### Backend

- NestJS (noted as preferable)
- MongoDB (Mongoose)
- Stripe + Paymob integration
- Swagger for API docs

---

## Setup Instructions

### Prerequisites

- Node.js v16+
- MongoDB running locally or in the cloud

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ezeats.git
cd ezeats
```

2. Setup Frontend:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Available at [http://localhost:5173](http://localhost:5173)

3. Setup Backend:

```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

Available at [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

### Frontend `.env.example`

```env
VITE_RECAPTCHA_KEY=6LeOss0pAAAAAMXYSjEpLiaJQ7Wjm_33nyPVF8yN
VITE_BACKEND_URL=http://localhost:3000/api/v1
VITE_FRONTEND_URL=http://localhost:5173
```

### Backend `.env.example`

```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DATABASE=nestjs-ezeats

JWT_ADMIN_SECRET=fake_admin_secret
JWT_USER_SECRET=fake_user_secret
JWT_TOKEN_AUDIENCE=localhost:3000
JWT_TOKEN_ISSUER=localhost:3000
JWT_ACCESS_TOKEN_TTL=3600000
JWT_REFRESH_TOKEN_TTL=8640000

API_VERSION=v1

# Paymob
PAYMOB_WEBHOOK_SECRET_HMAC=fake-paymob-webhook-secret
PAYMOB_API_KEY=fake-paymob-api-key
PAYMOB_SECRET_KEY=fake-paymob-secret-key
PAYMOB_PUBLIC_KEY=fake-paymob-public-key
PAYMOB_BASE_URL=https://accept.paymob.com/v1
PAYMOB_CARD_INTEGRATION_ID=fake-card-integration-id

# Stripe
STRIPE_SECRET_KEY=fake-stripe-secret-key
STRIPE_WEBHOOK_SECRET=fake-stripe-webhook-secret
```

---

## Project Structure

```bash
ezeats/
├── frontend/               # Next.js frontend app
│   ├── app/                # App Router pages
│   ├── components/         # Reusable components
│   ├── hooks/              # Custom hooks
│   ├── providers/          # Context providers
│   └── types/              # TypeScript types
├── backend/                # NestJS backend API
│   ├── src/
│   │   ├── auth/           # Authentication logic
│   │   ├── menu/           # Menu APIs
│   │   ├── order/          # Order/Checkout logic
│   │   └── common/         # Utilities and middlewares
└── README.md
```

---

## Evaluation Criteria

- **Frontend**

  - Clean, well-organized React components
  - Redux & Tanstack Query used properly
  - Fully responsive and animated
  - Good user experience (UX)

- **Backend**

  - Secure Nest.js API
  - JWT Authentication
  - Stripe and Paymob integration
  - Environment variables validation
  - Well-documented APIs (Swagger)

- **Security**
  - Secure HTTP headers
  - Error handling and validation

---

## Screenshots

### Sign In

[View Screenshot](https://www.awesomescreenshot.com/image/54135686?key=e11873156545227208dbbd719ce44d0c)

### Sign Up

[View Screenshot](https://www.awesomescreenshot.com/image/54135697?key=ea26ccf5d03ab32acb2f2380abdf7a12)

### Listing Page

[View Screenshot](https://www.awesomescreenshot.com/image/54135700?key=5f96b18d95582f2f99c1be8bbd187faf)

### Listing Page (Floating Cart Button)

[View Screenshot](https://www.awesomescreenshot.com/image/54135716?key=e9de511570dcb3988ab13d00018461d1)

### Item Details

[View Screenshot](https://www.awesomescreenshot.com/image/54135703?key=bfd94cea238078596f3674583f028641)

### Checkout Page

[View Screenshot](https://www.awesomescreenshot.com/image/54135711?key=d5851566f8dc7027388e06d1bec620e0)

### Payment Success

[View Screenshot](https://www.awesomescreenshot.com/image/54137144?key=43ae526f7db96784f247859d4c3fe6ee)

---

## License

MIT License.

# simple-mern-ecommerce-with-paymob-integration
