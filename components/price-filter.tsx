"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import * as Popover from "@radix-ui/react-popover";
import { Button } from "@tremor/react";
import { XIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { XCircleIcon } from "@heroicons/react/solid";

const PriceFilter: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialMinPrice = searchParams.get("minPrice") || undefined;
  const initialMaxPrice = searchParams.get("maxPrice") || undefined;

  const [minPrice, setMinPrice] = useState<string | undefined>(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState<string | undefined>(initialMaxPrice);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const applyFilter = () => {
    const queryParams = new URLSearchParams(searchParams as any);

    if (minPrice !== undefined) {
      queryParams.set("minPrice", minPrice);
    } else {
      queryParams.delete("minPrice");
    }

    if (maxPrice !== undefined) {
      queryParams.set("maxPrice", maxPrice);
    } else {
      queryParams.delete("maxPrice");
    }

    const updatedQuery = queryParams.toString();
    router.push(`${pathname}${updatedQuery ? "?" + updatedQuery : ""}`);
    setIsPopoverOpen(false);
  };

  const clearFilter = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    const queryParams = new URLSearchParams(searchParams as any);
    queryParams.delete("minPrice");
    queryParams.delete("maxPrice");
    router.push(pathname + "?" + queryParams.toString());
    setMinPrice(undefined);
    setMaxPrice(undefined);
  };

  return (
    <Popover.Root open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <Popover.Trigger asChild>
        <Button
          variant="secondary"
          className="min-w-[10rem] relative text-tremor-default max-w-full md:max-w-[200px] shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted dark:shadow-dark-tremor-input dark:focus:border-dark-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-muted pl-4 py-2 border bg-tremor-background dark:bg-dark-tremor-background hover:bg-tremor-background-muted hover:text-tremor-content dark:hover:bg-dark-tremor-background-muted text-tremor-content dark:text-dark-tremor-content border-tremor-border dark:border-dark-tremor-border"
        >
          <div className="flex gap-2 justify-between w-full items-center">
            Filter Price
            {(!!minPrice || !!maxPrice) && (
              <XCircleIcon
                onClick={clearFilter}
                className="h-4 w-4 text-tremor-content-subtle"
              />
            )}
          </div>
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded-xl p-5 w-[230px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <div className="flex flex-col gap-4">
            <p className="text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5">
              Price Range
            </p>
            <fieldset className="flex gap-5 items-center">
              <label
                className="text-[13px] text-violet11 w-[75px]"
                htmlFor="minPrice"
              >
                Min
              </label>
              <input
                className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                id="minPrice"
                value={minPrice || ""}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </fieldset>
            <fieldset className="flex gap-5 items-center">
              <label
                className="text-[13px] text-violet11 w-[75px]"
                htmlFor="maxPrice"
              >
                Max
              </label>
              <input
                className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                id="maxPrice"
                value={maxPrice || ""}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </fieldset>
            <Button
              variant="primary"
              className="py-1 ml-auto max-w-content"
              onClick={applyFilter}
            >
              Apply
            </Button>
          </div>
          <Popover.Close
            className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[17px] right-[16px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"
            aria-label="Close"
          >
            <XIcon className="cursor-pointer" />
          </Popover.Close>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default PriceFilter;
