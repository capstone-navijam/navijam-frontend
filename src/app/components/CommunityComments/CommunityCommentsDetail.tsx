import React, { useEffect, useState } from 'react';
import CommunityCommentsList, {
    CommunityCommentsDetailProps
} from "@/app/components/CommunityComments/CommunityCommentsList";
import Image from "next/image";


export default function CommunityCommentsDetail({ communityId }: CommunityCommentsDetailProps) {
    const [comments, setComments] = useState<CommunityCommentsDetailProps[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
            if (communityId) {
                try {
                    const data = await CommunityCommentsList(communityId);  // communityId를 문자열로 그대로 전달
                    setComments(data || []);
                } catch (err) {
                    console.error('댓글을 불러오는 데 실패했습니다.');
                }
            }
        };
        fetchComments();
    }, [communityId]);

    return (
        <div className='mt-8 flex flex-col gap-8'>
            {comments.length > 0 ? (
                comments.map(comment => (
                    <div key={comment.id}>
                        <div className='flex flex-row justify-between mx-2 text-center items-center'>
                            <div className='flex flex-row gap-2 items-center text-center'>
                                <p className='text-4xl'>{comment.nickname}</p>
                                <Image src={comment.profile} alt="Profile Image" width={30} height={30}
                                       className='mt-1 rounded-full object-cover w-[60px] h-[60px]'/>
                            </div>
                            <p className='text-xl mt-1'>{comment.timestamp}</p>
                        </div>
                        <p className='text-3xl mt-8 mb-4 mx-2'>{comment.content}</p>
                        <div className="w-full mt-1 mb-2 border-[0.5px] border-lightGray/30"></div>
                    </div>
                ))
            ) : (<></>)}
        </div>
    );
}
