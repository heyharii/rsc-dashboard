import React from "react";
import MultiSelectFilter from "../../../components/multi-select-filter";
import { getCategories } from "../fetcher";

const CategoryFilter: React.FC = async () => {
  let { payload: categories } = await getCategories();

  return (
    <MultiSelectFilter
      paramName="Categories"
      options={categories as string[]}
      placeholder="Select Categories..."
    />
  );
};

export default CategoryFilter;
