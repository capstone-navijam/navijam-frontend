'use client'
import React, {useEffect, useState} from 'react';
import ComfortCommentsList, {ComfortCommentsDetailProps} from "@/app/components/ComfortComments/ComfortCommentsList";
import Image from "next/image";
import {useMobile, useTabletHeight} from "@/service/MediaQuery";

export default function ComfortCommentsDetail({consoleId, onCommentCount}) {
    const [comments, setComments] = useState<ComfortCommentsDetailProps[]>([]);
    const isTabletHeight = useTabletHeight();

    useEffect(() => {

        const fetchComments = async () => {
            if (consoleId) {
                try {
                    const data = await ComfortCommentsList(consoleId);
                    setComments(data);

                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    onCommentCount(data.length);
                } catch (err) {
                    console.error("댓글을 불러오는 데 실패했습니다.");
                }
            }
        };
        fetchComments();
    }, [consoleId]);

    return (
        <div className='mt-8 flex flex-col gap-8'>
            {comments.length > 0 ? (
                comments.map(comment => (
                    <div key={comment.id}>
                        <div className='flex flex-row justify-between mx-2 text-center items-center'>
                            <div className='flex flex-row gap-2 items-center text-center'>
                                <p className={` ${isTabletHeight ? 'text-3xl' : 'text-4xl'}`}>{comment.nickname} </p>
                                <Image src={comment.profile} alt="Profile Image" width={30} height={30}
                                       className={`mt-1 rounded-full object-cover  ${isTabletHeight ? ' w-[30px] h-[30px] ' : ' w-[60px] h-[60px] '}`}/>
                            </div>
                            <p className={`${isTabletHeight ? 'text-lg' : 'text-xl'} mt-1`}>{comment.timestamp}</p>
                        </div>
                        <p className={`${isTabletHeight ? 'text-xl' : 'text-3xl'} mt-8 mb-4 mx-2 whitespace-pre-wrap leading-normal `}>{comment.content}</p>
                        <div className="w-full mt-1 mb-2 border-[0.5px] border-lightGray/30"></div>
                    </div>
                ))
            ) : (<></>)}

        </div>
    );
}
