"use client"
import React from 'react';
import {FaSearch} from "react-icons/fa";
import {ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useDebouncedCallback} from "use-debounce";


export default function ComfortSearch({placeholder}: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        //@ts-ignore
        const readonlyParams: ReadonlyURLSearchParams = new URLSearchParams(window.location.search)
        const params = new URLSearchParams(readonlyParams);

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 500)

    return (
        <div className='flex flex-row items-center'>
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <FaSearch className='text-xl items-center'/>
            <input
                type="text"
                placeholder="검색하기"
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
                className='border-2 mx-2 w-80 h-[35px] rounded-lg border-gray-500 placeholder:p-1'>
            </input>
        </div>);
}