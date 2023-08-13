"use client";

import React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { ChevronsUpDownIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { classNames } from "@/helpers/utils";

interface SortableTableHeaderCellProps {
  sortBy: string;
  children: React.ReactNode;
}

export const SortTable: React.FC<SortableTableHeaderCellProps> = ({
  children,
  sortBy: sortByKey,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const direction = searchParams.get("sortDirection");
  const sortBy = searchParams.get("sortBy") || "title";

  const active = sortBy === sortByKey;

  const toggleSort = () => {
    const newSortDirection = direction === "asc" ? "desc" : "asc";

    const queryParams = new URLSearchParams(searchParams.toString()); // Convert to string here
    queryParams.set("sortBy", sortByKey);
    queryParams.set("sortDirection", newSortDirection);

    router.push(pathname + "?" + queryParams.toString());
  };

  return (
    <div
      className={`w-full flex gap-2 cursor-pointer ${
        active ? "font-semibold" : ""
      } ${sortByKey === "title" || sortByKey === "fullName" ? "justify-start" : "justify-end"}`}
      onClick={toggleSort}
    >
      {children}

      <div
        className={classNames(
          "flex items-center rounded-[4px] p-[2px]",
          active ? "bg-gray-200" : ""
        )}
      >
        {!active && (
          <ChevronsUpDownIcon className="h-4 w-4 ml-1 inline-block" />
        )}

        {active &&
          (direction === "desc" ? (
            <ChevronDownIcon className="h-4 w-4 inline-block" />
          ) : (
            <ChevronUpIcon className="h-4 w-4 inline-block" />
          ))}
      </div>
    </div>
  );
};
