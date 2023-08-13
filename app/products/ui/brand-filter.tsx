"use client"

import React from "react";
import useProducts from "@/hooks/useProducts";
import MultiSelectFilter from "../../../components/multi-select-filter";

const BrandFilter: React.FC = () => {
  const { payload } = useProducts();
  const { products } = payload;
  const brands: string[] = products.map((p: any) => p.brand);
  
  return (
    <MultiSelectFilter
      paramName="brands"
      options={brands}
      placeholder="Select Brands..."
    />
  );
};

export default BrandFilter;
