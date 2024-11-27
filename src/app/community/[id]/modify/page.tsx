'use client'

import React from 'react';
import CommunityModify from "@/app/components/Community/CommunityModify";

export default function CommunityModifyPage() {
    return (<>
        <div className='flex flex-col text-center'>
            <h1 className='text-5xl font-bold mt-10'>커뮤니티</h1>
            <span className='mt-4 text-xl'>어떤 고민이든 편하게 이야기 나눠보아요.<br/>서로에게 위로가 되는 공간입니다.</span>
        </div>
        <CommunityModify/>
    </>);
}