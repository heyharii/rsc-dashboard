import { notFound } from "next/navigation";
import { Card, Grid, Col } from "@tremor/react";
import Pagination from "@/components/pagination";
import Search from "@/components/search";
import { CartProduct } from "./ui/table-cart";
import { getCarts, getUsers } from "./fetcher";
import {
  addUserAndLinkIntoCarts,
  createUsersLookup,
  searchCarts,
  sortCarts,
} from "./helper";
import { paginateItems } from "@/helpers/utils";

export default async function CartPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const q = searchParams.q ?? "";
  const page = parseInt(searchParams.page ?? "1");
  const limit = searchParams.limit ?? 10;
  let skip = (page - 1) * limit;

  const [cartsPayload, usersPayload] = await Promise.all([
    getCarts(),
    getUsers(),
  ]);

  const { users: usersData, error: usersError } = usersPayload.payload;
  const { carts: cartsData, total, error: cartsError } = cartsPayload.payload;

  if (usersError || cartsError) {
    notFound();
  }

  const carts = addUserAndLinkIntoCarts(
    cartsData,
    createUsersLookup(usersData)
  );

  const searchProperties = [
    "fullName",
    "totalProducts",
    "total",
    "discountedTotal",
  ];
  const allowedSortByValues = [
    "totalProducts",
    "total",
    "discountedTotal",
    "fullName",
  ];

  const sortDirection = searchParams.sortDirection || "asc";
  const sortBy = allowedSortByValues.includes(searchParams.sortBy)
    ? searchParams.sortBy
    : "fullName";

  const sortedCarts = paginateItems(
    sortCarts(searchCarts(carts, q, searchProperties), sortBy, sortDirection),
    limit,
    skip
  );
  const hasNextPage = total > limit + skip;
  const hasPreviousPage = skip > 0;

  const pagination = {
    total,
    hasNextPage,
    hasPreviousPage,
  };

  return (
    <Grid numItemsLg={12} className="gap-6 mt-8">
      <Col numColSpanLg={12}>
        <Card className="h-full pb-0">
          <Search placeholder="ex: Griffin, 2328, 5" />
          <CartProduct data={sortedCarts} />
          <Pagination pagination={pagination} />
        </Card>
      </Col>
    </Grid>
  );
}
