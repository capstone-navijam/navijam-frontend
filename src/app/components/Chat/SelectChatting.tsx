'use client';
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {MdCall} from "react-icons/md";
import {FaCommentDots} from "react-icons/fa6";
import {TbAlertSquare} from "react-icons/tb";
import {useTabletHeight} from "@/service/MediaQuery";
import {
    ChatRoomsListener,
    ChatRoomsListenerProps,
    ChatRoomsMember,
    ChatRoomsMemberProps
} from "@/app/components/Chat/ChatRooms";
import {FaCircle, FaRegCircle} from "react-icons/fa";
import Link from "next/link";
import {getCookie} from "cookies-next";

export default function SelectChatting() {
    const isTabletHeight = useTabletHeight();
    const [chatRoomMember, setChatRoomMember] = useState<ChatRoomsMemberProps[]>([]);
    const [chatRoomListener, setChatRoomListener] = useState<ChatRoomsListenerProps[]>([]);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchChatRoomsMember = async () => {
            try {
                const data = await ChatRoomsMember();
                setChatRoomMember(data)
            } catch (err) {
                console.error('채팅을 불러오는데 실패');
            }
        }
        fetchChatRoomsMember()
    }, []);

    useEffect(() => {
        const fetchChatRoomsListener = async () => {
            try {
                const data = await ChatRoomsListener();
                setChatRoomListener(data)
            } catch (err) {
                console.error('채팅을 불러오는데 실패');
            }
        }
        fetchChatRoomsListener();
    }, []);

    useEffect(() => {
        const role = getCookie("Role");
        setRole(role);
    }, []);


    return (
        <>
            {role === "LISTENER" ? (<>
                {isTabletHeight ? (<>
                    <aside className='border-r-4 w-full'>
                        {/* 상단 상담 기록 헤더 */}
                        <div className='border-b-2 flex justify-center items-center text-center bg-yellow-3'
                             style={{height: '140px'}}>
                            <h1 className='text-5xl font-bold '>상담 기록</h1>
                        </div>

                        {/* 스크롤 가능한 채팅 목록 영역 */}
                        {chatRoomListener.map((chat) => (<>
                            <Link key={chat.id} href={`/chat/${chat.id}`}>
                                <div className='overflow-y-scroll' style={{height: '940px'}}>
                                    {/* 1:1 상담 채팅 목록 */}
                                    <div className="flex flex-col gap-2">
                                        <div
                                            className='flex flex-row p-2 border-2 min-h-[200px] justify-center items-center'>
                                            <Image src={chat.profile} alt="Default Image" width={250} height={250}
                                                   className='w-[150px] h-[200px] '/>
                                            <div className='w-[80%] flex flex-col gap-10'>
                                                <div className='flex flex-row justify-between w-full'>
                                                    <h1 className='text-4xl'>{chat.nickname}</h1>
                                                    {chat.isEnabled ? (<><FaCircle
                                                        className='text-green-500 text-2xl'/></>) : (<><FaRegCircle
                                                        className='text-gray-400 text-2xl'/></>)}
                                                </div>
                                                <div className='flex flex-col gap-2'>

                                                    <p className='flex flex-row items-center gap-2 text-3xl whitespace-nowrap overflow-hidden text-ellipsis w-full '>
                                                        <FaCommentDots className=' text-4xl'/>
                                                        {chat.recentMessage}
                                                    </p>
                                                    <span className='text-xl'>{chat.recentMessageTime}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </>))}
                    </aside>
                </>) : (<>
                    <aside className='border-r-4 shadow-custom' style={{width: '540px', height: '905px'}}>
                        {/* 상단 상담 기록 헤더 */}
                        <div className='border-b-2 flex justify-center items-center text-center bg-yellow-3'
                             style={{height: '140px'}}>
                            <h1 className='text-5xl font-bold '>상담 기록</h1>
                        </div>

                        {/* 스크롤 가능한 채팅 목록 영역 */}
                        {chatRoomListener.map((chat) => (<>
                            <Link key={chat.id} href={`/chat/${chat.id}`}>
                                <div className='overflow-y-scroll' style={{height: '940px'}}>
                                    {/* 1:1 상담 채팅 목록 */}
                                    <div className="flex flex-col gap-2">
                                        <div
                                            className='flex flex-row p-2 border-2 min-h-[200px] justify-center items-center'>
                                            <Image src={chat.profile} alt="Default Image" width={250} height={250}
                                                   className='w-[150px] h-[200px] '/>
                                            <div className='w-[80%] flex flex-col gap-10'>
                                                <div className='flex flex-row justify-between w-full'>
                                                    <h1 className='text-4xl'>{chat.nickname}</h1>
                                                    {chat.isEnabled ? (<><FaCircle
                                                        className='text-green-500 text-2xl'/></>) : (<><FaRegCircle
                                                        className='text-gray-400 text-2xl'/></>)}
                                                </div>
                                                <div className='flex flex-col gap-2'>

                                                    <p className='flex flex-row items-center gap-2 text-3xl whitespace-nowrap overflow-hidden text-ellipsis w-full '>
                                                        <FaCommentDots className=' text-4xl'/>
                                                        {chat.recentMessage}
                                                    </p>
                                                    <span className='text-xl'>{chat.recentMessageTime}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </>))}
                    </aside>
                </>)}
            </>) : (<>
                {isTabletHeight ? (<>
                    <aside className='border-r-4 w-full'>
                        {/* 상단 상담 기록 헤더 */}
                        <div className='border-b-2 flex justify-center items-center text-center bg-yellow-3'
                             style={{height: '140px'}}>
                            <h1 className='text-5xl font-bold '>상담 기록</h1>
                        </div>

                        {/* 스크롤 가능한 채팅 목록 영역 */}
                        {chatRoomMember.map((chat) => (<>
                            <Link key={chat.id} href={`/chat/${chat.id}`}>
                                <div className='overflow-y-scroll' style={{height: '940px'}}>
                                    {/* 1:1 상담 채팅 목록 */}
                                    <div className="flex flex-col gap-2">
                                        <div
                                            className='flex flex-row p-2 border-2 min-h-[200px] justify-center items-center'>
                                            <Image src={chat.profile} alt="Default Image" width={250} height={250}
                                                   className='w-[150px] h-[200px] '/>
                                            <div className='w-[80%] flex flex-col gap-10 mx-2'>
                                                <div className='flex flex-row justify-between w-full'>
                                                    <h1 className='text-4xl'>{chat.nickname}<span
                                                        className='text-3xl mx-1'>상담사</span></h1>
                                                    {chat.isEnabled ? (<><FaCircle
                                                        className='text-green-500 text-2xl'/></>) : (<><FaRegCircle
                                                        className='text-gray-400 text-2xl'/></>)}
                                                </div>
                                                <div className='flex flex-col gap-2'>

                                                    <p className='flex flex-row items-center gap-2 text-3xl whitespace-nowrap overflow-hidden text-ellipsis w-full '>
                                                        <FaCommentDots className=' text-4xl'/>
                                                        {chat.recentMessage}
                                                    </p>
                                                    <span className='text-xl'>{chat.recentMessageTime}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </>))}
                    </aside>
                </>) : (<>
                    <aside className='border-r-4 shadow-custom' style={{width: '540px', height: '905px'}}>
                        {/* 상단 상담 기록 헤더 */}
                        <div className='border-b-2 flex justify-center items-center text-center bg-yellow-3'
                             style={{height: '140px'}}>
                            <h1 className='text-5xl font-bold '>상담 기록</h1>
                        </div>

                        {/* 스크롤 가능한 채팅 목록 영역 */}
                        {chatRoomMember.map((chat) => (<>
                            <Link key={chat.id} href={`/chat/${chat.id}`}>
                                <div className='overflow-y-scroll' style={{height: '940px'}}>
                                    {/* 1:1 상담 채팅 목록 */}
                                    <div className="flex flex-col gap-2">
                                        <div
                                            className='flex flex-row p-2 border-2 min-h-[200px] justify-center items-center'>
                                            <Image src={chat.profile} alt="Default Image" width={250} height={250}
                                                   className='w-[150px] h-[200px] '/>
                                            <div className='w-[80%] flex flex-col gap-10 mx-4'>
                                                <div className='flex flex-row justify-between w-full'>
                                                    <h1 className='text-4xl'>{chat.nickname}<span
                                                        className='text-3xl mx-1'>상담사</span></h1>
                                                    {chat.isEnabled ? (<><FaCircle
                                                        className='text-green-500 text-2xl'/></>) : (<><FaRegCircle
                                                        className='text-gray-400 text-2xl'/></>)}
                                                </div>
                                                <div className='flex flex-col gap-2'>

                                                    <p className='flex flex-row items-center gap-2 text-3xl whitespace-nowrap overflow-hidden text-ellipsis w-full '>
                                                        <FaCommentDots className=' text-4xl'/>
                                                        {chat.recentMessage}
                                                    </p>
                                                    <span className='text-xl'>{chat.recentMessageTime}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </>))}
                    </aside>
                </>)}
            </>)}
        </>);
}
