'use client';

import React, {useEffect, useState} from 'react';
import MyMemberProfile from "@/app/components/MyPage/MyMemberProfile";
import MyComfort from "@/app/components/MyPage/MyComfort";
import MyCommunity from "@/app/components/MyPage/MyCommunity";
import MyCounseling from "@/app/components/MyPage/MyCounseling";
import MyConsole from "@/app/components/MyPage/MyConsole";
import {useTabletHeight} from "@/service/MediaQuery";
import {IoIosArrowForward, IoIosArrowDown} from 'react-icons/io';
import {getCookie} from 'cookies-next';
import MyListenerProfile from './MyListenerProfile';

export default function ProfileCategory() {
    const isTabletHeight = useTabletHeight();
    const [role, setRole] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState('Profile');
    const [menuLabel, setMenuLabel] = useState('내 프로필');
    const [isNavOpen, setIsNavOpen] = useState(false);


    useEffect(() => {
        const role = getCookie("Role");
        setRole(role);
    }, []);

    const menuItems = role === "LISTENER"
        ? [
            {id: 'Profile', label: '내 프로필', component: <MyListenerProfile/>},
            {id: 'Console', label: '위로하기', component: <MyConsole/>},
            {id: 'Community', label: '커뮤니티', component: <MyCommunity/>},
            {id: 'counseling', label: '상담내역', component: <MyCounseling/>},
        ]
        :
        [
            {id: 'Profile', label: '내 프로필', component: <MyMemberProfile/>},
            {id: 'Comfort', label: '위로받기', component: <MyComfort/>},
            {id: 'Community', label: '커뮤니티', component: <MyCommunity/>},
            {id: 'counseling', label: '상담내역', component: <MyCounseling/>},
        ]
    ;

    const handleMenuClick = (menuId, menuLabel) => {
        setSelectedMenu(menuId); // 선택된 메뉴 ID 업데이트
        setMenuLabel(menuLabel); // 선택된 메뉴 이름 업데이트

        if (isTabletHeight) {
            setIsNavOpen(false); // 태블릿 환경에서는 메뉴 닫기
        }
    };

    const toggleNav = () => {
        setIsNavOpen((prev) => !prev); // 토글 상태 변경
    };

    return (
        <>
            {isTabletHeight ? (
                <section className="relative">
                    {/* 버튼에 현재 메뉴 이름 표시 */}
                    <button onClick={toggleNav} className="text-4xl p-4 flex items-center gap-2">
                        {menuLabel}
                        {isNavOpen ? <IoIosArrowDown/> : <IoIosArrowForward/>}
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
                                    onClick={() => handleMenuClick(menu.id, menu.label)}
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
                    <aside className="border-l-2 w-[24%] shadow-custom">
                        <ul className="flex flex-col gap-24 p-4 mx-4 font-bold justify-center h-full">
                            {menuItems.map((menu) => (
                                <li
                                    key={menu.id}
                                    className={`text-5xl cursor-pointer ${
                                        selectedMenu === menu.id ? 'text-black' : 'text-gray-400'
                                    }`}
                                    onClick={() => handleMenuClick(menu.id, menu.label)}
                                >
                                    {menu.label}
                                    <div>
                                        {selectedMenu === menu.id && (
                                            <div className="w-[44%] border-[2px] border-black mt-2"></div>
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
