'use client';
import useInput from '@/service/useInput';
import React, {useCallback} from 'react';
import {getCookie} from "cookies-next";
import Swal from "sweetalert2";
import {FaPencilAlt} from "react-icons/fa";

export default function CommunityCommentsRegister({communityId}) {

    const content = useInput("");

    const handleCommentsChange = useCallback((e) => {
        if (e.target.name === 'content') {
            content.onChange(e);
        }
    }, [content]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            content: content.value
        }
        const token = getCookie('accessToken');
        try {
            Swal.fire({
                title: "댓글 달기",
                text: "댓글을 등록하시겠습니까?",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "등록하기",
                confirmButtonColor: "#FAAD00",
                cancelButtonText: "취소하기",
                cancelButtonColor: "#FF0000"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/community/${communityId.toString()}/comments`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(formData),
                    });

                    if (res.ok) {
                        Swal.fire({title: "등록 완료!", text: "댓글이 등록되었습니다.", icon: "success", timer: 1000});
                        window.location.reload();
                    } else {
                        Swal.fire({title: "댓글 등록이 실패하였습니다.", text: "다시 시도해주세요.", icon: "error", timer: 1000});
                    }
                }
            })
        } catch (err) {
            console.error('댓글 등록 중 오류 발생', err);
        }
    }

    return (<div>
        <form onSubmit={handleSubmit}>
            <div className="relative mb-12">
                <textarea
                    name="content"
                    className='mt-2 w-full h-[300px] border-2 border-yellow-2 rounded-2xl p-4 resize-none pr-10 outline-none text-4xl placeholder:text-3xl placeholder:p-2'
                    placeholder={`당신의 응원 한마디가 사연자에게 큰 힘이 될 수 있어요.\n작은 한마디라도 댓글을 남겨볼까요?`}
                    value={content.value}
                    onChange={handleCommentsChange}
                    style={{paddingBottom: '2rem'}}
                />
                <button type="submit" className="absolute bottom-4 right-2">
                    <FaPencilAlt className='text-5xl text-yellow-2'/>
                </button>
            </div>
        </form>
    </div>);
}