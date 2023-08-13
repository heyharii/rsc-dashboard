import Table, { TableColumn } from "@/components/table";
import { Cart } from "@/types";

const columns: TableColumn<Cart>[] = [
  { label: "User's Name", key: "fullName",  },
  { label: "Total Products", key: "totalProducts" },
  { label: "Total Price", key: "total" },
  { label: "Total Price After Discount", key: "discountedTotal" },
  { label: "", key: "link", isLink: true },
];

export function CartProduct({ data }: any) {

  return (
    <Table columns={columns} data={data} />
  )
}
