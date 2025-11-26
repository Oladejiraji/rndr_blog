"use client";
import React from "react";
import { Input } from "../ui/input";
import { Search } from "../svg";
// import { useQueryStateWithoutSuspense } from "@/hooks/useQueryStateWithoutSuspense";
// import { parseAsString } from "nuqs";

const SearchInput = () => {
  // const [q, setQ] = useQueryStateWithoutSuspense(
  //   "q",
  //   parseAsString.withDefault("").withOptions({ shallow: false })
  // );
  return (
    <div className="flex justify-center">
      <div className=" relative">
        <div className="absolute left-3.5 top-[50%] translate-y-[-50%] ">
          <Search />
        </div>
        <Input
          className="bg-gray-100 rounded-[30px] border-none h-9 text-base w-44 pl-9"
          placeholder="Search articles ..."
          // value={q}
          // onChange={(e) => setQ(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchInput;
