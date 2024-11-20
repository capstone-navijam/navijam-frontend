'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTabletHeight } from "@/service/MediaQuery";
import { MemberProfile, MyPageMemberProfileProps } from "@/app/components/MyPage/MemberProfile";
import MyPageProfileSkeleton from "@/app/components/SkeletonUI/MyPageProfileSkeleton";

export default function MyProfile() {
    const isTabletHeight = useTabletHeight();
    const [member, setMember] = useState<MyPageMemberProfileProps | null>(null);

    useEffect(() => {
        const fetchMemberProfile = async () => {
            try {
                const data = await MemberProfile();
                setMember(data);
            } catch (err) {
                console.error('회원 정보를 불러오는 데 실패했습니다.');
            }
        };

        fetchMemberProfile();
    }, []);

    if (!member) {
        return <MyPageProfileSkeleton />;
    }

    return (
        <>
            {isTabletHeight ? (
                <article className='w-full'>
                    <div
                        className='border-4 border-yellow-6 rounded-2xl flex flex-row mt-4 items-center w-full min-h-[300px] p-4 gap-4'
                    >
                        <Image src={member.profile} alt="Profile" width={250} height={250} className='w-[90px] h-[90px]' />
                        <div className='flex flex-col gap-8 w-full'>
                            <div className='flex flex-row justify-between'>
                                <p className='text-2xl'><span className='text-3xl'>닉네임</span> : {member.nickname}</p>
                                <button className='bg-yellow-6 text-black text-xl rounded-xl p-2'>닉네임 수정</button>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <p className='text-2xl'><span className='text-3xl'>아이디</span> : {member.email}</p>
                                <button className='bg-yellow-6 text-black text-xl rounded-xl p-2'>비밀번호 수정</button>
                            </div>
                        </div>
                    </div>
                </article>
            ) : (
                <article className='w-full'>
                    <h1 className='text-6xl w-fit font-semibold mt-4'>내 프로필</h1>
                    <div
                        className='border-4 border-yellow-6 rounded-2xl flex flex-row mt-24 items-center w-[95%] mx-auto min-h-[480px] p-4 gap-4'
                    >
                        <Image src={member.profile} alt="Profile" width={250} height={250} />
                        <div className='flex flex-col gap-20 w-full'>
                            <div className='flex flex-row justify-between'>
                                <p className='text-4xl'><span className='text-5xl'>닉네임</span> : {member.nickname}</p>
                                <button className='bg-yellow-6 text-black text-2xl rounded-xl p-2'>닉네임 수정</button>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <p className='text-4xl'><span className='text-5xl'>아이디</span> : {member.email}</p>
                                <button className='bg-yellow-6 text-black text-2xl rounded-xl p-2'>비밀번호 수정</button>
                            </div>
                        </div>
                    </div>
                </article>
            )}
        </>
    );
}
