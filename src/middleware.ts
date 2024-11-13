import {getCookie} from "cookies-next";
import {NextRequest, NextResponse} from "next/server";

export default function middleware(request: NextRequest) {
    // 서버 요청 객체를 전달하여 토큰을 가져옵니다.
    const token = getCookie('accessToken', {req: request});
    const pathname = request.nextUrl.pathname;

    {/* 로그인 시, 로그인 페이지 접근 제한 */}
    if (token && pathname.startsWith(`/auth/login`)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    {/* 로그인 시, 회원가입 페이지 접근 제한 */}
    if (token && pathname.startsWith(`/auth/signup`)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    {/* 비로그인 시, 위로받기 기능 제한 */}
    if (!token && pathname.startsWith(`/comforts`)) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    {/* 비로그인 시, 위로받기 기능 제한 */}
    if (!token && pathname.startsWith(`/community/register`)) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    {/* 비로그인 시, 위로받기 기능 제한 */}
    if (!token && pathname.startsWith(`/mypage`)) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    if (!token && pathname.startsWith(`/chat`)) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

}
