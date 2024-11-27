'use client';

import React, {useCallback, useEffect, useState} from 'react';
import {useTabletHeight} from "@/service/MediaQuery";
import ImageChange from "@/app/components/MyPage/ImageChange";
import {useRouter} from "next/navigation";
import useInput from "@/service/useInput";
import Swal from "sweetalert2";
import {getCookie, setCookie} from "cookies-next";
import {ListenerProfile, MyPageListenerProfileProps} from "@/app/components/MyPage/ListenerProfile";
import ListenerRegisterCategory from '../Register/ListenerRegisterCategory';
import ListenerCareerModify from "@/app/components/MyPage/ListenerCareerModify";
import ListenerEducationModify from "@/app/components/MyPage/ListenerEducationModify";
import {FaArrowRight} from "react-icons/fa";
import {SelectTime} from "@/app/components/Register/SelectTime";

export default function MyListenerProfile() {
    const isTabletHeight = useTabletHeight();
    const nickname = useInput('');
    const address = useInput('');
    const description = useInput('');
    const phoneNumber = useInput('');
    const contactNumber = useInput('');

    const [career, setCareer] = useState<string[]>([]);
    const [education, setEducation] = useState<string[]>([]);
    const [category, setCategory] = useState<string[]>([]);

    const [availableTime, setAvailableTime] = useState<string[]>([]);

    const [eventStart, setEventStart] = useState("");
    const [eventEnd, setEventEnd] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeInput, setActiveInput] = useState<"start" | "end" | null>(null);

    const [member, setMember] = useState<MyPageListenerProfileProps | null>(null);
    const [profileURL, setProfileURL] = useState<string>('');
    const router = useRouter();

    const handleChangeNickname = useCallback((nicknameValue: string) => {
        nickname.onChange({target: {value: nicknameValue}});
    }, [nickname]);

    const handleChangeAddress = useCallback((addressValue: string) => {
        address.onChange({target: {value: addressValue}});
    }, [address]);

    const handleChangeDescription = useCallback((descriptionValue: string) => {
        description.onChange({target: {value: descriptionValue}});
    }, [description]);

    const handleChangePhoneNumber = useCallback((phoneNumberValue: string) => {
        phoneNumber.onChange({target: {value: phoneNumberValue}});
    }, [phoneNumber]);

    const handleChangeContactNumber = useCallback((contactNumberValue: string) => {
        contactNumber.onChange({target: {value: contactNumberValue}});
    }, [contactNumber]);


    useEffect(() => {
        const fetchListenerProfile = async () => {
            try {
                const data = await ListenerProfile();
                setMember(data);
                if (data) {
                    handleChangeNickname(data.nickname);
                    handleChangeAddress(data.address);
                    handleChangeDescription(data.description);
                    handleChangePhoneNumber(data.phoneNumber);
                    handleChangeContactNumber(data.contactNumber);
                    setCareer(data.career);
                    setEducation(data.education);
                    setCategory(data.category);
                    setAvailableTime(data.availableTime);
                }
            } catch (err) {
                console.error('회원 정보를 불러오는 데 실패했습니다.');
            }
        };

        fetchListenerProfile();
    }, []);

    const handleImageUpload = (data: string) => {
        setProfileURL(data);
    }

    const handleTimeSelect = (time: string) => {
        if (activeInput === "start") {
            setEventStart(time);
        } else if (activeInput === "end") {
            setEventEnd(time);
        }

        if (eventStart && activeInput === "end") {
            setAvailableTime([...availableTime, `${eventStart} ~ ${time}`]);
        }

        setIsModalOpen(false);
        setActiveInput(null);
    }

    if (!member) {
        return <p>데이터를 불러오는 중입니다.</p>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            nickname: nickname.value,
            address: address.value,
            description: description.value,
            phoneNumber: phoneNumber.value,
            contactNumber: contactNumber.value,
            career: career,
            education: education,
            category: category,
            availableTime: availableTime,
        };

        Swal.fire({
            title: "프로필 변경",
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
                    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/mypage/profile/listener`, {
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
                        Swal.fire({title: "잘못된 프로필 형식입니다.", text: "다시 시도해주세요.", icon: "error", timer: 1000});
                    }
                } catch (err) {
                    console.error('프로필 변경 중 오류 발생');
                }
            }
        })
    }

    return (
        <>
            {isTabletHeight ? (
                <article className="w-full min-h-[805px]">
                    <div
                        className="border-4 border-yellow-6 rounded-2xl flex flex-row mt-10 mb-10 w-[95%] mx-auto min-h-[740px] p-4 gap-4"
                    >
                        {/* 프로필 이미지 변경 */}
                        <div className="flex flex-row w-full">
                            {/* 좌측 - 이미지 변경 섹션 */}
                            <div className="flex items-start">
                                <ImageChange ImageUrl={handleImageUpload}/>
                            </div>

                            {/* 우측 - 닉네임, 아이디, 비밀번호 변경 섹션 */}
                            <div className="flex flex-col w-full mx-4 mt-4">
                                {/* 닉네임 변경 */}
                                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8">
                                    <div className='flex flex-row w-full items-center'>
                                        <label className="text-3xl w-36">닉네임:</label>
                                        <div className="flex flex-col w-full mx-2 ">
                                            <input
                                                id="nickname"
                                                className="block border border-yellow-6 p-2 rounded placeholder:text-2xl text-4xl"
                                                type="text"
                                                pattern="^[a-zA-Z가-힣0-9]{2,8}$"
                                                value={nickname.value}
                                                onChange={nickname.onChange}
                                                placeholder="새로운 닉네임을 입력해주세요."
                                            />
                                            <p className="mx-1 text-gray-500">입력하지 않을 시, 닉네임은 유지됩니다.</p>
                                        </div>
                                    </div>

                                    {/* 아이디 */}
                                    <div className='flex flex-row w-full items-center'>
                                        <label className="text-3xl w-36">아이디:</label>
                                        <div className="flex flex-col w-full mx-2 justify-between">
                                            <p className="text-3xl">{member.email}</p>
                                            <button
                                                onClick={() => router.push('/mypage/changepassword')}
                                                className="bg-yellow-6 text-white text2xl rounded-xl p-2 w-[35%]">비밀번호
                                                변경
                                            </button>
                                        </div>
                                    </div>

                                    {/* 한 줄 소개 */}
                                    <div className='flex flex-row w-full items-center'>
                                        <label className="text-3xl w-36">한 줄 소개:</label>
                                        <div className="flex flex-col w-full mx-2">
                                            <input
                                                id="description"
                                                className="block border border-yellow-6 p-2 rounded placeholder:text-2xl text-3xl"
                                                type="text"
                                                value={description.value}
                                                onChange={description.onChange}
                                                placeholder="새로운 한 줄 소개를 입력해주세요."
                                            />
                                            <p className="mx-1 text-gray-500">입력하지 않을 시, 내용은 유지됩니다.</p>
                                        </div>
                                    </div>

                                    {/* 위치 */}
                                    <div className='flex flex-row w-full items-center'>
                                        <label className="text-3xl w-36">주소:</label>
                                        <div className="flex flex-col w-full mx-2">
                                            <input
                                                id="address"
                                                className="block border border-yellow-6 p-2 rounded placeholder:text-2xl text-3xl"
                                                type="text"
                                                value={address.value}
                                                onChange={address.onChange}
                                                placeholder="새로운 주소를 입력해주세요."
                                            />
                                            <p className="mx-1 text-gray-500">입력하지 않을 시, 주소는 유지됩니다.</p>
                                        </div>
                                    </div>

                                    {/* 휴대전화 */}
                                    <div className='flex flex-row w-full items-center'>
                                        <label className="text-3xl w-36">휴대전화:</label>
                                        <div className="flex flex-col w-full mx-2">
                                            <input
                                                id="phoneNumber"
                                                className="block border border-yellow-6 p-2 rounded placeholder:text-2xl text-3xl"
                                                type="text"
                                                value={phoneNumber.value}
                                                onChange={phoneNumber.onChange}
                                                placeholder="새로운 휴대전화를 입력해주세요."
                                            />
                                            <p className="mx-1 text-gray-500">입력하지 않을 시, 휴대전화는 유지됩니다.</p>
                                        </div>
                                    </div>

                                    {/* 전화번호 */}
                                    <div className='flex flex-row w-full items-center'>
                                        <label className="text-3xl w-36">전화번호:</label>
                                        <div className="flex flex-col w-full mx-2">
                                            <input
                                                id="contactNumber"
                                                className="block border border-yellow-6 p-2 rounded placeholder:text-2xl text-3xl"
                                                type="text"
                                                value={contactNumber.value}
                                                onChange={contactNumber.onChange}
                                                placeholder="새로운 전화번호을 입력해주세요."
                                            />
                                            <p className="mx-1 text-gray-500">입력하지 않을 시, 전화번호는 유지됩니다.</p>
                                        </div>
                                    </div>

                                    {/* 경력 */}
                                    <ListenerCareerModify careerField={career} setCareerField={setCareer}/>

                                    {/* 학력 */}
                                    <ListenerEducationModify educationField={education}
                                                             setEducationField={setEducation}/>

                                    {/* 카테고리 */}
                                    <ListenerRegisterCategory selectedCategories={category}
                                                              setSelectedCategories={setCategory}/>

                                    {/* 상담가능시간 */}
                                    <div className='flex flex-row w-full items-center'>
                                        <label className="text-2xl w-36">상담<br/>가능 시간:</label>
                                        <div className='w-full flex flex-row gap-4 items-center justify-between'>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsModalOpen(true);
                                                    setActiveInput("start");
                                                }}
                                                className='border-2 w-[50%] p-4 rounded border-yellow-6 text-2xl'
                                            >
                                                {eventStart || "00:00"}
                                            </button>
                                            <FaArrowRight className='text-3xl'/>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsModalOpen(true);
                                                    setActiveInput("end");
                                                }}
                                                className='border-2 w-[50%] p-4 rounded border-yellow-6 text-2xl'
                                            >
                                                {eventEnd || "00:00"}
                                            </button>
                                        </div>
                                    </div>
                                    {isModalOpen && (<SelectTime onTimeSelect={handleTimeSelect} onClose={() => {
                                        setIsModalOpen(false);
                                        setActiveInput(null);
                                    }}/>)}

                                    <button
                                        className="bg-yellow-6 text-white text-3xl rounded-xl p-2 w-[35%] ml-auto"
                                        type="submit">프로필 수정
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>
                </article>
            ) : (
                <article className="w-full min-h-[805px]">
                    <h1 className="text-6xl w-fit font-semibold mt-4">내 프로필</h1>
                    <div
                        className="border-4 border-yellow-6 rounded-2xl flex flex-row mt-12 w-[95%] mx-auto min-h-[740px] p-4 gap-4"
                    >
                        {/* 프로필 이미지 변경 */}
                        <div className="flex flex-row w-full">
                            {/* 좌측 - 이미지 변경 섹션 */}
                            <div className="flex items-start">
                                <ImageChange ImageUrl={handleImageUpload}/>
                            </div>

                            {/* 우측 - 닉네임, 아이디, 비밀번호 변경 섹션 */}
                            <div className="flex flex-col w-full mx-4 mt-4">
                                {/* 닉네임 변경 */}
                                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8">
                                    <div className='flex flex-row w-full items-center'>
                                        <label className="text-3xl w-36">닉네임:</label>
                                        <div className="flex flex-col w-full mx-2 ">
                                            <input
                                                id="nickname"
                                                className="block border border-yellow-6 p-2 rounded placeholder:text-2xl text-4xl"
                                                type="text"
                                                pattern="^[a-zA-Z가-힣0-9]{2,8}$"
                                                value={nickname.value}
                                                onChange={nickname.onChange}
                                                placeholder="새로운 닉네임을 입력해주세요."
                                            />
                                            <p className="mx-1 text-gray-500">입력하지 않을 시, 닉네임은 유지됩니다.</p>
                                        </div>
                                    </div>

                                    {/* 아이디 */}
                                    <div className='flex flex-row w-full items-center'>
                                        <label className="text-3xl w-36">아이디:</label>
                                        <div className="flex flex-row w-full mx-2 justify-between">
                                            <p className="text-4xl">{member.email}</p>
                                            <button
                                                onClick={() => router.push('/mypage/changepassword')}
                                                className="bg-yellow-6 text-white text-3xl rounded-xl p-2">비밀번호
                                                변경
                                            </button>
                                        </div>
                                    </div>

                                    {/* 한 줄 소개 */}
                                    <div className='flex flex-row w-full items-center'>
                                        <label className="text-3xl w-36">한 줄 소개:</label>
                                        <div className="flex flex-col w-full mx-2">
                                            <input
                                                id="description"
                                                className="block border border-yellow-6 p-2 rounded placeholder:text-2xl text-4xl"
                                                type="text"
                                                value={description.value}
                                                onChange={description.onChange}
                                                placeholder="새로운 한 줄 소개를 입력해주세요."
                                            />
                                            <p className="mx-1 text-gray-500">입력하지 않을 시, 내용은 유지됩니다.</p>
                                        </div>
                                    </div>

                                    {/* 위치 */}
                                    <div className='flex flex-row w-full items-center'>
                                        <label className="text-3xl w-36">주소:</label>
                                        <div className="flex flex-col w-full mx-2">
                                            <input
                                                id="address"
                                                className="block border border-yellow-6 p-2 rounded placeholder:text-2xl text-4xl"
                                                type="text"
                                                value={address.value}
                                                onChange={address.onChange}
                                                placeholder="새로운 주소를 입력해주세요."
                                            />
                                            <p className="mx-1 text-gray-500">입력하지 않을 시, 주소는 유지됩니다.</p>
                                        </div>
                                    </div>

                                    {/* 휴대전화 */}
                                    <div className='flex flex-row w-full items-center'>
                                        <label className="text-3xl w-36">휴대전화:</label>
                                        <div className="flex flex-col w-full mx-2">
                                            <input
                                                id="phoneNumber"
                                                className="block border border-yellow-6 p-2 rounded placeholder:text-2xl text-4xl"
                                                type="text"
                                                value={phoneNumber.value}
                                                onChange={phoneNumber.onChange}
                                                placeholder="새로운 휴대전화를 입력해주세요."
                                            />
                                            <p className="mx-1 text-gray-500">입력하지 않을 시, 휴대전화는 유지됩니다.</p>
                                        </div>
                                    </div>

                                    {/* 전화번호 */}
                                    <div className='flex flex-row w-full items-center'>
                                        <label className="text-3xl w-36">전화번호:</label>
                                        <div className="flex flex-col w-full mx-2">
                                            <input
                                                id="contactNumber"
                                                className="block border border-yellow-6 p-2 rounded placeholder:text-2xl text-4xl"
                                                type="text"
                                                value={contactNumber.value}
                                                onChange={contactNumber.onChange}
                                                placeholder="새로운 전화번호을 입력해주세요."
                                            />
                                            <p className="mx-1 text-gray-500">입력하지 않을 시, 전화번호는 유지됩니다.</p>
                                        </div>
                                    </div>

                                    {/* 경력 */}
                                    <ListenerCareerModify careerField={career} setCareerField={setCareer}/>

                                    {/* 학력 */}
                                    <ListenerEducationModify educationField={education}
                                                             setEducationField={setEducation}/>

                                    {/* 카테고리 */}
                                    <ListenerRegisterCategory selectedCategories={category}
                                                              setSelectedCategories={setCategory}/>

                                    {/* 상담가능시간 */}
                                    <div className='flex flex-row w-full items-center'>
                                        <label className="text-3xl w-36">상담<br/>가능 시간:</label>
                                        <div className='w-full flex flex-row gap-4 items-center justify-between'>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsModalOpen(true);
                                                    setActiveInput("start");
                                                }}
                                                className='border-2 w-[50%] p-4 rounded border-yellow-6 text-2xl'
                                            >
                                                {eventStart || "00:00"}
                                            </button>
                                            <FaArrowRight className='text-3xl'/>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsModalOpen(true);
                                                    setActiveInput("end");
                                                }}
                                                className='border-2 w-[50%] p-4 rounded border-yellow-6 text-2xl'
                                            >
                                                {eventEnd || "00:00"}
                                            </button>
                                        </div>
                                    </div>
                                    {isModalOpen && (<SelectTime onTimeSelect={handleTimeSelect} onClose={() => {
                                        setIsModalOpen(false);
                                        setActiveInput(null);
                                    }}/>)}

                                    <button
                                        className="bg-yellow-6 text-white text-3xl rounded-xl p-2 w-[25%] ml-auto"
                                        type="submit">프로필 수정
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>
                </article>
            )}
        </>
    );
}
