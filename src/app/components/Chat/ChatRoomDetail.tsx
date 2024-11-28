"use client";

import React, {useEffect, useState, useRef} from "react";
import {socket} from "@/socket";
import Swal from "sweetalert2";
import {getCookie} from "cookies-next";
import {useTabletHeight} from "@/service/MediaQuery";

export default function ChatRoomDetail({roomId}) {

    const isTabletHeight = useTabletHeight();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const messagesEndRef = useRef(null);
    const [nickname, setNickname] = useState('');

    useEffect(() => {
        if (socket.connected) {
            handleConnect();
        }

        function handleConnect() {
            setIsConnected(true);
        }

        function handleDisconnect() {
            setIsConnected(false);
        }

        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);

        socket.on("error", (data) => {
            console.error("Socket error:", data);
        });

        socket.emit("joinChatRoom", {roomId});
        socket.on("userJoined", (message) => {
            console.log(message);
        });

        socket.emit("getChatRoomDetail", {roomId});
        socket.on("chatRoomDetail", (data) => {
            setMessages(data.messages);
        });

        socket.on("newMessage", (data) => {
            setMessages((messages) => [...messages, data]);
        });

        socket.on("endChatRoom", (data) => {
            Swal.fire({
                title: "채팅 종료",
                text: "채팅을 종료하시겠습니까?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "종료",
                confirmButtonColor: "#FAAD00",
                cancelButtonText: "취소",
                cancelButtonColor: "#FF0000",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "채팅 종료",
                        text: `${data.message}`,
                        icon: "success",
                        timer: 1000,
                    });
                    window.location.replace(`/chat`);
                }
            });
        });

        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("userJoined");
            socket.off("chatRoomDetail");
            socket.off("newMessage");
            socket.off("endChatRoom");
        };
    }, []);

    useEffect(() => {
        // Scroll to the bottom when messages are updated
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    useEffect(() => {
        const nickname = getCookie("nickname");
        setNickname(nickname);
    }, []);

    const handleSendMessage = () => {
        if (newMessage.trim() === "") return;

        socket.emit("sendMessage", {roomId, message: newMessage});
        setNewMessage("");
    };

    const handleKeyDown = (e) => {
        console.log("e.key", e.key);
        if (e.key === "Enter") {
            // Shift + Enter를 눌렀을 경우 줄바꿈 허용
            if (e.shiftKey) {
                return;
            }

            // 기본 동작 방지
            e.preventDefault();

            // 입력 값이 공백이거나 조합 중이면 전송하지 않음
            if (!newMessage?.trim() || e.nativeEvent.isComposing) {
                return;
            }

            console.log("Sending message:", newMessage);
            handleSendMessage();
        }
    };




    const handleExit = () => {
        socket.emit("endChatRoom", {roomId});
    };

    return (
        <>{isTabletHeight ? (<>
            <section className='w-full'>
                <div className="max-h-[1000px] min-h-[1000px] overflow-y-auto">
                    {messages.map((message, index) => {
                        const isOwnMessage = message.senderNickname === nickname;

                        return (
                            <div
                                key={index}
                                className={`flex flex-col ${
                                    isOwnMessage ? "items-end" : "items-start"
                                }`}
                            >
                                <div className="flex flex-col gap-4 mt-6">
                                    {!isOwnMessage && (
                                        <p className="text-4xl">{message.senderNickname}</p>
                                    )}
                                    {!isOwnMessage ? (
                                        <div className="flex flex-row gap-4 -mt-2 mb-10">
                                            <div
                                                className="relative w-fit p-2 text-3xl bg-white rounded-[10px] border-4 border-yellow-6"
                                            >
                                                {message.message}
                                            </div>
                                            <p className="text-xl flex items-end">{message.createdAt}</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-row gap-4 -mt-2 mb-10">
                                            <p className="text-xl flex items-end">{message.createdAt}</p>
                                            <div
                                                className="relative  w-fit p-2 text-3xl border-4 border-yellow-6  bg-white rounded-[10px]"
                                            >
                                                {message.message}
                                            </div>

                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef}></div>
                </div>
                <div className="w-full flex flex-row gap-4">
                    <input
                        type="text"
                        value={newMessage}
                        className="border-2 p-4 w-full border-yellow-2 mx-10 rounded-2xl text-xl"
                        placeholder="입력하기"
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="w-[15%] rounded-2xl  bg-yellow-2 text-white p-4 text-xl"

                    >
                        전송
                    </button>
                    <button
                        onClick={handleExit}
                        className="w-[15%] rounded-2xl  bg-gray-600 text-white p-4 text-2xl"
                    >
                        종료
                    </button>
                </div>
            </section>
        </>) : (<>
            <section className='w-full  flex flex-col justify-between h-full'>
                <div className="min-h-[1000px] max-h-[1000px] overflow-y-auto">
                    {messages.map((message, index) => {
                        const isOwnMessage = message.senderNickname === nickname;

                        return (
                            <div
                                key={index}
                                className={`flex flex-col ${
                                    isOwnMessage ? "items-end" : "items-start"
                                }`}
                            >
                                <div className="flex flex-col gap-4 mt-4">
                                    {!isOwnMessage && (
                                        <p className="text-4xl">{message.senderNickname}</p>
                                    )}
                                    {!isOwnMessage ? (
                                        <div className="flex flex-row gap-4 -mt-2 mb-10">
                                            <div
                                                className="relative w-fit p-2 text-3xl bg-white rounded-[10px] border-4 border-yellow-6"
                                            >
                                                {message.message}
                                            </div>
                                            <p className="text-xl flex items-end">{message.createdAt}</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-row gap-4 -mt-2 mb-10">
                                            <p className="text-xl flex items-end">{message.createdAt}</p>
                                            <div
                                                className="relative  w-fit p-2 text-3xl border-4 border-yellow-6  bg-white rounded-[10px]"
                                            >
                                                {message.message}
                                            </div>

                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef}></div>
                </div>
                <div className="w-full flex flex-row gap-4 mb-10">
                    <input
                        type="text"
                        value={newMessage}
                        className="border-2 p-4 w-full border-yellow-2 mx-10 rounded-2xl text-xl"
                        placeholder="입력하기"
                        onChange={(e) => setNewMessage(e.target.value)} // 상태 업데이트
                        onKeyDown={handleKeyDown} // Enter 키 이벤트 처리
                    />
                    <button
                        onClick={handleSendMessage}
                        className="w-[15%] rounded-2xl bg-yellow-2 text-white p-4 text-xl"
                    >
                        전송
                    </button>
                    <button
                        onClick={handleExit}
                        className="w-[15%] rounded-2xl bg-gray-600 text-white p-4 text-2xl"
                    >
                        종료
                    </button>
                </div>

            </section>
        </>)}</>
    );
}
