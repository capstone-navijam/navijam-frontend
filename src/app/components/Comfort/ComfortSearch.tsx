"use client";

import {useCustomSearchParams} from "@/service/useCustomSearchParams";
import React from "react";
import {FaSearch} from "react-icons/fa";
import {GoPlus} from "react-icons/go";
import {useDebouncedCallback} from "use-debounce";

export default function ComfortSearch({placeholder}: { placeholder: string }) {
    const {searchParams, setSearchParams} = useCustomSearchParams();

    const handleSearch = useDebouncedCallback((term: string) => {
        const newParams = {...searchParams, query: term || ""};
        setSearchParams(newParams);
    }, 500);

    return (
        <>
            <div className="flex flex-row items-center w-[35%] mx-2">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <FaSearch className="text-4xl items-center text-gray-500"/>
                <input
                    type="text"
                    placeholder={placeholder || "검색하기"}
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.query || ""}
                    className="border-2 mx-2 w-full h-[45px] rounded-lg border-gray-500 placeholder:p-1 placeholder:text-2xl"
                />
            </div>
        </>
    );
}
