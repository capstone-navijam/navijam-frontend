import {getCookie} from "cookies-next";

export interface MyPageListenerProfileProps {
    id: string,
    profile: string,
    nickname: string,
    address: string,
    career: string[],
    education: string[],
    description: string,
    phoneNumber: string,
    contactNumber: string,
    category: string[],
    availableTime: string[],
    email: string,
    formattedPrice: string,
}

export interface MyPageListenerConsoleProps {
    id: string,
    categories: string[],
    title: string,
    timestamp: string,
}

export async function ListenerProfile(): Promise<MyPageListenerProfileProps | null> {
    const token = getCookie('accessToken');

    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/mypage/profile/listener`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    if (res.ok) {
        const result = await res.json();
        return {
            id: result.data.id,
            nickname: result.data.nickname,
            profile: result.data.profile,
            address: result.data.address,
            career: result.data.career,
            education: result.data.education,
            description: result.data.description,
            phoneNumber: result.data.phoneNumber,
            contactNumber: result.data.contactNumber,
            category: result.data.category,
            availableTime: result.data.availableTime,
            email: result.data.email,
            formattedPrice: result.data.formattedPrice,
        }
    } else {
        console.error('응답 실패');
        return null;
    }
}

export async function ListenerConsole(): Promise<MyPageListenerConsoleProps | null> {
    const token = getCookie('accessToken');

    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/mypage/comforts/no-answered`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    if (res.ok) {
        const result = await res.json();
        return result.data.map((item: any) => ({
            id: item.id,
            categories: item.categories,
            title: item.title,
            timestamp: item.timestamp,
        }));
    }
}