'use client';
import React from 'react';
import CommunityRegister from "@/app/components/Community/CommunityRegister";
import {useTabletHeight} from "@/service/MediaQuery";

export default function CommunityRegisterPage() {
    const isTabletHeight = useTabletHeight();

    return (<>
        {isTabletHeight ? (<>
            <div className='flex flex-col text-center'><h1
                className={`font-bold mt-8 text-5xl`}>커뮤니티</h1>
                <span className='mt-4 text-2xl'>어떤 고민이든 안전하게 공유할 수 있는 공간입니다. <br/>  편안하게 이야기해 주세요</span>
            </div>
            <CommunityRegister/>
        </>) : (<>
            <div className='flex flex-col text-center'><h1
                className={`font-bold mt-8 text-7xl`}>커뮤니티</h1>
                <span className='mt-4 text-3xl'>어떤 고민이든 안전하게 공유할 수 있는 공간입니다. 편안하게 이야기해 주세요</span>
            </div>
            <CommunityRegister/>
        </>)}
    </>)
}