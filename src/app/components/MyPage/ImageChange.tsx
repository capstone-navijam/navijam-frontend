'use client'

import React, {useEffect, useRef, useState} from 'react';
import {MemberProfile} from "@/app/components/MyPage/MemberProfile";
import Swal from "sweetalert2";
import {deleteCookie, getCookie, setCookie} from "cookies-next";
import Image from "next/image";
import {ListenerProfile} from "@/app/components/MyPage/ListenerProfile";
import {useTabletHeight} from "@/service/MediaQuery";

interface ImageChangeUrlProps {
    ImageUrl: (data: string) => void;
}

export default function ImageChange({ImageUrl}: ImageChangeUrlProps) {

    const isTabletHeight = useTabletHeight();

    const [memberProfile, setMemberProfile] = useState<string>(`${process.env.NEXT_PUBLIC_S3_BASE_URL}/images/profiles/navijam-default-profile.png`);
    const [listenerProfile, setListenerProfile] = useState<string>(`${process.env.NEXT_PUBLIC_S3_BASE_URL}/images/profiles/navijam-default-profile.png`)
    const [role, setRole] = useState(null);

    const fileInput = useRef(null);

    useEffect(() => {
        const role = getCookie('Role');
        setRole(role);
    }, []);

    useEffect(() => {
        const fetchMemberProfile = async () => {
            try {
                const data = await MemberProfile();
                setMemberProfile(data.profile);
            } catch (err) {
                console.error('프로필 이미지를 불러오는 데 실패했습니다.');
            }
        };

        fetchMemberProfile();
    }, []);

    useEffect(() => {
        const fetchListenerProfile = async () => {
            try {
                const data = await ListenerProfile();
                setListenerProfile(data.profile);
            } catch (err) {
                console.error('프로필 이미지를 불러오는 데 실패했습니다.')
            }
        }

        fetchListenerProfile();
    }, []);

    const handleMemberImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setMemberProfile(e.target.result);
                }
            };
        }
    }

    const handleListenerImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setListenerProfile(e.target.result);
                }
            };
        }
    }

    const handleSubmit = async () => {
        Swal.fire({
            title: "프로필 변경",
            text: "정말로 변경하시겠습니까?",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "변경",
            confirmButtonColor: "#FAAD00",
            cancelButtonText: "취소",
            cancelButtonColor: "#FF0000",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = getCookie("accessToken");

                const formData = new FormData();
                const profile = fileInput.current.files[0];

                formData.append("file", profile);

                try {
                    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/mypage/profile/image`, {
                        method: 'PATCH',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        body: formData,
                    });

                    if (res.ok) {
                        const resultData = await res.json(); // 서버에서 응답 데이터 가져오기
                        console.log('서버 응답 데이터:', resultData);

                        if (resultData.data.profileUrl) {
                            // 쿠키 업데이트
                            setCookie('Profile', resultData.data.profileUrl, {
                                path: '/',
                                maxAge: 60 * 60 * 24 * 7, // 7일 유효
                            });

                            // 성공 알림 및 새로고침
                            Swal.fire({
                                title: "변경 완료!",
                                text: "프로필이 성공적으로 변경되었습니다.",
                                icon: "success",
                                timer: 1000,
                            }).then(() => {
                                window.location.reload();
                            });
                        } else {
                            console.error("프로필 URL이 서버 응답에 없습니다.");
                        }
                    } else {
                        console.error('서버 응답 실패:', res.status);
                        Swal.fire({
                            title: "프로필 변경 실패",
                            text: "다시 시도해주세요.",
                            icon: "error",
                            timer: 1000,
                        });
                    }
                } catch (error) {
                    console.error("서버 요청 중 오류 발생:", error);
                    Swal.fire({
                        title: "프로필 변경 실패",
                        text: "서버 요청 중 문제가 발생했습니다.",
                        icon: "error",
                        timer: 1000,
                    });
                }
            }
        });
    };

    return (<>
        {role === "LISTENER" ? (<>
        <div className='flex flex-col mx-auto'>
            <Image
                src={listenerProfile}
                alt="profile"
                width={250}
                height={250}
                className={`${isTabletHeight ? 'w-[200px] h-[250px]' : 'w-[250px] h-[300px]'} cursor-pointer`}
                onClick={() => fileInput.current.click()} // 이미지 클릭 시 파일 선택
            />
            <input
                ref={fileInput}
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden rounded-full"
                onChange={handleListenerImageChange}
            />
            <button
                className={`mt-4 bg-yellow-6 text-white text-3xl rounded-xl text-center p-2 ${isTabletHeight ? 'w-[200px]' : 'w-[250px]'}`}
                onClick={handleSubmit}
            >
                프로필 변경
            </button>
        </div>
    </>) : (<>
        <div className='flex flex-col mx-auto'>
            <Image
                src={memberProfile}
                alt="profile"
                width={250}
                height={250}
                className="w-[200px] h-[200px] cursor-pointer rounded-full"
                onClick={() => fileInput.current.click()} // 이미지 클릭 시 파일 선택
            />
            <input
                ref={fileInput}
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden rounded-full"
                onChange={handleMemberImageChange}
            />
            <button
                className="mt-4 bg-yellow-6 text-white text-3xl rounded-xl text-center p-2 w-[200px]"
                onClick={handleSubmit}
            >
                프로필 변경
            </button>
        </div>
    </>)}</>);
}