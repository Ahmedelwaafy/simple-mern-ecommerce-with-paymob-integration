export const PrivateRoutes = [
  {
    index: true,
    lazy: () => import("../Pages/Items/index.tsx"),
  },
  {
    path: "items",
    lazy: () => import("../Pages/Items/index.tsx"),
  },
  {
    path: "items/:id/*",
    lazy: () => import("../Pages/Items/ItemDetails/index.tsx"),
  },
  {
    path: "checkout",
    lazy: () => import("../Pages/Checkout/index.tsx"),
  },
  {
    path: "payment-result",
    lazy: () => import("../Pages/PaymentResult/index.tsx"),
  },
];

export const UserAuthRoutes = [
  {
    path: "signup",
    lazy: () => import("../Pages/Authentication/SignUp.tsx"),
  },
  {
    path: "signin",
    lazy: () => import("../Pages/Authentication/SignIn.tsx"),
  },
];

export const routes = {
  signin: "/signin",
  signup: "/signup",
  items: "/items",
  checkout: "/checkout",
  paymentResult: "/payment-result",
};
