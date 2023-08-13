import { paginateItems } from "@/helpers/utils";
import { Filter, Product, SortProductByOptions, SortProductDirection } from "@/types";

// Filter products based on provided filter criteria
export const filterProducts = (products: Product[], filter: Filter): Product[] => {
  const { brands, categories, minPrice, maxPrice } = filter;

  return products.filter((product) => {
    const brandsPass = !brands.length || brands.includes(product.brand);
    const categoryPass =
      !categories.length || categories.includes(product.category);

    let pricePass = true;
    if (minPrice !== 0 || maxPrice !== Infinity) {
      pricePass = product.price >= minPrice && product.price <= maxPrice;
    }

    return brandsPass && categoryPass && pricePass;
  });
};

// Sort products based on specified sorting options
export const sortProducts = (
  products: Product[],
  sortBy: SortProductByOptions,
  sortDirection: SortProductDirection
): Product[] => {
  return products.slice().sort((a, b) => {
    if (sortBy === "price") {
      return sortDirection === "asc" ? a.price - b.price : b.price - a.price;
    } else if (sortBy === "stock") {
      return sortDirection === "asc" ? a.stock - b.stock : b.stock - a.stock;
    } else {
      return sortDirection === "asc"
        ? a[sortBy].localeCompare(b[sortBy])
        : b[sortBy].localeCompare(a[sortBy]);
    }
  });
};

// Filter, sort, and paginate products based on provided parameters
export const filterSortAndPaginate = (
  products: Product[],
  filter: Filter,
  sortBy: SortProductByOptions,
  sortDirection: SortProductDirection,
  limit: number,
  skip: number
): {
  filteredProducts: Product[];
  totalFilteredData: number;
} => {
  const filteredProducts = filterProducts(products, filter);
  const sortedProducts = sortProducts(filteredProducts, sortBy, sortDirection);
  const paginatedProducts = paginateItems(sortedProducts, limit, skip);
  const totalFilteredData = filteredProducts.length;

  return { filteredProducts: paginatedProducts, totalFilteredData };
};

// Check if the filter is empty
export function isFilterEqualToDefault(filter: Filter): boolean {
  const defaultFilter: Filter = {
    brands: [],
    categories: [],
    minPrice: 0,
    maxPrice: Infinity,
    sortDirection: "asc",
    sortBy: "title",
  };

  return (
    filter.brands.join() === defaultFilter.brands.join() &&
    filter.categories.join() === defaultFilter.categories.join() &&
    filter.minPrice === defaultFilter.minPrice &&
    filter.maxPrice === defaultFilter.maxPrice &&
    filter.sortDirection === defaultFilter.sortDirection &&
    filter.sortBy === defaultFilter.sortBy
  );
}
