import { notFound } from "next/navigation";
import { Card, Grid, Col } from "@tremor/react";
import { addUserIntoCarts, createUsersLookup } from "../helper";
import { getCarts, getUsers } from "../fetcher";
import TableProduct from "@/app/products/ui/table-product";
import { Cart } from "@/types";
import { getProducts } from "@/app/products/fetcher";
import { enrichProductCartWithProductData } from "../helper";
import { Callout } from "@tremor/react";
import CalloutChart from "../ui/callout-cart";
import Pagination from "@/components/pagination";
import { paginateItems } from "@/helpers/utils";
import TableProductCart from "../ui/table-product-cart";

export default async function CartPage({
  params,
}: {
  params: { cart_id: string },
}) {

  const limit = 10;
  const skip = 0
  // CACHE
  const [cartsPayload, usersPayload, productsPayload] = await Promise.all([
    getCarts(),
    getUsers(),
    getProducts()
  ]);

  const { users: usersData, error: usersError } = usersPayload.payload;
  const { carts: cartsData, error: cartsError } = cartsPayload.payload;
  const { payload: productsData, error: productsError } = productsPayload;
  const { products: allProducts } = productsData;

  if (usersError || cartsError || productsError) {
    notFound();
  }

  const carts = addUserIntoCarts(
    cartsData,
    createUsersLookup(usersData)
  );

  const currentChart = carts.find((cart: Cart) => cart.id === parseInt(params.cart_id));

  if (!currentChart) {
    notFound();
  }

  const { products } = currentChart;

  const enrichedProduct = enrichProductCartWithProductData(products, allProducts);
  const paginatedProducts = paginateItems(enrichedProduct, limit, 0 );

  const total = products.length;
  const hasNextPage = products.length > limit + skip;
  const hasPreviousPage = skip > 0;

  const pagination = {
    total,
    hasNextPage,
    hasPreviousPage,
  };

  return (
    <Grid numItemsLg={6} className="gap-6 mt-8">
      <Col numColSpanLg={12}>
      <CalloutChart
        userName={currentChart.fullName}
        quantity={currentChart.totalQuantity}
        totalPrice={currentChart.total}
        totalPriceAfterDiscount={currentChart.discountedTotal}
      />
        <TableProductCart data={paginatedProducts} />
        <Pagination pagination={pagination}/>
      </Col>

      <Col numColSpanLg={2}></Col>
    </Grid>
  );
}
