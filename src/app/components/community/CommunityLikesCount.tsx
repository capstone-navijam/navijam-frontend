import React, { useState } from 'react';
import { getCookie } from 'cookies-next';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';

export default function CommunityLikesCount({ communityId, initialLiked, initialLikeCount }) {
    const [liked, setLiked] = useState(initialLiked);
    const [likeCount, setLikeCount] = useState(initialLikeCount);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = getCookie('accessToken');

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/community/${communityId}/like`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ communityBoardId: communityId }),
            });

            if (res.ok) {
                const data = await res.json();
                setLiked(data.data.liked);
                setLikeCount(data.data.likeCount);
            } else {
                console.error('좋아요를 누르는 데 실패하였습니다.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className="flex flex-row gap-1 -mt-1">
            <button onClick={handleSubmit} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                {liked ? <FaHeart /> : <FaRegHeart />}
            </button>
            <p>{likeCount}</p>
        </div>
    );
}
