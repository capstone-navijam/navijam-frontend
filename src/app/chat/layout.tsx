"use client";

import React, {useState} from "react";
import {usePathname} from "next/navigation";
import SelectChatting from "../components/Chat/SelectChatting";
import {BiSolidRightArrow} from "react-icons/bi";
import {useTabletHeight} from "@/service/MediaQuery";

export default function ChatLayout({children}: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isTabletHeight = useTabletHeight();
    const [isBookmarkClicked, setIsBookmarkClicked] = useState(false);

    const handleBookmarkClick = () => {
        setIsBookmarkClicked((prev) => !prev);
    };

    const isChatPage = pathname.startsWith("/chat/"); // /chat/${id} 확인


    if (isTabletHeight && !isChatPage) {
        return (
            <div className="relative h-screen w-full">
                <article className="absolute top-0 left-0 w-full h-full bg-white z-20">
                    <SelectChatting/>
                </article>
            </div>
        );
    }

    if (isTabletHeight) {
        return (
            <div className="relative flex h-screen">
                {/* 좌측 상담 기록 */}
                <article
                    className={`absolute top-0 left-0 ${
                        isBookmarkClicked ? "z-20 transform translate-x-0 w-[80%]" : "z-10 transform -translate-x-full"
                    } transition-transform duration-300 bg-white h-full`}
                >
                    <SelectChatting/>
                </article>

                {/* 우측 채팅방 상세 정보 */}
                <section
                    className={`relative w-full ${
                        isBookmarkClicked ? "z-10 opacity-50" : "z-20 opacity-100"
                    } transition-opacity duration-300`}
                >
                    {/* 책갈피 버튼 */}
                    <button
                        onClick={handleBookmarkClick}
                        className="fixed top-4 left-4 w-20 h-20 rounded-full flex items-center justify-center z-40"
                    >
                        <BiSolidRightArrow size={100} className="text-black"/>
                    </button>
                    {children}
                </section>
            </div>
        );
    }

    // 테블릿이 아닐 때 렌더링
    return (
        <div className="flex">
            {/* 좌측 상담 기록 */}
            <article>
                <SelectChatting/>
            </article>

            {/* 우측 채팅방 상세 정보 */}
            <section className="w-full mx-8">{children}</section>
        </div>
    );
}
