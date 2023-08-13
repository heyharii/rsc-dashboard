import React from "react";
import Table, { TableColumn } from "@/components/table";
import { Product } from "@/types";

interface TableProductProps {
  data: Product[];
}

const columns: TableColumn<Product>[] = [
  { label: "Product Name", key: "title" },
  { label: "Brand", key: "brand" },
  { label: "Price", key: "price" },
  { label: "Stock", key: "stock" },
  { label: "Quantity", key: "quantity" },
  { label: "Category", key: "category" },
];

const TableProduct: React.FC<TableProductProps> = ({ data }) => {
  return (
    <Table columns={columns} data={data} />
  );
}

export default TableProduct;
