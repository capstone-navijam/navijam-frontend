'use client';

import React, { Suspense } from 'react';
import {FaPen} from "react-icons/fa";
import CommunityList from "@/app/components/Community/CommunityList";
import {useTabletHeight} from "@/service/MediaQuery";
import {useRouter} from "next/navigation";
import CommunitySearch from "@/app/components/Community/CommunitySearch";

export default function CommunityContent() {

    const isTabletHeight = useTabletHeight();
    const router = useRouter();
    const handleClick = () => {
        router.push('/community/register')
    }

    return (
        <>
            {isTabletHeight ? (<>
                <div className='w-[95%] mx-auto mt-4 flex justify-between'>
                    <Suspense>
                        <CommunitySearch placeholder="검색하기"/>
                    </Suspense>
                    <button
                        onClick={handleClick}
                        className='w-[20%] text-center bg-yellow-6 p-3 rounded-lg block text-ellipsis'
                    >
                        <div
                            className='flex flex-row justify-center gap-2 text-white text-xl whitespace-nowrap'>
                            <FaPen className='mt-1'/>
                            <span>사연 작성</span>
                        </div>
                    </button>
                </div>
            </>) : (<>
                <div className='w-[80%] mx-auto mt-4 flex justify-end'>
                    <button
                        onClick={handleClick}
                        className='w-[15%] text-center bg-yellow-6 p-3 rounded-lg block text-ellipsis'
                    >
                        <div
                            className='flex flex-row justify-center gap-2 text-white text-4xl whitespace-nowrap'>
                            <FaPen className='mt-1'/>
                            <span>사연 작성</span>
                        </div>
                    </button>
                </div>
            </>)}
            <CommunityList/>
        </>
    )
}