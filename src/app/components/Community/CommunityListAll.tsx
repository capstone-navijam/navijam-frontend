'use client'
import {getCookie} from "cookies-next";

export interface CommunityListProps {
    id: string,
    profile: string,
    nickname: string,
    categories: [],
    title: string,
    content: string,
    memberId: string,
    liked: boolean,
    likeCount: number,
    timestamp: string,
    commentCount: number,
}

export default async function CommunityListAll(): Promise<CommunityListProps[]> {
    const token = getCookie('accessToken');

    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/community`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    if (res.ok) {
        const result = await res.json();

        return result.data.map((item: CommunityListProps) => ({
            id: item.id,
            nickname: item.nickname,
            profile: item.profile,
            categories: item.categories,
            title: item.title,
            content: item.content,
            memberId: item.memberId,
            liked: item.liked,
            likeCount: item.likeCount,
            timestamp: item.timestamp,
            commentCount: item.commentCount,
        }))
    }


}
