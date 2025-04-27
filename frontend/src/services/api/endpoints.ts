import { EndpointConfig } from "@/types";
import {
  GET_PROFILE,
  GET_ITEMS_LIST,
  SIGNIN,
  SIGNOUT,
  SIGNUP,
  GET_CATEGORIES_LIST,
  GET_ITEMS_DETAILS,
  GET_CART,
  UPDATE_CART,
  ADD_TO_CART,
  CREATE_ORDER,
  DELETE_ITEM_FROM_CART,
} from "./queries";

const auth: Record<string, EndpointConfig> = {
  [SIGNIN]: {
    url: "/auth/sign-in",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [SIGNUP]: {
    url: "/auth/sign-up",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [SIGNOUT]: {
    url: "/auth/sign-out",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
};

const profile: Record<string, EndpointConfig> = {
  [GET_PROFILE]: {
    url: "/user/profile",
    config: {
      method: "GET",
    },
  },
};

const items: Record<string, EndpointConfig> = {
  [GET_ITEMS_LIST]: {
    url: "/product",
    config: {
      method: "GET",
      showErrorToast: true,
    },
  },
  [GET_ITEMS_DETAILS]: {
    url: "/product/{id}",
    config: {
      method: "GET",
      showErrorToast: true,
    },
  },
};

const cart: Record<string, EndpointConfig> = {
  [GET_CART]: {
    url: "/cart/check",
    config: {
      method: "GET",
      showErrorToast: true,
    },
  },
  [ADD_TO_CART]: {
    url: "/cart/add",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
  [UPDATE_CART]: {
    url: "/cart",
    config: {
      method: "PATCH",
      showToasts: true,
      throwError: true,
    },
  },
  [DELETE_ITEM_FROM_CART]: {
    url: "/cart/item/{id}",
    config: {
      method: "DELETE",
      showToasts: true,
    },
  },
  [CREATE_ORDER]: {
    url: "/order",
    config: {
      method: "POST",
      showToasts: true,
    },
  },
};

const categories: Record<string, EndpointConfig> = {
  [GET_CATEGORIES_LIST]: {
    url: "/category",
    config: {
      method: "GET",
    },
  },
};

const endpoints: Record<string, EndpointConfig> = {
  ...auth,
  ...profile,
  ...items,
  ...categories,
  ...cart,
};
export default endpoints;
