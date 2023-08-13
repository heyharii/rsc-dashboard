"use client"

import React from "react";
import { Table as TremorTable, TableRow, TableCell, TableHead, TableHeaderCell, TableBody } from "@tremor/react";
import { SortTable } from "./sort-table";
import Link from "next/link";

export interface TableColumn<T> {
  label: string;
  key: Extract<keyof T, string>;
  isLink?: boolean;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (item: T) => void;
}

function Table<T>({ data, columns, onRowClick }: TableProps<T>) {
  return (
    <TremorTable className="mt-2 max-h-[600px]">
      <TableHead>
        <TableRow>
          {columns.map((column, index) => (
            <TableHeaderCell
              key={column.key}
              className={`${index === 0 ? "text-left" : "text-right"} bg-white`}
            >
              {column.isLink ? (
                <span></span> 
              ) : (
                <SortTable sortBy={column.key}>{column.label}</SortTable>
              )}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody className="h-[529px]">
        {data.map((item, index) => (
          <TableRow
            key={index}
            onClick={() => onRowClick && onRowClick(item)}
            style={onRowClick ? { cursor: "pointer" } : undefined}
          >
            {columns.map((column, index) => (
              <TableCell className={index === 0 ? "text-left" : "text-right"} key={column.key}>
                {column.isLink ? (
                  <Link href={item[column.key] as string} className="text-indigo-600">
                    View Detail
                  </Link>
                ) : (
                  item[column.key] as any
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TremorTable>
  );
}

export default Table;
