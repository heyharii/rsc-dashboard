import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  Filter,
  Product,
} from "@/types";
import { Card, Grid, Col } from "@tremor/react";
import PriceFilter from "@/components/price-filter";
import Pagination from "@/components/pagination";
import Search from "@/components/search";
import CategoryFilter from "./ui/category-filter";
import BrandFilter from "./ui/brand-filter";
import TopBrandsChart from "./ui/top-brand";
import TableProduct from "./ui/table-product";
import { getProducts } from "./fetcher";
import { filterSortAndPaginate, isFilterEqualToDefault } from "./helper";
import { paginateItems } from "@/helpers/utils";

export default async function ProductPage({ searchParams }: { searchParams: any }) {
  const q = searchParams.q ?? "";
  const page = parseInt(searchParams.page ?? "1");
  const limit = searchParams.limit ?? 10;
  let skip = (page - 1) * limit;

  // we only filter by search q so that the data is reliable.
  let { payload, error } = await getProducts({ q });
  const { products: databaseProducts, total: totalInDatabase } = payload;

  if (error) {
    notFound();
  }

  const allowedSortByValues = [
    "brands",
    "categories",
    "price",
    "stock",
    "title",
  ];

  const brandsString = searchParams.brands || "";
  const brandsArray = brandsString
    .split(",")
    .filter((brand: string) => brand.trim() !== "");

  const categoriesString = searchParams.categories || "";
  const categoriesArray = categoriesString
    .split(",")
    .filter((category: string) => category.trim() !== "");

  const filter: Filter = {
    brands: brandsArray,
    categories: categoriesArray,
    minPrice: searchParams.minPrice ? parseInt(searchParams.minPrice) : 0,
    maxPrice: searchParams.maxPrice
      ? parseInt(searchParams.maxPrice)
      : Infinity,
    sortDirection: searchParams.sortDirection || "asc",
    sortBy: allowedSortByValues.includes(searchParams.sortBy)
      ? searchParams.sortBy
      : "title",
  };

  const isEmptyFilter = isFilterEqualToDefault(filter);

  let filteredProducts: Product[];
  let totalFilteredData: number;

  if (isEmptyFilter) {
    filteredProducts = paginateItems(databaseProducts, limit, skip);
    totalFilteredData = totalInDatabase;
  } else {
    const result = filterSortAndPaginate(
      databaseProducts,
      filter,
      filter.sortBy,
      filter.sortDirection,
      limit,
      skip
    );
    filteredProducts = result.filteredProducts;
    totalFilteredData = result.totalFilteredData;
  }

  const hasNextPage = totalFilteredData > limit + skip;
  const hasPreviousPage = skip > 0;

  const pagination = {
    total: totalFilteredData,
    hasNextPage,
    hasPreviousPage,
  };

  return (
    <Grid numItemsLg={6} className="gap-6 mt-8">
      <Col numColSpanLg={4}>
        <Card className="h-full pb-0">
          <div className="flex flex-col md:flex-row lg:flex-wrap xl:flex-nowrap gap-3">
            <div className="w-full md:w-auto md:flex-1">
              <Search placeholder="ex: Iphone" />
            </div>
            <Suspense fallback="<div></div>">
              <BrandFilter />
            </Suspense>
            <CategoryFilter />
            <PriceFilter />
          </div>
          <TableProduct data={filteredProducts} />
          <Pagination pagination={pagination} />
        </Card>
      </Col>

      <Col numColSpanLg={2}>
        <div className="space-y-6 w-full">
          <TopBrandsChart />
        </div>
      </Col>
    </Grid>
  );
}
