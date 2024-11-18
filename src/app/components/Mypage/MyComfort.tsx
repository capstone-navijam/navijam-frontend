'use client';
import React from 'react';
import {useTablet} from "@/service/MediaQuery";

export default function MyComfort() {

    const isTablet = useTablet();

    return (

        <>{isTablet ? (<>
            <article className='w-full'>
                <div className='border-4 border-yellow-2 w-full min-h-[660px] mb-20 rounded-2xl'>
                    {/* 상담 완료 목록 isAnswered = true */}
                    <div className='p-4 flex flex-col w-full'>
                        <h2 className='text-4xl font-medium'>상담 완료!</h2>
                        <ul className='flex flex-col gap-2 text-3xl mx-4 mt-4 mb-4'>
                            <li>1. 위로받기 게시글 작성 답변 완료 예시 1번</li>
                            <div className="w-full mx-auto border-[2px] border-gray/30"></div>
                            <li>2. 위로받기 게시글 작성 답변 완료 예시 2번</li>
                            <div className="w-full mx-auto border-[2px] border-gray/30"></div>
                            <li>3. 위로받기 게시글 작성 답변 완료 예시 3번</li>
                            <div className="w-full mx-auto border-[2px] border-gray/30"></div>
                            <li>4. 위로받기 게시글 작성 답변 완료 예시 4번</li>
                            <div className="w-full mx-auto border-[2px] border-gray/30"></div>
                        </ul>
                        <p className='text-3xl w-full text-center mb-2'> {`<  1  2  3  4  5  >`} </p>
                    </div>

                    <div className="w-[95%] mx-auto border-[2px] border-yellow-2"></div>

                    {/* 상담 진행중 목록 isAnswered = false */}
                    <div className='p-4 flex flex-col'>
                        <h2 className='text-4xl font-medium'>답변 대기중 . . .</h2>
                        <ul className='flex flex-col gap-2 text-3xl mx-4 mt-4 mb-4'>
                            <li>1. 위로받기 게시글 작성 답변 대기중 예시 1번</li>
                            <div className="w-full mx-auto border-[2px] border-gray/30"></div>
                            <li>2. 위로받기 게시글 작성 답변 대기중 예시 2번</li>
                            <div className="w-full mx-auto border-[2px] border-gray/30"></div>
                            <li>3. 위로받기 게시글 작성 답변 대기중 예시 3번</li>
                            <div className="w-full mx-auto border-[2px] border-gray/30"></div>
                            <li>4. 위로받기 게시글 작성 답변 대기중 예시 4번</li>
                            <div className="w-full mx-auto border-[2px] border-gray/30"></div>
                        </ul>
                        <p className='text-3xl w-full text-center mb-2'> {`<  1  2  3  4  5  >`} </p>
                    </div>
                </div>
            </article>
        </>) : (<>
            <article className='w-full'>
                <h1 className='text-6xl font-semibold mt-4'>위로받기 목록</h1>
                <div className='border-4 border-yellow-2 w-full min-h-[660px] mt-2 rounded-2xl'>
                    {/* 상담 완료 목록 isAnswered = true */}
                    <div className='p-3 flex flex-col w-full'>
                        <h2 className='text-4xl font-medium'>상담 완료!</h2>
                        <ul className='flex flex-col gap-2 text-3xl mx-4 mt-4 mb-4'>
                            <li>1. 위로받기 게시글 작성 답변 완료 예시 1번</li>
                            <div className="w-full mx-auto border-[2px] border-gray/30"></div>
                            <li>2. 위로받기 게시글 작성 답변 완료 예시 2번</li>
                            <div className="w-full mx-auto border-[2px] border-gray/30"></div>
                            <li>3. 위로받기 게시글 작성 답변 완료 예시 3번</li>
                            <div className="w-full mx-auto border-[2px] border-gray/30"></div>
                            <li>4. 위로받기 게시글 작성 답변 완료 예시 4번</li>
                            <div className="w-full mx-auto border-[2px] border-gray/30"></div>
                        </ul>
                        <p className='text-3xl w-full text-center mb-2'> {`<  1  2  3  4  5  >`} </p>
                    </div>

                    <div className="w-[95%] mx-auto border-[2px] border-yellow-2"></div>

                    {/* 상담 진행중 목록 isAnswered = false */}
                    <div className='p-3 flex flex-col'>
                        <h2 className='text-4xl font-medium'>답변 대기중 . . .</h2>
                        <ul className='flex flex-col gap-2 text-3xl mx-4 mt-4 mb-4'>
                            <li>1. 위로받기 게시글 작성 답변 대기중 예시 1번</li>
                            <div className="w-full mx-auto border-[2px] border-gray/30"></div>
                            <li>2. 위로받기 게시글 작성 답변 대기중 예시 2번</li>
                            <div className="w-full mx-auto border-[2px] border-gray/30"></div>
                            <li>3. 위로받기 게시글 작성 답변 대기중 예시 3번</li>
                            <div className="w-full mx-auto border-[2px] border-gray/30"></div>
                            <li>4. 위로받기 게시글 작성 답변 대기중 예시 4번</li>
                            <div className="w-full mx-auto border-[2px] border-gray/30"></div>
                        </ul>
                        <p className='text-3xl w-full text-center mb-2'> {`<  1  2  3  4  5  >`} </p>
                    </div>
                </div>
            </article>
        </>)}</>);
}