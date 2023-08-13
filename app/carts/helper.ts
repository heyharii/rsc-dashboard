import { Cart, Product, SortCartByOptions, SortCartDirection, User } from "@/types";

// Sort carts based on specified sorting options
export const sortCarts = (
  carts: Cart[],
  sortBy: SortCartByOptions,
  sortDirection: SortCartDirection
): Cart[] => {
  return carts.slice().sort((a, b) => {
    if (sortBy === "totalProducts") {
      return sortDirection === "asc"
        ? a.totalProducts - b.totalProducts
        : b.totalProducts - a.totalProducts;
    } else if (sortBy === "total") {
      return sortDirection === "asc" ? a.total - b.total : b.total - a.total;
    } else if (sortBy === "discountedTotal") {
      return sortDirection === "asc"
        ? a.discountedTotal - b.discountedTotal
        : b.discountedTotal - a.discountedTotal;
    } else if (sortBy === "fullName") {
      const aFullName = a.fullName ?? "";
      const bFullName = b.fullName ?? "";
      return sortDirection === "asc"
        ? aFullName.localeCompare(bFullName)
        : bFullName.localeCompare(aFullName);
    } else {
      return sortDirection === "asc" ? a.id - b.id : b.id - a.id;
    }
  });
};

export const searchCarts = (
  carts: Cart[],
  query: string,
  properties: string[]
): Cart[] => {
  const lowerQuery = query.toLowerCase();

  return carts.filter((cart) => {
    for (const property of properties) {
      const value = cart[property];

      if (
        typeof value === "string" &&
        value.toLowerCase().includes(lowerQuery)
      ) {
        return true;
      }

      if (typeof value === "number" && value.toString().includes(lowerQuery)) {
        return true;
      }
    }

    return false;
  });
};

// Create a lookup map for Users using userId as the key
export const createUsersLookup = (usersData: User[]): Record<number, User> => {
  return usersData.reduce((lookup: Record<string, User>, user: User) => {
    lookup[user.id] = user;
    return lookup;
  }, {});
};

// Enhance carts with user information
export const addUserAndLinkIntoCarts = (
  cartsData: Cart[],
  usersLookup: Record<number, User>
): Cart[] => {
  return cartsData.map((cart: Cart) => {
    const user = usersLookup[cart.userId];
    const fullName = user
      ? user.firstName && user.lastName
        ? user.firstName + " " + user.lastName
        : "No Name"
      : "No Name";
    const link = `/carts/${cart.id}`;
    return {
      ...cart,
      fullName: fullName,
      link: link,
    };
  });
};


export const addUserIntoCarts = (
  cartsData: Cart[],
  usersLookup: Record<number, User>
): Cart[] => {
  return cartsData.map((cart: Cart) => {
    const user = usersLookup[cart.userId];
    const fullName = user
      ? user.firstName && user.lastName
        ? user.firstName + " " + user.lastName
        : "No Name"
      : "No Name";
    return {
      ...cart,
      fullName: fullName,
    };
  });
};

export function enrichProductCartWithProductData(productsCart: Product[], allProducts: Product[]): Product[] {
  const productLookup: Record<number, Product> = {};

  for (const product of allProducts) {
    productLookup[product.id] = product;
  }

  const enrichedProductCart: Product[] = [];

  for (const productCart of productsCart) {
    const product = productLookup[productCart.id];
    if (product) {
      enrichedProductCart.push({ ...productCart, ...product });
    } else {
      enrichedProductCart.push(product);
    }
  }

  return enrichedProductCart;
}
