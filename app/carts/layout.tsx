import { Title, Text } from "@tremor/react";

export default function CartLayout({ children }:any) {
  return (
    <main>
      <Title>Carts Playground</Title>
      <Text>Explore and analyze your cart data effortlessly.</Text>

      {children}
    </main>
  );
}
