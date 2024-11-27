'use client'
import React from 'react';
import CommunityDetail from "@/app/components/Community/CommunityDetail";
import {useTabletHeight} from "@/service/MediaQuery";

export default function CommunityDetailPage() {
    const isTabletHeight = useTabletHeight();

    return (<>{isTabletHeight ? (<>
        <div className='flex flex-col text-center'><h1
            className={`font-bold mt-8 text-5xl`}>커뮤니티</h1>
            <span className='mt-4 text-2xl'>어떤 고민이든 편하게 이야기 나눠보아요.<br/>서로에게 위로가 되는 공간입니다.</span>
        </div>
        <CommunityDetail/>
    </>) : (<>
        <div className='flex flex-col text-center'><h1
            className={`font-bold mt-8 text-7xl`}>커뮤니티</h1>
            <span className='mt-4 text-3xl'>어떤 고민이든 편하게 이야기 나눠보아요.<br/>서로에게 위로가 되는 공간입니다.</span>
        </div>
        <CommunityDetail/>
    </>)}
    </>);
}