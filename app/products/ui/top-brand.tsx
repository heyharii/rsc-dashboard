"use client"

import React from "react";
import useProducts from "@/hooks/useProducts";
import {
  Badge,
  Card,
  DonutChart as TremorDonutChart,
  Flex,
  Legend,
  List,
  ListItem,
  Title,
} from "@tremor/react";

interface BrandData {
  brand: string;
  total: number;
}

export default function TopBrandsChart() {
  const { payload } = useProducts();
  const { products } = payload;

  const brandCounts: BrandData[] = Object.entries(
    products.reduce((acc: Record<string, number>, product: any) => {
      const brand = product.brand;
      acc[brand] = (acc[brand] || 0) + 1;
      return acc;
    }, {})
  ).map(([brand, total]) => ({ brand, total: total as number }));

  const topBrands: BrandData[] = brandCounts
    .sort((a, b) => b.total - a.total)
    .slice(0, 7);

  return (
    <Card className="max-w-full lg:max-w-md mx-auto h-[708px]">
      <Flex className="space-x-8" justifyContent="start" alignItems="center">
        <Title>Brand Popularity</Title>
      </Flex>
      <Legend
        categories={topBrands.map((brand) => brand.brand)}
        className="mt-6"
      />
      <TremorDonutChart
        data={topBrands}
        category="total"
        index="brand"
        className="mt-12"
        variant="pie"
      />
      <List className="mt-12">
        {topBrands.map((brand) => (
          <ListItem key={brand.brand}>
            {brand.brand}
            <Badge size="md">{brand.total}</Badge>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
