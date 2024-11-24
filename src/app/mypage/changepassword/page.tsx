'use client'
import React, {useState} from 'react';
import useInput from "@/service/useInput";
import {getCookie} from "cookies-next";
import {useRouter} from "next/navigation";
import Swal from "sweetalert2";
import {useTabletHeight} from "@/service/MediaQuery";

export default function ChangePassword() {

    const isTabletHeight = useTabletHeight();

    const newPassword = useInput('');
    const checkPassword = useInput('');
    const router = useRouter();

    // 자동입력 방지문자 상태
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaVerified, setCaptchaVerified] = useState(null); // null: 초기 상태, true: 일치, false: 불일치

    // 랜덤 문자열 생성 함수
    function generateCaptcha() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return Array.from({length: 6})
            .map(() => chars[Math.floor(Math.random() * chars.length)])
            .join('');
    }

    // CAPTCHA 검증 함수
    const verifyCaptcha = () => {
        if (captcha === captchaInput) {
            setCaptchaVerified(true);
        } else {
            setCaptchaVerified(false);
            setCaptcha(generateCaptcha()); // 새로운 CAPTCHA 생성
            setCaptchaInput(''); // 입력 초기화
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!captchaVerified) {
            Swal.fire({
                title: "자동입력 방지문자를 확인해주세요.",
                icon: "warning",
                timer: 1000,
            });
            return;
        }

        const token = getCookie('accessToken');

        const formData = {
            newPassword: newPassword.value,
            checkPassword: checkPassword.value,
        };

        try {
            const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/mypage/profile/password`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                Swal.fire({
                    title: "변경 완료!",
                    text: "변경되었습니다.",
                    icon: "success",
                    timer: 1000,
                });
                router.push(`/mypage`);
            } else {
                Swal.fire({
                    title: "잘못된 비밀번호입니다.",
                    text: "다시 시도해주세요.",
                    icon: "error",
                    timer: 1000,
                });
            }
        } catch (err) {
            console.error('비밀번호 수정 중 오류 발생');
        }
    };

    return (
        <>{isTabletHeight ? (<>
            <form
                onSubmit={handleSubmit}
                className="border-4 border-yellow-2 w-[95%] h-[810px] mx-auto flex flex-col mt-24 mb-24 rounded-3xl"
            >
                <h1 className="text-5xl p-4 font-bold">비밀번호 변경</h1>
                <div className="flex items-center mt-20 mb-5">
                    <label
                        htmlFor="newPassword"
                        className="text-2xl font-semibold w-40 text-wrap p-2 mx-2"
                    >
                        새 비밀번호
                    </label>
                    <input
                        id="newPassword"
                        className="block border border-yellow-6 p-5 w-[75%] rounded placeholder:text-lg"
                        type="password"
                        {...newPassword}
                        placeholder="새로운 비밀번호를 입력해주세요."
                    />
                </div>

                <div className="flex items-center mt-5 mb-10">
                    <label
                        htmlFor="checkPassword"
                        className="text-2xl font-semibold w-40 text-wrap p-2 mx-2"
                    >
                        비밀번호<br/>재확인
                    </label>
                    <input
                        id="checkPassword"
                        className="block border border-yellow-6 p-5 w-[75%] rounded placeholder:text-lg"
                        type="password"
                        {...checkPassword}
                        placeholder="비밀번호를 다시 입력해주세요"
                    />
                </div>

                {/* 자동입력 방지문자 */}
                <div className="h-auto flex flex-row w-full mx-auto p-5 justify-between gap-4 mb-16">
                    <div className="flex flex-col w-[50%]">
                        <h2 className="text-2xl font-semibold mb-4">자동입력 방지문자</h2>
                        <div className="bg-gray-200 text-3xl font-bold p-4 rounded-lg w-full">
                            {captcha}
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <div className='flex flex-row w-full h-[80px] gap-2 mt-8'>
                            <input
                                className={`block border p-3 rounded mt-4 placeholder:text-lg w-[80%] ${
                                    captchaVerified === false ? 'border-red-500' : 'border-yellow-6'
                                }`}
                                type="text"
                                value={captchaInput}
                                onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                                placeholder="문자를 입력하세요"
                            />
                            <button
                                type="button"
                                onClick={verifyCaptcha}
                                className="bg-yellow-2 text-white text-2xl rounded-xl p-2 mt-3 w-[20%]"
                            >
                                확인
                            </button>
                        </div>
                        {captchaVerified === false && (
                            <p className="text-red-500 text-lg mt-2">
                                인증문자와 일치하지 않습니다.
                            </p>
                        )}
                        {captchaVerified === true && (
                            <p className="text-green-500 text-lg mt-2">
                                인증문자와 일치합니다.
                            </p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-[95%] mx-auto text-4xl bg-yellow-2 border border-yellow-2 rounded-xl p-3 mt-2 mb-2 text-white"
                >
                    확인
                </button>
                <button
                    type="button"
                    onClick={() => router.push(`/mypage`)}
                    className="w-[95%] mx-auto text-4xl bg-white border border-yellow-2 rounded-xl p-3 mt-2 mb-4"
                >
                    취소
                </button>
            </form>
        </>) : (<>
            <form
                onSubmit={handleSubmit}
                className="border-4 border-yellow-2 w-[40%] h-[805px] mx-auto flex flex-col mt-10 mb-10 rounded-3xl"
            >
                <h1 className="text-5xl p-4 font-bold">비밀번호 변경</h1>
                <div className="flex items-center mt-20 mb-5">
                    <label
                        htmlFor="newPassword"
                        className="text-2xl font-semibold w-40 text-wrap p-2 mx-2"
                    >
                        새 비밀번호
                    </label>
                    <input
                        id="newPassword"
                        className="block border border-yellow-6 p-5 w-[75%] rounded placeholder:text-lg"
                        type="password"
                        {...newPassword}
                        placeholder="새로운 비밀번호를 입력해주세요."
                    />
                </div>

                <div className="flex items-center mt-5 mb-10">
                    <label
                        htmlFor="checkPassword"
                        className="text-2xl font-semibold w-40 text-wrap p-2 mx-2"
                    >
                        비밀번호<br/>재확인
                    </label>
                    <input
                        id="checkPassword"
                        className="block border border-yellow-6 p-5 w-[75%] rounded placeholder:text-lg"
                        type="password"
                        {...checkPassword}
                        placeholder="비밀번호를 다시 입력해주세요"
                    />
                </div>

                {/* 자동입력 방지문자 */}
                <div className="h-auto flex flex-row w-full mx-auto p-5 justify-between gap-4 mb-16">
                    <div className="flex flex-col w-[50%]">
                        <h2 className="text-2xl font-semibold mb-4">자동입력 방지문자</h2>
                        <div className="bg-gray-200 text-3xl font-bold p-4 rounded-lg w-full">
                            {captcha}
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <div className='flex flex-row w-full h-[80px] gap-2 mt-8'>
                            <input
                                className={`block border p-3 rounded mt-4 placeholder:text-lg w-[80%] ${
                                    captchaVerified === false ? 'border-red-500' : 'border-yellow-6'
                                }`}
                                type="text"
                                value={captchaInput}
                                onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                                placeholder="문자를 입력하세요"
                            />
                            <button
                                type="button"
                                onClick={verifyCaptcha}
                                className="bg-yellow-2 text-white text-2xl rounded-xl p-2 mt-3 w-[20%]"
                            >
                                확인
                            </button>
                        </div>
                        {captchaVerified === false && (
                            <p className="text-red-500 text-lg mt-2">
                                인증문자와 일치하지 않습니다.
                            </p>
                        )}
                        {captchaVerified === true && (
                            <p className="text-green-500 text-lg mt-2">
                                인증문자와 일치합니다.
                            </p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-[95%] mx-auto text-4xl bg-yellow-2 border border-yellow-2 rounded-xl p-3 mt-2 mb-2 text-white"
                >
                    확인
                </button>
                <button
                    type="button"
                    onClick={() => router.push(`/mypage`)}
                    className="w-[95%] mx-auto text-4xl bg-white border border-yellow-2 rounded-xl p-3 mt-2 mb-4"
                >
                    취소
                </button>
            </form>
        </>)}
        </>
    );
}
