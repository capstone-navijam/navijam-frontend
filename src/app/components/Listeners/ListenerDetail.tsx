'use client';

import React from 'react'
import Image from 'next/image'
import {MdLocalPhone, MdLocationOn, MdOutlineBusinessCenter, MdOutlineSchool, MdOutlineTimer} from 'react-icons/md';
import {useTabletHeight} from "@/service/MediaQuery";
import {useRouter} from "next/navigation";
import {GoComment} from "react-icons/go";

interface ListenerDetailProps {
    nickname: string;
    profile: string;
    categories: string[];
    career: string[];
    education: string[];
    description?: string; // 선택적으로 설정
    address?: string;     // 선택적으로 설정
    contactNumber?: string; // 선택적으로 설정
}

export default function ListenerDetail({
                                           nickname,
                                           profile,
                                           categories,
                                           career,
                                           education,
                                           description,
                                           address,
                                           contactNumber
                                       }: ListenerDetailProps) {

    const isTabletHeight = useTabletHeight();
    const router = useRouter();

    return (
        <>
            {isTabletHeight ? (
                <div className='mx-auto flex h-full bg-white  '>
                    <div className='flex flex-col w-full'>
                        <div className='flex flex-row gap-2'>
                            <Image src={profile} alt="Profile Image" className='rounded-r-xl w-[200px] h-[250px]'
                                   width={500} height={200}/>
                            <div className="flex flex-col w-full">
                                <div className='flex flex-row gap-2 mt-4'>
                                    <h1 className='text-5xl font-semibold'>{nickname} <span
                                        className='text-3xl font-medium'>상담사</span></h1>
                                    <p className='text-yellow-2 font-bold mt-5 text-xl'>#{categories.join(' #')}</p>
                                </div>
                                <div className="w-full border-[2px] border-yellow-2 mt-2"></div>

                                <div className='flex flex-col gap-2 mt-[60px]'>
                                    <p className='text-2xl mx-1 flex flex-row items-center'><MdOutlineTimer
                                        className='text-yellow-2 text-3xl'/>상담 가능 시간 : 09:00 ~ 18:00</p>
                                    <div className='flex flex-row gap-2'>
                                        <button
                                            onClick={() => router.push('/chat')}
                                            className="border-2 border-yellow-2 p-4 text-3xl rounded-xl font-medium hover:bg-yellow-2 hover:text-white">1회
                                            가격: 50,000원
                                        </button>
                                        <div className="text-3xl mt-10">평점: <span className='text-yellow-2'>4.3</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-10 p-4 w-full mt-10'>
                            <p className='text-3xl flex flex-row items-center text-yellow-1 font-medium whitespace-nowrap'>
                                <GoComment/>한 줄 소개: <span
                                className='text-2xl mt-2 mx-2 text-black'>{description}</span></p>

                            <p className='text-3xl flex flex-row items-center text-yellow-1 font-medium whitespace-nowrap'>
                                <MdLocationOn/>주소: <span
                                className='text-2xl mt-2 mx-2 text-black'>{address}</span></p>

                            <p className='text-3xl flex flex-row items-center text-yellow-1 font-medium whitespace-nowrap'>
                                <MdLocalPhone/>연락처: <span
                                className='text-2xl mt-2 mx-2 text-black'>{contactNumber}</span></p>

                            <p className='text-3xl flex items-center font-medium gap-2 text-yellow-1'>
                                <MdOutlineBusinessCenter className='text-2xl -mt-1 '/>
                                경력
                            </p>
                            <ul className='mx-10 mb-4 list-disc font-sans'>
                                {career.map((item, index) => (
                                    <li key={index} className='mt-2 text-2xl'>{item}</li>
                                ))}
                            </ul>
                            <p className='text-3xl flex items-center font-medium gap-2 text-yellow-1'>
                                <MdOutlineSchool className='text-2xl -mt-1 '/>
                                학력
                            </p>
                            <ul className='mx-10 list-disc font-sans'>
                                {education.map((item, index) => (
                                    <li key={index} className='mt-2 text-2xl'>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='mx-auto flex h-full bg-white  '>
                    <div className='flex flex-col p-10 w-full'>
                        <div className='flex flex-row gap-2'>
                            <Image src={profile} alt="Profile Image" className='rounded-r-xl w-[250px] h-[300px]'
                                   width={500} height={200}/>
                            <div className="flex flex-col w-full">
                                <div className='flex flex-row gap-2'>
                                    <h1 className='text-6xl font-semibold'>{nickname} <span
                                        className='text-4xl font-medium'>상담사</span></h1>
                                    <p className='text-yellow-2 font-bold mt-7 text-2xl'>#{categories.join(' #')}</p>
                                </div>
                                <div className="w-full border-[2px] border-yellow-2 mt-2"></div>

                                <div className='flex flex-col gap-2 mt-28'>
                                    <p className='text-2xl mx-1 flex flex-row items-center'><MdOutlineTimer className='text-yellow-2 text-3xl'/>상담 가능 시간 : 09:00 ~ 18:00</p>
                                    <div className='flex flex-row gap-2'>
                                        <button
                                            onClick={() => router.push('/chat')}
                                            className="border-2 border-yellow-2 p-4 text-3xl rounded-xl font-medium hover:bg-yellow-2 hover:text-white">1회
                                            가격: 50,000원
                                        </button>
                                        <div className="text-3xl mt-10">평점: <span className='text-yellow-2'>4.3</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-6 p-4'>
                            <p className='text-4xl flex flex-row items-center text-yellow-1'><GoComment/>한 줄 소개: <span
                                className='text-3xl mt-2 mx-12 text-black'>{description}</span></p>

                            <p className='text-4xl flex flex-row items-center text-yellow-1'><MdLocationOn/>주소: <span
                                className='text-3xl mt-2 mx-[124px] text-black'>{address}</span></p>

                            <p className='text-4xl flex flex-row items-center text-yellow-1'><MdLocalPhone/>연락처: <span
                                className='text-3xl mt-2 mx-24 text-black'>{contactNumber}</span></p>

                            <p className='text-4xl flex items-center font-medium gap-2 text-yellow-1'>
                                <MdOutlineBusinessCenter className='text-6xl -mt-1 '/>
                                경력
                            </p>
                            <ul className='mx-10 mb-4 list-disc font-sans'>
                                {career.map((item, index) => (
                                    <li key={index} className='mt-2 text-3xl'>{item}</li>
                                ))}
                            </ul>
                            <p className='text-4xl flex items-center font-medium gap-2 text-yellow-1'>
                                <MdOutlineSchool className='text-6xl -mt-1 '/>
                                학력
                            </p>
                            <ul className='mx-10 list-disc font-sans'>
                                {education.map((item, index) => (
                                    <li key={index} className='mt-2 text-3xl'>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}