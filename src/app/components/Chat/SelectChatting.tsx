'use client';
import React from 'react';
import Image from "next/image";
import {MdCall} from "react-icons/md";
import {FaCommentDots} from "react-icons/fa6";
import {TbAlertSquare} from "react-icons/tb";
import {useTablet} from "@/service/MediaQuery";

export default function SelectChatting() {
    const isTablet = useTablet();

    return (
        <>{isTablet ? (<>
            <aside className='border-r-4 w-full'>
                {/* 상단 상담 기록 헤더 */}
                <div className='border-b-2 flex justify-center items-center text-center bg-yellow-3'
                     style={{height: '140px'}}>
                    <h1 className='text-5xl font-bold '>상담 기록</h1>
                </div>

                {/* 스크롤 가능한 채팅 목록 영역 */}
                <div className='overflow-y-scroll' style={{height: '900px'}}>
                    {/* 1:1 상담 채팅 목록 */}
                    <div className="flex flex-col gap-2">
                        {Array(20).fill(0).map((_, index) => (
                            <div key={index} className='flex flex-row p-2 border-2'>
                                <Image src='/images/Profile.jpeg' alt="Default Image" width={250} height={250}
                                       className='w-[100px] h-[100px] rounded-full'/>
                                <div className='w-full'>
                                    <div className='flex flex-row justify-between w-full items-center'>
                                        <h1 className='text-4xl'>톰슨 <span className='text-3xl'>상담사</span></h1>
                                        <TbAlertSquare className='text-yellow-2 text-3xl'/>
                                    </div>

                                    <div className='flex flex-row gap-2 items-center'>
                                        <MdCall className=' text-2xl'/>
                                        <h2 className='flex flex-row text-2xl items-center gap-2 w-full'>02-234-4567</h2>
                                    </div>

                                    <div className='flex flex-row gap-2 items-center'>
                                        <FaCommentDots className=' text-2xl'/>
                                        <p className='flex flex-row text-xl whitespace-nowrap overflow-hidden text-ellipsis w-full '>
                                            ooo님의 마음 충분히 이해합니다. 무슨 일이 있더라도 항상 돕겠습니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        </>) : (<>
            <aside className='border-r-4 shadow-custom' style={{width: '540px', height: '905px'}}>
                {/* 상단 상담 기록 헤더 */}
                <div className='border-b-2 flex justify-center items-center text-center bg-yellow-3'
                     style={{height: '140px'}}>
                    <h1 className='text-5xl font-bold '>상담 기록</h1>
                </div>

                {/* 스크롤 가능한 채팅 목록 영역 */}
                <div className='overflow-y-scroll' style={{height: '940px'}}>
                    {/* 1:1 상담 채팅 목록 */}
                    <div className="flex flex-col gap-2">
                        {Array(20).fill(0).map((_, index) => (
                            <div key={index} className='flex flex-row p-2 border-2'>
                                <Image src='/images/Profile.jpeg' alt="Default Image" width={250} height={250}
                                       className='w-[100px] h-[100px] rounded-full'/>
                                <div className='w-[80%]'>
                                    <div className='flex flex-row justify-between w-full items-center'>
                                        <h1 className='text-4xl'>톰슨 <span className='text-3xl'>상담사</span></h1>
                                        <TbAlertSquare className='text-yellow-2 text-3xl'/>
                                    </div>

                                    <div className='flex flex-row gap-2 items-center'>
                                        <MdCall className=' text-2xl'/>
                                        <h2 className='flex flex-row text-2xl items-center gap-2 w-full'>02-234-4567</h2>
                                    </div>

                                    <div className='flex flex-row gap-2 items-center'>
                                        <FaCommentDots className=' text-2xl'/>
                                        <p className='flex flex-row text-xl whitespace-nowrap overflow-hidden text-ellipsis w-full '>
                                            ooo님의 마음 충분히 이해합니다. 무슨 일이 있더라도 항상 돕겠습니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        </>)}</>);
}
