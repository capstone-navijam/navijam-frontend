'use client';

import React, { useState } from 'react';
import MyProfile from "@/app/components/Mypage/MyProfile";
import MyComfort from "@/app/components/Mypage/MyComfort";
import MyCommunity from "@/app/components/Mypage/MyCommunity";
import MyCounseling from "@/app/components/Mypage/MyCounseling";
import { useTablet } from "@/service/MediaQuery";
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import Image from 'next/image'

export default function ProfileCategory() {
    const isTablet = useTablet();
    const [selectedMenu, setSelectedMenu] = useState('profile'); // 현재 선택된 메뉴 ID
    const [menuLabel, setMenuLabel] = useState('내 프로필'); // 버튼에 표시할 현재 메뉴 이름
    const [isNavOpen, setIsNavOpen] = useState(false); // 네비게이션 메뉴 표시 여부 상태

    const menuItems = [
        { id: 'profile', label: '내 프로필', component: <MyProfile /> },
        { id: 'Comfort', label: '위로받기', component: <MyComfort /> },
        { id: 'Community', label: '커뮤니티', component: <MyCommunity /> },
        { id: 'counseling', label: '상담내역', component: <MyCounseling /> },
    ];

    const handleMenuClick = (menuId, menuLabel) => {
        setSelectedMenu(menuId); // 선택된 메뉴 ID 업데이트
        setMenuLabel(menuLabel); // 선택된 메뉴 이름 업데이트

        if (isTablet) {
            setIsNavOpen(false); // 태블릿 환경에서는 메뉴 닫기
        }
    };

    const toggleNav = () => {
        setIsNavOpen((prev) => !prev); // 토글 상태 변경
    };

    return (
        <>
            {isTablet ? (
                <section className="relative">
                    {/* 버튼에 현재 메뉴 이름 표시 */}
                    <button onClick={toggleNav} className="text-4xl p-4 flex items-center gap-2">
                        {menuLabel}
                        {isNavOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
                    </button>

                    {/* 토글 메뉴 */}
                    {isNavOpen && (
                        <ul className="bg-white shadow-lg w-full flex flex-col gap-4 p-4">
                            {menuItems.map((menu) => (
                                <li
                                    key={menu.id}
                                    className={`text-3xl cursor-pointer ${
                                        selectedMenu === menu.id ? 'text-black' : 'text-gray-400'
                                    }`}
                                    onClick={() => handleMenuClick(menu.id, menu.label)} // 메뉴 클릭 시 ID와 이름 전달
                                >
                                    {menu.label}
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* 선택된 메뉴의 컴포넌트 표시 */}
                    <div className="mt-8">
                        {menuItems.find((menu) => menu.id === selectedMenu)?.component}
                    </div>
                </section>
            ) : (
                <section className="flex flex-row">
                    <aside className="border-l-2 h-full w-[35%] shadow-custom">
                        <div className='flex flex-col items-center gap-4'>
                            <Image src='/images/Profile.jpeg' alt="Default Profile" width={400} height={400}
                                   className='w-[200px] h-[200px]'/>

                            {/* {mypage.nickname}이 들어갈 곳 */}
                            <h1 className='text-5xl'>짱구</h1>

                            {/* {mypage.address}가 들어갈 곳 */}
                            <h2 className='text-2xl'>test1@test.com</h2>
                        </div>
                        <ul className="flex flex-col gap-24 p-4 mx-4 mt-8 mb-2 font-bold">
                            {menuItems.map((menu) => (
                                <li
                                    key={menu.id}
                                    className={`text-5xl cursor-pointer ${
                                        selectedMenu === menu.id ? 'text-black' : 'text-gray-400'
                                    }`}
                                    onClick={() => handleMenuClick(menu.id, menu.label)} // 메뉴 클릭 시 ID와 이름 전달
                                >
                                    {menu.label}
                                    <div>
                                        {selectedMenu === menu.id && (
                                            <div className="w-[30%] border-[2px] border-black mt-2"></div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* 선택된 메뉴의 컴포넌트만 표시 */}
                    <div className="flex-1 p-8">
                        {menuItems.find((menu) => menu.id === selectedMenu)?.component}
                    </div>
                </section>
            )}
        </>
    );
}
