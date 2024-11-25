'use client';
import React, {useCallback, useEffect, useState} from 'react';
import {useTabletHeight} from "@/service/MediaQuery";
import {MemberProfile, MyPageMemberProfileProps} from "@/app/components/MyPage/MemberProfile";
import MyPageProfileSkeleton from "@/app/components/SkeletonUI/MyPageProfileSkeleton";
import ImageChange from "@/app/components/MyPage/ImageChange";
import {useRouter} from "next/navigation";
import useInput from "@/service/useInput";
import Swal from "sweetalert2";
import {getCookie, setCookie} from "cookies-next";

export default function MyProfile() {
    const isTabletHeight = useTabletHeight();
    const nickname = useInput('');
    const [member, setMember] = useState<MyPageMemberProfileProps | null>(null);
    const [profileURL, setProfileURL] = useState<string>('');
    const router = useRouter();

    const handleChangeNickname = useCallback((nicknameValue: string) => {
        nickname.onChange({target: {value: nicknameValue}});
    }, [nickname]);

    useEffect(() => {
        const fetchMemberProfile = async () => {
            try {
                const data = await MemberProfile();
                setMember(data);
                if (data) {
                    handleChangeNickname(data.nickname);
                }
            } catch (err) {
                console.error('회원 정보를 불러오는 데 실패했습니다.');
            }
        };

        fetchMemberProfile();
    }, []);

    const handleImageUpload = (data: string) => {
        setProfileURL(data);
    }

    if (!member) {
        return <MyPageProfileSkeleton/>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            nickname: nickname.value,
        };

        Swal.fire({
            title: "닉네임 변경",
            text: "정말로 변경하시겠습니까?",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "변경",
            confirmButtonColor: "#FAAD00",
            cancelButtonText: "취소",
            cancelButtonColor: "#FF0000"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = getCookie('accessToken');

                try {
                    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/mypage/profile`, {
                        method: 'PATCH',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(formData),
                    });

                    if (res.ok) {
                        const resultData = await res.json();
                        console.log('서버 응답 데이터 :', resultData);

                        if (resultData.data.nickname) {
                            setCookie('nickname', resultData.data.nickname, {
                                path: '/',
                                maxAge: 60 * 60 * 24 * 7,
                            });
                        }
                        Swal.fire({title: "변경 완료!", text: "변경되었습니다.", icon: "success", timer: 1000}).then(() => {
                            window.location.replace(`/mypage`);
                        });

                    } else {
                        Swal.fire({title: "잘못된 닉네임 형식입니다.", text: "다시 시도해주세요.", icon: "error", timer: 1000});
                    }
                } catch (err) {
                    console.error('닉네임 변경 중 오류 발생');
                }
            }
        })
    }

    return (
        <>
            {isTabletHeight ? (
                <article className="w-full">
                    <div
                        className="border-4 border-yellow-6 rounded-2xl flex flex-row mt-4 items-center w-full min-h-[300px] p-4 gap-4"
                    >
                        {/* 프로필 이미지 변경 */}

                        <ImageChange ImageUrl={handleImageUpload}/>
                        <div className="flex flex-col gap-8 w-full">
                            <form onSubmit={handleSubmit} className="flex flex-row gap-4 items-center">
                                <span className="text-3xl">닉네임 :</span>
                                <div className='flex flex-col w-[55%] mt-6'>
                                    <input
                                        id="nickname"
                                        className="block border border-yellow-6 p-2 rounded placeholder:text-xl text-2xl"
                                        type="text"
                                        pattern="^[a-zA-Z가-힣0-9]{2,8}$"
                                        value={nickname.value}
                                        onChange={nickname.onChange}
                                        placeholder="새로운 닉네임을 입력해주세요."
                                    />
                                    <p className='mx-1 text-gray-500'>입력하지 않을 시, 닉네임은 유지됩니다.</p>
                                </div>
                                <button type="submit"
                                        className="bg-yellow-6 text-white text-3xl rounded-xl p-2">닉네임 변경
                                </button>
                            </form>
                            <div className="flex flex-row justify-between">
                                <div className='flex flex-row items-center'>
                                    <span className="text-3xl">아이디 :</span>
                                    <p className="text-2xl mx-4"> {member.email}</p>
                                </div>
                                <button
                                    onClick={() => router.push('/mypage/changepassword')}
                                    className="bg-yellow-6 text-white text-3xl rounded-xl p-2">비밀번호 변경
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            ) : (
                <article className="w-full min-h-[805px]">
                    <h1 className="text-6xl w-fit font-semibold mt-4">내 프로필</h1>
                    <div
                        className="border-4 border-yellow-6 rounded-2xl flex flex-row mt-24 items-center w-[95%] mx-auto min-h-[480px] p-4 gap-4"
                    >
                        {/* 프로필 이미지 변경 */}
                        <ImageChange ImageUrl={handleImageUpload}/>
                        <div className="flex flex-col gap-20 w-full">
                            <form onSubmit={handleSubmit} className="flex flex-row gap-4 items-center">
                                <span className="text-5xl">닉네임 :</span>
                                <div className='flex flex-col w-[60%] mx-4 mt-6'>
                                    <input
                                        id="nickname"
                                        className="block border border-yellow-6 p-2 rounded placeholder:text-2xl text-4xl"
                                        type="text"
                                        pattern="^[a-zA-Z가-힣0-9]{2,8}$"
                                        value={nickname.value}
                                        onChange={nickname.onChange}
                                        placeholder="새로운 닉네임을 입력해주세요."
                                    />
                                    <p className='mx-1 text-gray-500'>입력하지 않을 시, 닉네임은 유지됩니다.</p>
                                </div>
                                <button type="submit"
                                        className="bg-yellow-6 text-white text-3xl rounded-xl p-2">닉네임 변경
                                </button>
                            </form>
                            <div className="flex flex-row justify-between">
                                <div className='flex flex-row items-center'>
                                    <span className="text-5xl">아이디 :</span>
                                    <p className="text-4xl mx-8"> {member.email}</p>
                                </div>
                                <button
                                    onClick={() => router.push('/mypage/changepassword')}
                                    className="bg-yellow-6 text-white text-3xl rounded-xl p-2">비밀번호 변경
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            )}
        </>
    );
}
