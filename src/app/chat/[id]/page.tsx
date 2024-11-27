"use client"

import React from 'react';
import ChatRoomDetail from "@/app/components/Chat/ChatRoomDetail";
import {useParams} from "next/navigation";

export default function chatDetailPage() {

    const {id} = useParams();

    return <ChatRoomDetail roomId={id}/>
}