import React, { ReactNode } from "react";
import { Title, Text } from "@tremor/react";

interface ProductLayoutProps {
  children: ReactNode;
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return (
    <main>
      <Title>Products Playground</Title>
      <Text>Explore and analyze your product data effortlessly.</Text>

      {children}
    </main>
  );  
}
