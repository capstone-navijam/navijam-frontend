import {getCookie} from "cookies-next";

export interface MyPageMemberProfileProps {
    id: string,
    profile: string,
    email: string,
    nickname: string,
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