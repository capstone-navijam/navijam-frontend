'use client'
import {getCookie} from "cookies-next";

export interface CommunityListDetailProps {
    id: string;
    profile: string;
    nickname: string;
    categories: string[];
    title: string;
    content: string;
    timestamp: string;
    memberId: string;
    liked: boolean,
    likeCount: number,
}

export default async function CommunityListDetail(id: bigint): Promise<CommunityListDetailProps | null> {

    const token = getCookie('accessToken');

    try {
        const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/community/${id.toString()}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        if (res.ok) {
            const result = await res.json();
            return {
                id: result.data.id,
                nickname: result.data.nickname,
                profile: result.data.profile,
                categories: result.data.categories,
                title: result.data.title,
                content: result.data.content,
                memberId: result.data.memberId,
                timestamp: result.data.timestamp,
                liked: result.data.liked,
                likeCount: result.data.likeCount,
            };
        } else {
            console.error(`응답 실패`);
            return null;
        }
    } catch (err) {
        console.error('데이터 가져오는 중 오류 발생', err);
        return null;
    }
}
