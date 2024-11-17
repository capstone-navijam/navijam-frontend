'use client';

import React, { useState } from 'react';
import MyProfile from "@/app/components/Mypage/MyProfile";
import MyComfort from "@/app/components/Mypage/MyComfort";
import MyCommunity from "@/app/components/Mypage/MyCommunity";
import MyCounseling from "@/app/components/Mypage/MyCounseling";
import { useTablet } from "@/service/MediaQuery";
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';

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

    const handleMenuClick = (menuId, menuName) => {
        setSelectedMenu(menuId); // 선택된 메뉴 ID 업데이트
        setMenuLabel(menuName); // 버튼에 표시할 메뉴 이름 업데이트
        setIsNavOpen(false); // 메뉴 닫기
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
                    <aside className="mx-20 border-l-2 h-full w-[40%] shadow-custom">
                        <ul className="flex flex-col gap-28 p-4 mx-4 mt-8 mb-2 font-bold">
                            {menuItems.map((menu) => (
                                <li
                                    key={menu.id}
                                    className={`text-5xl cursor-pointer ${
                                        selectedMenu === menu.id ? 'text-black' : 'text-gray-400'
                                    }`}
                                    onClick={() => handleMenuClick(menu.id, menu.label)} // 메뉴 클릭 시 ID와 이름 전달
                                >
                                    {menu.label}
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* 모든 컴포넌트를 한 번에 표시 */}
                    <div className="flex-1 p-8">
                        {menuItems.map((menu) => (
                            <div key={menu.id} className="mb-10">
                                <h2 className="text-4xl font-bold mb-4">{menu.label}</h2>
                                {menu.component}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}
