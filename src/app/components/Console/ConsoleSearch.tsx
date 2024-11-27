"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GoPlus, GoDash } from "react-icons/go";
import { useDebouncedCallback } from "use-debounce";
import { useCustomSearchParams } from "@/service/useCustomSearchParams";
import { useTabletHeight } from "@/service/MediaQuery";

const categories = [
    "자유", "육아", "진로", "결혼", "외모", "인간관계", "중독", "이별", "가족", "친구", "건강", "정신건강", "사랑",
];

export default function ConsoleSearch({ placeholder }: { placeholder: string }) {
    const isTabletHeight = useTabletHeight();
    const { searchParams, setSearchParams } = useCustomSearchParams();
    const [showCategories, setShowCategories] = useState(false);

    // 검색 입력 처리
    const handleSearch = useDebouncedCallback((term: string) => {
        const newParams = { ...searchParams, query: term || "" };
        setSearchParams(newParams);
    }, 500);

    // 카테고리 클릭 처리
    const handleCategoryClick = (category: string) => {
        const newCategory = category === searchParams.query ? "" : category; // 동일한 카테고리 클릭 시 초기화
        const newParams = { ...searchParams, query: newCategory };
        setSearchParams(newParams);
    };

    // 카테고리 표시 전환
    const toggleCategories = () => {
        setShowCategories((prev) => !prev);
    };

    return (
        <>
            {isTabletHeight ? (
                <article>
                    <div className="flex flex-row items-center mt-1">
                        <label htmlFor="search" className="sr-only">
                            Search
                        </label>
                        <FaSearch className="text-xl items-center" />
                        <input
                            type="text"
                            placeholder={placeholder || "검색하기"}
                            onChange={(e) => handleSearch(e.target.value)}
                            defaultValue={searchParams.query || ""}
                            className="border-2 mx-2 w-72 h-[35px] rounded-lg border-gray-500 placeholder:p-1"
                        />
                    </div>
                </article>
            ) : (
                <article className="mx-4">
                    <h1 className="text-2xl font-medium text-start mt-10">등록된 글 검색</h1>
                    <div className="flex flex-row items-center mt-1">
                        <label htmlFor="search" className="sr-only">
                            Search
                        </label>
                        <FaSearch className="text-xl items-center" />
                        <input
                            type="text"
                            placeholder={placeholder || "검색하기"}
                            onChange={(e) => handleSearch(e.target.value)}
                            defaultValue={searchParams.query || ""}
                            className="border-2 mx-2 w-72 h-[35px] rounded-lg border-gray-500 placeholder:p-1"
                        />
                    </div>

                    <div className="flex flex-col mt-4">
                        <div className="flex flex-row justify-between items-center text-2xl">
                            <h1 className="text-2xl">카테고리</h1>
                            <button onClick={toggleCategories} className="focus:outline-none">
                                {showCategories ? <GoDash /> : <GoPlus />}
                            </button>
                        </div>
                        <div className="w-full border-[1px] mt-0.5 border-black"></div>
                        {showCategories && (
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => handleCategoryClick(category)}
                                        className={`px-4 py-2 rounded-lg border-2 text-2xl text-center ${
                                            searchParams.query === category
                                                ? "bg-yellow-2 text-white" // 선택된 상태
                                                : "border-yellow-2 text-black" // 초기 상태 또는 초기화 후
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </article>
            )}
        </>
    );
}
