'use client';

import useInput from '@/service/useInput';
import React, {useState} from 'react';
import {useRouter} from 'next/navigation'
import ListenerRegisterCategory from '@/app/components/Register/ListenerRegisterCategory';
import ListenerRegisterCareer from "@/app/components/Register/ListenerRegisterCareer";
import AuthCheckNickName from "@/app/components/authcheck/AuthCheckNickName";
import AuthCheckEmail from "@/app/components/authcheck/AuthCheckEmail";
import Swal from "sweetalert2";
import ImageRegister from "@/app/components/Register/ImageRegister";
import ListenerRegisterEducation from "@/app/components/Register/ListenerRegisterEducation";
import {useMobile, useTablet} from "@/service/MediaQuery";

export default function SignUpPage() {

    const isTablet = useTablet();

    const [profileURL, setProfileURL] = useState<string>('');

    const email = useInput('')
    const nickname = useInput('')
    const password = useInput('')
    const checkPassword = useInput('');
    const contactNumber = useInput('');
    const phoneNumber = useInput('');
    const address = useInput('');

    const [careerField, setCareerField] = useState<string[]>([]);
    const [educationField, setEducationField] = useState<string[]>([]);

    const description = useInput('');

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const [nicknameValid, setNickNameValid] = useState<boolean | null>(null);
    const [nicknameMessage, setNicknameMessage] = useState<string>('');

    const [emailValid, setEmailValid] = useState<boolean | null>(null);
    const [emailMessage, setEmailMessage] = useState<string>('');

    const router = useRouter();

    const handleImageUpload = (data: string) => {
        setProfileURL(data);
    }

    const handleCheckNickname = async () => {
        if (nickname.value.length > 0) {
            try {
                const result = await AuthCheckNickName(nickname.value);
                if (result) {
                    if (result.result) {
                        setNickNameValid(false);
                        setNicknameMessage('이미 사용 중인 닉네임입니다.');
                    } else {
                        setNickNameValid(true);
                        setNicknameMessage('사용 가능한 닉네임입니다.');
                    }
                } else {
                    alert("서버에서 오류가 발생했습니다.");
                }
            } catch (error) {
                console.error("닉네임 중복 체크 중 오류 발생:", error);
                alert("닉네임 중복 체크 중 오류가 발생했습니다.");
            }
        }
    };

    const handleCheckEmail = async () => {
        if (email.value.length > 0) {
            try {
                const result = await AuthCheckEmail(email.value);
                if (result) {
                    if (result.result) {
                        setEmailValid(false);
                        setEmailMessage('이미 사용 중인 이메일입니다.');
                    } else {
                        setEmailValid(true);
                        setEmailMessage('사용 가능한 이메일입니다.');
                    }
                } else {
                    alert("서버에서 오류가 발생했습니다.");
                }
            } catch (error) {
                console.error("닉네임 중복 체크 중 오류 발생:", error);
                alert("닉네임 중복 체크 중 오류가 발생했습니다.");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            email: email.value,
            nickname: nickname.value,
            password: password.value,
            checkPassword: checkPassword.value,
            contactNumber: contactNumber.value,
            phoneNumber: phoneNumber.value,
            address: address.value,
            career: careerField,
            education: educationField,
            description: description.value,
            category: selectedCategories,
            profile: profileURL,
        };

        const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/auth/listeners`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(formData),
        })

        if (res.status === 201) {
            Swal.fire({icon: 'success', title: '회원가입 성공', text: '회원가입되었습니다.', timer: 2000}).then(() => {
                router.replace('/auth/login');
            });
        } else {
            Swal.fire({icon: 'error', title: '회원가입 실패', text: '다시 확인해주세요.'});
        }
    }

    return (
        <>
            {isTablet ? (
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col h-full mt-10 w-full mx-auto text-nowrap">
                        <div className="px-6 py-8 rounded border-yellow-6 border-2 shadow-xl text-black w-full">
                            <h2 className="font-semibold text-4xl text-center mb-4">
                                <span className="text-yellow-6">상담사</span> 회원가입
                            </h2>
                            <div className="flex flex-col">
                                <div className="w-full mt-1 border-[1px] border-lightGray/30"></div>
                                <p className="text-2xl mt-1 self-end"><span className="text-red-500">*</span> 은 필수 항목입니다.</p>
                            </div>
                            <div className="gap-8 mt-2 flex flex-col">
                                <div className="flex flex-col items-center gap-2">
                                    <ImageRegister ImageUrl={handleImageUpload} />
                                    <label htmlFor="profileImage" className="text-4xl text-center font-semibold w-fit">프로필 설정</label>
                                </div>

                                <div className="flex flex-col gap-12 w-full">
                                    <div className="flex items-center">
                                        <label htmlFor="email" className="text-2xl font-semibold w-40 text-wrap">아이디<br/>(이메일)<span className="text-red-500">*</span></label>
                                        <div className="w-full">
                                            <div className="flex items-center gap-1">
                                                <input className="block border border-yellow-6 p-5 w-full rounded placeholder:text-lg" type="text" {...email} placeholder="아이디를 입력해주세요" />
                                                <button type="button" onClick={handleCheckEmail} className="border p-4 text-2xl rounded border-yellow-6  hover:bg-yellow-6 hover:text-white">중복 확인</button>
                                            </div>
                                            <span className={`${emailValid === false ? 'text-red-500 text-2xl' : 'text-green-500 text-2xl'}`}>{emailMessage}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <label htmlFor="password" className="text-2xl font-semibold w-40 text-wrap">비밀번호<span className="text-red-500">*</span></label>
                                        <input id="password" className="block border border-yellow-6 p-5 w-full rounded placeholder:text-lg" type="password" {...password} placeholder="비밀번호를 입력해주세요(영여/숫자/특수문자 1개씩 필수 입력)" />
                                    </div>

                                    <div className="flex items-center">
                                        <label htmlFor="checkPassword" className="text-2xl font-semibold w-40 text-wrap">비밀번호<br/>재확인<span className="text-red-500">*</span></label>
                                        <input id="checkPassword" className="block border border-yellow-6 p-5 w-full rounded placeholder:text-lg" type="password" {...checkPassword} placeholder="비밀번호를 다시 입력해주세요" />
                                    </div>

                                    <div className="flex items-center">
                                        <label htmlFor="userName" className="text-2xl font-semibold w-40 text-wrap">닉네임<span className="text-red-500">*</span></label>
                                        <div className="w-full">
                                            <div className="flex items-center gap-2">
                                                <input id="userName" className="block border border-yellow-6 p-5 w-full rounded placeholder:text-lg" type="text" {...nickname} placeholder="닉네임을 입력해주세요" />
                                                <button type="button" onClick={handleCheckNickname} className="border p-4 text-2xl rounded border-yellow-6  hover:bg-yellow-6 hover:text-white">중복 확인</button>
                                            </div>
                                            <span className={`${nicknameValid === false ? 'text-red-500 text-2xl' : 'text-green-500 text-2xl'}`}>{nicknameMessage}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <label htmlFor="phoneNumber" className="text-2xl font-semibold w-40 text-wrap">휴대전화</label>
                                        <input id="phoneNumber" className="block border border-yellow-6 p-5 w-full rounded placeholder:text-lg" type="text" {...phoneNumber} placeholder="하이픈(-) 붙여서 휴대전화를 입력해주세요" />
                                    </div>

                                    <div className="flex items-center">
                                        <label htmlFor="contactNumber" className="text-2xl font-semibold w-40 text-wrap">전화번호</label>
                                        <input id="contactNumber" className="block border border-yellow-6 p-5 w-full rounded placeholder:text-lg" type="text" {...contactNumber} placeholder="하이픈(-) 붙여서 전화번호를 입력해주세요" />
                                    </div>

                                    <div className="flex items-center">
                                        <label htmlFor="address" className="text-2xl font-semibold w-40 text-wrap">주소</label>
                                        <input id="address" className="block border border-yellow-6 p-5 w-full rounded placeholder:text-lg" type="text" {...address} placeholder="주소를 입력해주세요" />
                                    </div>

                                    <ListenerRegisterCareer careerField={careerField} setCareerField={setCareerField} />
                                    <ListenerRegisterEducation educationField={educationField} setEducationField={setEducationField} />

                                    <div className="flex items-center">
                                        <ListenerRegisterCategory selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
                                    </div>

                                    <div className="flex items-center">
                                        <label htmlFor="description" className="text-2xl font-semibold w-40 text-wrap">한줄소개</label>
                                        <input id="description" className="block border border-yellow-6 p-5 w-full rounded placeholder:text-lg" type="text" {...description} placeholder="간단하게 한 줄로 소개 부탁드립니다." />
                                    </div>
                                </div>
                            </div>
                            <button className="w-full mt-12 bg-yellow-400 text-center h-24 rounded text-black text-5xl font-[Tenada] hover:scale-105 hover:bg-yellow-500 items-center" type="submit">가입하기</button>
                        </div>
                    </div>
                </form>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col h-full mt-10 w-[60%] mx-auto text-nowrap">
                        <div className="px-6 py-8 rounded border-yellow-6 border-2 shadow-xl text-black w-full">
                            <h2 className="font-semibold text-7xl text-center mb-4">
                                <span className="text-yellow-6">상담사</span> 회원가입
                            </h2>
                            <div className="flex flex-col">
                                <div className="w-full mt-1 border-[1px] border-lightGray/30"></div>
                                <p className="text-2xl mt-1 self-end"><span className="text-red-500">*</span> 은 필수 항목입니다.</p>
                            </div>
                            <div className="gap-8 mt-2 flex flex-col">
                                <div className="flex flex-col items-center gap-2">
                                    <ImageRegister ImageUrl={handleImageUpload} />
                                    <label htmlFor="profileImage" className="text-4xl text-center font-semibold w-fit">프로필 설정</label>
                                </div>

                                <div className="flex flex-col gap-12 w-full">
                                    <div className="flex items-center">
                                        <label htmlFor="email" className="text-3xl font-semibold w-40 text-wrap">아이디<br/>(이메일)<span className="text-red-500">*</span></label>
                                        <div className="w-full">
                                            <div className="flex items-center gap-1">
                                                <input className="block border border-yellow-6 p-5 w-full rounded placeholder:text-xl text-2xl" type="text" {...email} placeholder="아이디를 입력해주세요" />
                                                <button type="button" onClick={handleCheckEmail} className="border p-5 text-2xl rounded border-yellow-6  hover:bg-yellow-6 hover:text-white">중복 확인</button>
                                            </div>
                                            <span className={`${emailValid === false ? 'text-red-500 text-2xl' : 'text-green-500 text-2xl'}`}>{emailMessage}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <label htmlFor="password" className="text-3xl font-semibold w-40 text-wrap">비밀번호<span className="text-red-500">*</span></label>
                                        <input id="password" className="block border border-yellow-6 p-5 w-full rounded placeholder:text-xl text-2xl" type="password" {...password} placeholder="비밀번호를 입력해주세요(영여/숫자/특수문자 1개씩 필수 입력)" />
                                    </div>

                                    <div className="flex items-center">
                                        <label htmlFor="checkPassword" className="text-3xl font-semibold w-40 text-wrap">비밀번호<br/>재확인<span className="text-red-500">*</span></label>
                                        <input id="checkPassword" className="block border border-yellow-6 p-5 w-full rounded placeholder:text-xl text-2xl" type="password" {...checkPassword} placeholder="비밀번호를 다시 입력해주세요" />
                                    </div>

                                    <div className="flex items-center">
                                        <label htmlFor="userName" className="text-3xl font-semibold w-40 text-wrap">닉네임<span className="text-red-500">*</span></label>
                                        <div className="w-full">
                                            <div className="flex items-center gap-2">
                                                <input id="userName" className="block border border-yellow-6 p-5 w-full rounded placeholder:text-xl text-2xl" type="text" {...nickname} placeholder="닉네임을 입력해주세요" />
                                                <button type="button" onClick={handleCheckNickname} className="border p-5 text-2xl rounded border-yellow-6  hover:bg-yellow-6 hover:text-white">중복 확인</button>
                                            </div>
                                            <span className={`${nicknameValid === false ? 'text-red-500 text-2xl' : 'text-green-500 text-2xl'}`}>{nicknameMessage}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <label htmlFor="phoneNumber" className="text-3xl font-semibold w-40 text-wrap">휴대전화</label>
                                        <input id="phoneNumber" className="block border border-yellow-6 p-5 w-full rounded placeholder:text-xl text-2xl" type="text" {...phoneNumber} placeholder="하이픈(-) 붙여서 휴대전화를 입력해주세요" />
                                    </div>

                                    <div className="flex items-center">
                                        <label htmlFor="contactNumber" className="text-3xl font-semibold w-40 text-wrap">전화번호</label>
                                        <input id="contactNumber" className="block border border-yellow-6 p-5 w-full rounded placeholder:text-xl text-2xl" type="text" {...contactNumber} placeholder="하이픈(-) 붙여서 전화번호를 입력해주세요" />
                                    </div>

                                    <div className="flex items-center">
                                        <label htmlFor="address" className="text-3xl font-semibold w-40 text-wrap">주소</label>
                                        <input id="address" className="block border border-yellow-6 p-5 w-full rounded placeholder:text-xl text-2xl" type="text" {...address} placeholder="주소를 입력해주세요" />
                                    </div>

                                    <ListenerRegisterCareer careerField={careerField} setCareerField={setCareerField} />
                                    <ListenerRegisterEducation educationField={educationField} setEducationField={setEducationField} />

                                    <div className="flex items-center">
                                        <ListenerRegisterCategory selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
                                    </div>

                                    <div className="flex items-center">
                                        <label htmlFor="description" className="text-3xl font-semibold w-40 text-wrap">한줄소개</label>
                                        <input id="description" className="block border border-yellow-6 p-5 w-full rounded placeholder:text-xl" type="text" {...description} placeholder="간단하게 한 줄로 소개 부탁드립니다." />
                                    </div>
                                </div>
                            </div>
                            <button className="w-full mt-12 bg-yellow-400 text-center h-24 rounded text-black text-5xl font-[Tenada] hover:scale-105 hover:bg-yellow-500 items-center" type="submit">가입하기</button>
                        </div>
                    </div>
                </form>
            )}
        </>
    );

};
