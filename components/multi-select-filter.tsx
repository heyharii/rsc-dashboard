"use client";

import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MultiSelect, MultiSelectItem } from "@tremor/react";

interface MultiSelectFilterProps {
  paramName: string;
  options: string[];
  placeholder: string;
}

const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({
  paramName,
  options,
  placeholder,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSelectedValues = searchParams
    .getAll(paramName)
    .flatMap((valuesString) => valuesString.split(","))
    .filter(
      (value, index, self) => value && self.indexOf(value) === index
    ) as string[];

  const [selectedValues, setSelectedValues] = useState<string[]>(
    initialSelectedValues
  );

  const handleValueChange = (selectedItems: string[]) => {
    setSelectedValues(selectedItems);

    const queryParams = new URLSearchParams(searchParams as any);
    if (selectedItems.length > 0) {
      queryParams.set(paramName, selectedItems.join(","));
    } else {
      queryParams.delete(paramName);
    }

    router.push(pathname + "?" + queryParams.toString());
  };

  return (
    <MultiSelect
      className="max-w-full md:max-w-[200px]"
      onValueChange={handleValueChange}
      placeholder={placeholder}
      value={selectedValues}
    >
      {options.map((option) => (
        <MultiSelectItem key={option} value={option}>
          {option}
        </MultiSelectItem>
      ))}
    </MultiSelect>
  );
};

export default MultiSelectFilter;
