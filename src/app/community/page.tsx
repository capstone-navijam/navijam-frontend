'use client';

import React, {useState} from 'react';
import CommunityContent from "@/app/components/Community/CommunityContent";
import {useMobile, useTablet} from "@/service/MediaQuery";

export default function CommunityPage() {
    const isTablet = useTablet();
    return (<>
        <div className='flex flex-col text-center'><h1
            className={`font-bold mt-8 ${isTablet ? 'text-5xl' : 'text-7xl'}`}>커뮤니티</h1>
            {isTablet ? (
                <span className='mt-4 text-2xl'>어떤 고민이든 안전하게 공유할 수 있는 공간입니다. <br/>  편안하게 이야기해 주세요</span>) : (
                <span className='mt-4 text-3xl'>어떤 고민이든 안전하게 공유할 수 있는 공간입니다. 편안하게 이야기해 주세요</span>)}
        </div>
        <CommunityContent/>
    </>);
}

