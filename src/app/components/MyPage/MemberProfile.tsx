import {getCookie} from "cookies-next";

export interface MyPageMemberProfileProps {
    id: string,
    profile: string,
    email: string,
    nickname: string,
}

export interface MyPageMemberComfortsProps {
    id: string,
    title: string,
    createdAt: string,
    isAnswered: boolean,
}

export interface MyPageMemberCommunityProps {
    id: string,
    title: string,
    createdAt: string,
}

export interface MyPageMemberCommunityCommentsProps {
    id: string,
    content: string,
    timestamp: string,
}

export async function MemberProfile(): Promise<MyPageMemberProfileProps | null> {

    const token = getCookie('accessToken');

    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/mypage/profile`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    if (res.ok) {
        const result = await res.json();
        return {
            id: result.data.id,
            profile: result.data.profile,
            email: result.data.email,
            nickname: result.data.nickname,
        };
    } else {
        console.error('응답 실패');
        return null;
    }
}

export async function MemberComforts(): Promise<MyPageMemberComfortsProps[]> {
    const token = getCookie('accessToken');

    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/mypage/comforts`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    if (res.ok) {
        const result = await res.json();
        return result.data.map((item) => ({
            id: item.id,
            title: item.title,
            createdAt: item.createdAt,
            isAnswered: item.isAnswered,
        }));
    } else {
        console.error('응답 실패');
        return null;
    }
}

export async function MemberCommunity(): Promise<MyPageMemberCommunityProps[]> {
    const token = getCookie('accessToken');

    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/mypage/community`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    if (res.ok) {
        const result = await res.json();
        return result.data.map((item) => ({
            id: item.id,
            title: item.title,
            createdAt: item.createdAt
        }));
    } else {
        console.error('응답 실패');
        return null;
    }
}

export async function MemberCommunityComments(): Promise<MyPageMemberCommunityCommentsProps[]> {
    const token = getCookie('accessToken');

    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/mypage/community/comments`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    if (res.ok) {
        const result = await res.json();
        return result.data.map((item) => ({
            id: item.id,
            content: item.content,
            timestamp: item.timestamp,
        }));
    } else {
        console.error('응답 실패');
        return null;
    }
}