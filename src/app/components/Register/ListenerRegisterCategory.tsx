import React from 'react';
import {useMobile, useTablet} from "@/service/MediaQuery";

const categories = [
    '자유', '육아', '진로', '결혼', '외모', '인간관계', '중독',
    '이별', '가족', '친구', '건강', '정신건강', '사랑'
]

interface ListerCategoryProps {
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ComfortCategory({selectedCategories, setSelectedCategories}: ListerCategoryProps) {

    const isTablet = useTablet();

    const handleClick = (category: string) => {
        // 선택된 카테고리가 이미 포함되어 있거나 선택된 카테고리 수가 3개 미만일 때만 선택 가능
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(cat => cat !== category)
                : prev.length < 3
                    ? [...prev, category]
                    : prev // 선택된 카테고리 수가 3개 이상일 경우 추가되지 않음
        );
    };

    return (
        <>
            <div className='flex flex-col w-full'>
                <div className='flex'>
                    <label htmlFor='category'
                           className={` ${isTablet ? 'text-2xl' : 'text-3xl'}  font-semibold w-40 text-wrap`}>카테고리</label>

                    <div className=' text-center flex gap-4 flex-wrap w-full'>
                        {categories.map(category => (
                            <div
                                key={category}
                                onClick={() => handleClick(category)}
                                className={`text-xl h-fit w-20 p-1 rounded-2xl border-2 cursor-pointer ${selectedCategories.includes(category) ? 'bg-yellow-6 text-white border-yellow-6' : 'bg-white text-black border-yellow-6'}`}
                            >
                                {category}
                            </div>
                        ))}
                    </div>
                </div>
                {/* 선택된 카테고리가 3개 이상일 때 경고 메시지 표시 */}
                {selectedCategories.length >= 3 && (
                    <p className={`${isTablet ? 'w-[65%]' : 'w-[72%]'} text-red-500 mx-auto mt-2`}>카테고리는 최대 3개까지만 가능합니다.</p>
                )}

            </div>

        </>);
}
