"use client";
import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { TextInput } from "@tremor/react";
import debounce from "lodash.debounce";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface SearchProps {
  placeholder: string; // Placeholder text for the search input
}

const Search: React.FC<SearchProps> = ({ placeholder }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paramName = "q";

  const initialQuery = searchParams.get(paramName) || "";
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  const updateSearchParams = (value: string) => {
    const queryParams = new URLSearchParams(searchParams as any);
    if (value) {
      queryParams.set(paramName, value);
    } else {
      queryParams.delete(paramName);
    }
    router.push(pathname + "?" + queryParams.toString());
  };

  const debouncedUpdateSearchParams = debounce(updateSearchParams, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    debouncedUpdateSearchParams(value);
  };

  return (
    <TextInput
      icon={SearchIcon}
      placeholder={placeholder}
      value={searchQuery}
      onChange={handleSearchChange}
    />
  );
};

export default Search;
