'use client'

import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {FiUser} from "react-icons/fi";
import Image from "next/image";
import {PiListBold} from "react-icons/pi";  // 토글 아이콘
import Logout from "@/app/components/Mainpage/Logout";
import HeaderSkeleton from '../SkeletonUI/HeaderSkeleton';
import {usePC, useTabletHeight} from "@/service/MediaQuery";

interface HeaderProps {
    nickname: string;
    status: boolean;
    role: string;
    profileImage: string;
}

export default function Header({nickname, status, role, profileImage}: HeaderProps) {

    const isPC = usePC();
    const isTabletHeight = useTabletHeight();

    const [isLoading, setIsLoading] = useState(true);
    const [isNavOpen, setIsNavOpen] = useState(false);  // 토글 상태 관리
    const [profile, setProfile] = useState<string>(profileImage);

    useEffect(() => {
        setProfile(profileImage);
    }, [profileImage]);

    useEffect(() => {
        if (status !== undefined) {
            setIsLoading(false);
        }
    }, [status]);

    if (isLoading) {
        return <HeaderSkeleton/>
    }

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);  // 토글 클릭 시 상태 변경
    };

    const closeNav = () => {
        setIsNavOpen(false);  // Link 클릭 시 네비게이션 닫기
    };

    return (
        <>
            {status ? (
                <>
                    <header>

                        {/* PC 및 모바일 공통 상단 네비게이션 */}
                        <nav className='flex text-center text-2xl items-center justify-end gap-12 mx-10 mt-2'>
                            <Logout/>
                            <div className='border-2 left-1 -mx-6 h-6'/>
                            <Link href='/mypage' className='font-[Tenada] hover:text-yellow-6'>마이페이지</Link>
                        </nav>

                        <div className="w-full mt-2 mb-2 border-[2px] border-lightGray/30"></div>

                        {/* 태블릿 화면 */}
                        {isTabletHeight && (
                            <div className='flex p-4 font-["Tenada"]'>
                                <div className="flex flex-col items-center w-full">
                                    <div className="flex justify-between items-center w-full">
                                        {/* 텍스트 로고 이미지 */}
                                        <Link href="/">
                                            <Image src="/images/TextLogo.png" alt="icon" width={150} height={150}
                                                   priority
                                                   style={{width: 'auto', height: 'auto'}}
                                                   className="cursor-pointer"
                                            />
                                        </Link>
                                        <button onClick={toggleNav} className="text-4xl">
                                            <PiListBold/>
                                        </button>
                                    </div>

                                    {/* 토글된 네비게이션 메뉴 */}
                                    {isNavOpen && (
                                        <nav className='flex flex-col items-center text-3xl gap-5 mt-1 w-full'>
                                            <Link href='/comforts' onClick={closeNav}
                                                  className='hover:text-gray-700 hover:scale-105'>
                                                {role === "LISTENER" ? "위로하기" : "위로받기"}
                                            </Link>
                                            <div className="w-full   border-[1px] border-lightGray/30"></div>
                                            <Link href='/listeners' onClick={closeNav}>나비잠 멘토</Link>
                                            <div className="w-full   border-[1px] border-lightGray/30"></div>
                                            <Link href='/community' onClick={closeNav}>커뮤니티</Link>
                                            <div className="w-full   border-[1px] border-lightGray/30"></div>
                                            <Link href='/chat' onClick={closeNav}>실시간 상담</Link>
                                            <div className="w-full   border-[1px] border-lightGray/30"></div>
                                            <Link href='/mypage' onClick={closeNav}>마이 페이지</Link>
                                        </nav>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* PC 화면 */}
                        {isPC && (
                            <div className='flex p-4 font-["Tenada"]'>
                                <nav className='flex items-center text-3xl gap-28 font-semibold text-gray-400'>
                                    {/* 텍스트 로고 이미지 */}
                                    <Link href="/">
                                        <Image src="/images/TextLogo.png" alt="icon" width={150} height={150}
                                               style={{width: 'auto', height: 'auto'}}
                                               className="cursor-pointer"
                                        />
                                    </Link>
                                    <Link href='/comforts' className='hover:text-gray-700 hover:scale-105'>
                                        {role === "LISTENER" ? "위로하기" : "위로받기"}
                                    </Link>
                                    <Link href='/listeners' className='hover:text-gray-700 hover:scale-105'>나비잠
                                        멘토</Link>
                                    <Link href='/community' className='hover:text-gray-700 hover:scale-105'>커뮤니티</Link>
                                    <Link href='/chat' className='hover:text-gray-700 hover:scale-105'>실시간 상담</Link>
                                    <Link href='/mypage' className='hover:text-gray-700 hover:scale-105'>마이 페이지</Link>
                                </nav>

                                <div className='flex text-center items-center w-[20%] justify-end'>
                                    <p className='text-3xl font-[Tenada] w-full '>
                                        <span className='text-yellow-6'>{nickname}</span>
                                        {role === "LISTENER" ? (<span> 상담사님<br/>어서오세요.</span>) : (<span>님<br/>어서오세요.</span>)}
                                    </p>
                                    {profile ? (
                                        <Link href='/mypage'>
                                            <Image
                                                src={profile}
                                                alt="Profile Image"
                                                width={60}
                                                height={60}
                                                className="rounded-full -mt-2 w-[75px] h-[75px]"
                                            /></Link>
                                    ) : (
                                        <Link href="/mypage" className="text-3xl">
                                            <FiUser/>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </header>

                    <div className="w-full border-[2px] border-lightGray/30"></div>
                </>
            ) : (
                <>
                    <header>

                        {/* 비로그인 상태 */}
                        <nav className='flex text-center text-2xl items-center justify-end gap-12 mx-10 mt-1'>
                            <Link href='/auth/listener' className='font-["Tenada"]'>
                                <span className='text-yellow-6'>상담사</span><br/>회원가입
                            </Link>
                            <div className='border-2 left-1 -mx-6 h-6'/>
                            <Link href='/auth/login' className='font-["Tenada"]'>로그인</Link>
                            <div className='border-2 left-1 -mx-6 h-6'/>
                            <Link href='/auth/signup' className='font-["Tenada"]'>회원가입</Link>
                        </nav>

                        <div className="w-full mt-1 mb-2 border-[2px] border-lightGray/30"></div>


                        {isTabletHeight ? (
                            <div className='flex p-4 font-["Tenada"] items-center'>
                                <div className="flex flex-col items-center w-full">
                                    <div className="flex justify-between items-center w-full">
                                        {/* 텍스트 로고 이미지 */}
                                        <Link href="/">
                                            <Image src="/images/TextLogo.png" alt="icon" width={150} height={150}
                                                   priority
                                                   style={{width: 'auto', height: 'auto'}}
                                                   className="cursor-pointer"
                                            />
                                        </Link>

                                        <button onClick={toggleNav} className="text-4xl">
                                            <PiListBold/>
                                        </button>
                                    </div>

                                    {/* 토글된 네비게이션 메뉴 */}
                                    {isNavOpen && (
                                        <nav className='flex flex-col items-center text-3xl gap-5 mt-1 w-full'>
                                            <Link href='/comforts' onClick={closeNav}>위로받기</Link>
                                            <div className="w-full   border-[1px] border-lightGray/30"></div>
                                            <Link href='/listeners' onClick={closeNav}>나비잠 멘토</Link>
                                            <div className="w-full   border-[1px] border-lightGray/30"></div>
                                            <Link href='/community' onClick={closeNav}>커뮤니티</Link>
                                            <div className="w-full   border-[1px] border-lightGray/30"></div>
                                            <Link href='/chat' onClick={closeNav}>실시간 상담</Link>
                                            <div className="w-full   border-[1px] border-lightGray/30"></div>
                                            <Link href='/mypage' onClick={closeNav}>마이 페이지</Link>
                                        </nav>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className='flex p-4 font-["Tenada"] items-center'>
                                <nav className='flex items-center text-3xl gap-28 font-semibold text-gray-400'>
                                    {/* 텍스트 로고 이미지 */}
                                    <Link href="/">
                                        <Image src="/images/TextLogo.png" alt="icon" width={150} height={150}
                                               priority
                                               style={{width: 'auto', height: 'auto'}}
                                               className="cursor-pointer"
                                        />
                                    </Link>

                                    <Link href='/comforts' className='hover:text-gray-700 hover:scale-105'>위로받기</Link>
                                    <Link href='/listeners' className='hover:text-gray-700 hover:scale-105'>나비잠
                                        멘토</Link>
                                    <Link href='/community' className='hover:text-gray-700 hover:scale-105'>커뮤니티</Link>
                                    <Link href='/chat' className='hover:text-gray-700 hover:scale-105'>실시간 상담</Link>
                                    <Link href='/mypage' className='hover:text-gray-700 hover:scale-105'>마이 페이지</Link>
                                </nav>
                                <Link href='/mypage'
                                      className='ml-auto text-gray-400 hover:text-gray-700 -mt-2 text-5xl'><FiUser/></Link>
                            </div>
                        )}

                    </header>

                    <div className="w-full border-[2px] border-lightGray/30"></div>
                </>
            )}
        </>
    );
}
