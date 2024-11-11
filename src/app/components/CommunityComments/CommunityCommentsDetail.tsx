'use client'
import React, {useEffect, useState} from 'react';
import CommunityCommentsList, {
    CommunityCommentsDetailProps
} from "@/app/components/CommunityComments/CommunityCommentsList";
import Image from "next/image";
import {useTablet} from "@/service/MediaQuery";


export default function CommunityCommentsDetail({communityId}: CommunityCommentsDetailProps) {

    const isTablet = useTablet();
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
        <>
            {isTablet ? (<>
                <div className='mt-8 flex flex-col gap-10 mb-10'>
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <>
                                <div key={comment.id} className='border-2 rounded-3xl h-auto p-2'>
                                    <div className='flex flex-row justify-between mx-2 text-center items-center'>
                                        <div className='flex flex-row gap-2 items-center text-center'>
                                            <p className='text-3xl'>{comment.nickname}</p>
                                            <Image src={comment.profile} alt="Profile Image" width={30} height={30}
                                                   className='mt-1 rounded-full object-cover w-[45px] h-[45px]'/>
                                        </div>
                                        <p className='text-xl mt-1'>{comment.timestamp}</p>
                                    </div>
                                    <p className='text-3xl leading-normal whitespace-pre-wrap mt-10 mb-10 mx-2'>{comment.content}</p>
                                </div>
                            </>
                        ))
                    ) : (<></>)}
                </div>
            </>) : (<>
                <div className='mt-8 flex flex-col gap-10 mb-10'>
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <>
                                <div key={comment.id} className='border-2 rounded-3xl h-auto p-2'>
                                    <div className='flex flex-row justify-between mx-2 text-center items-center'>
                                        <div className='flex flex-row gap-2 items-center text-center'>
                                            <p className='text-4xl'>{comment.nickname}</p>
                                            <Image src={comment.profile} alt="Profile Image" width={30} height={30}
                                                   className='mt-1 rounded-full object-cover w-[60px] h-[60px]'/>
                                        </div>
                                        <p className='text-xl mt-1'>{comment.timestamp}</p>
                                    </div>
                                    <p className='text-4xl leading-normal whitespace-pre-wrap mt-10 mb-10 mx-2'>{comment.content}</p>
                                </div>
                            </>
                        ))
                    ) : (<></>)}
                </div>
            </>)}
        </>
    );
}
