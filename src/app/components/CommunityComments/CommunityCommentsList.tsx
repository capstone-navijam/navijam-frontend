import {getCookie} from "cookies-next";

export interface CommunityCommentsDetailProps {
    id: string;
    nickname: string;
    profile: string;
    content: string;
    timestamp: string;
    communityId: string;
}

export default async function CommunityCommentsList(communityId: string): Promise<CommunityCommentsDetailProps[] | null> {

    const token = getCookie('accessToken');
    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/community/${communityId.toString()}/comments`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    if (res.ok) {
        const result = await res.json();

        console.log(result.data);
        if (Array.isArray(result.data)) {
            return result.data.map((comment: any) => ({
                id: comment.id,
                nickname: comment.nickname,
                profile: comment.profile,
                content: comment.content,
                timestamp: comment.timestamp,
                consoleId: comment.communityId,
            }));
        } else {
            console.error("Unexpected data format");
            return null;
        }
    } else {
        console.error("응답 실패");
        return null;
    }
}