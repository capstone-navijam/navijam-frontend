import React from 'react';
import {getCookie} from "cookies-next"
import {id} from "postcss-selector-parser";

export interface ChatRoomsMemberProps {
    id: string,
    nickname: string,
    profile: string,
    recentMessage: string,
    recentMessageTime: string,
    isEnabled: boolean,
}

export interface ChatRoomsListenerProps {
    id: string,
    nickname: string,
    profile: string,
    recentMessage: string,
    recentMessageTime: string,
    isEnabled: boolean,
}

export interface ChatRoomsDetailMessageProps {
    message: string,
    createdAt: string,
    senderId: string,
}

export interface ChatRoomsDetailProps {
    id: string,
    nickname: string,
    profile: string,
    messages: ChatRoomsDetailMessageProps[],
    isEnabled: boolean,
    timestamp: string

}

export async function ChatRoomsMember() {

    const token = getCookie('accessToken');

    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/chatrooms/all/member`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })

    if (res.ok) {
        const result = await res.json();


        return result.data.map((item: ChatRoomsMemberProps) => ({
            id: item.id,
            nickname: item.nickname,
            profile: item.profile,
            recentMessage: item.recentMessage,
            recentMessageTime: item.recentMessageTime,
            isEnabled: item.isEnabled,
        }))
    } else {
        return [];
    }

}

export async function ChatRoomsListener() {

    const token = getCookie('accessToken');

    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/chatrooms/all/listener`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })

    if (res.ok) {
        const result = await res.json();


        return result.data.map((item: ChatRoomsMemberProps) => ({
            id: item.id,
            nickname: item.nickname,
            profile: item.profile,
            recentMessage: item.recentMessage,
            recentMessageTime: item.recentMessageTime,
            isEnabled: item.isEnabled,
        }))
    } else {
        return [];
    }

}

export async function ChatRoomsDetail() {
    const token = getCookie('accessToken');

    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/chatrooms/${id.toString()}`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })

    if (res.ok) {
        const result = await res.json();

        return result.data.map((item: ChatRoomsDetailProps) => ({
            id: item.id,
            nickname: item.nickname,
            profile: item.profile,
            messages: item.messages,
            isEnabled: item.isEnabled,
            timestamp: item.timestamp,
        }))
    } else {
        return [];
    }
}