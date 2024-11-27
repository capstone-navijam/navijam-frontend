"use client";
import React from 'react';
import Carousel from "react-material-ui-carousel";
import {FaArrowCircleLeft, FaArrowCircleRight} from "react-icons/fa";
import {FaCircleArrowRight} from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import {useMobile, usePC, useTabletHeight} from "@/service/MediaQuery"; // 반응형 미디어 쿼리 사용

export default function MultiCarousel() {
    const isTabletHeight = useTabletHeight();

    const items = [
        {
            id: 1,
            description: "당신의 하루를 온전히\n마무리 할 수 있도록 도와줄게요.",
            button: '위로받기',
            path: 'comforts',
            image: '/images/carouselImage1.svg',
        },
        {
            id: 2,
            description: "당신의 대화를 들어줄\n나비잠 멘토를 소개할게요.",
            button: '나비잠 멘토',
            path: 'listeners',
            image: '/images/carouselImage2.svg',
        },
        {
            id: 3,
            description: "여러 사람들과\n자유롭게 이야기 나눠보아요.",
            button: '커뮤니티',
            path: 'community',
            image: '/images/carouselImage3.svg',
        },
        {
            id: 4,
            description: "전문적인 상담이 필요하다면,\n주저말고 언제든 상담해보세요.",
            button: '실시간 상담',
            path: 'chat',
            image: '/images/carouselImage4.svg',
        },
        {
            id: 5,
            description: "수없이 많은 별들 중\n가장 빛나는 별은바로 너야",
            button: '마이페이지',
            path: 'mypage',
            image: '/images/carouselImage5.svg',
        },
    ]

    return (
        <div className='-mt-2'>
            <Carousel
                className='bg-yellow-2 rounded-lg text-white items-center '
                NextIcon={<FaArrowCircleRight/>}
                PrevIcon={<FaArrowCircleLeft/>}
                indicators
                indicatorIconButtonProps={{
                    style: {
                        textAlign: 'left',
                        padding: '5px',
                        marginBottom: '4px'
                    }
                }}
                autoPlay
                animation={"slide"}
                duration={500}
            >
                {items.map((e) => (
                    <div key={e.id}
                         className={`flex ${isTabletHeight ? 'flex-col' : 'flex-row'} items-center justify-between mx-8 mt-8 relative`}>
                        <div className='gap-2 flex flex-col mx-auto'>
                            <Link href={`/${e.path}`}
                                  className={`rounded-3xl p-1 flex items-center gap-1 font-bold ${isTabletHeight ? 'text-2xl' : 'text-4xl'}`}>
                                {e.button}
                                <FaCircleArrowRight className='mx-1'/>
                            </Link>
                            <p className={`${isTabletHeight ? 'text-4xl' : 'text-6xl'} whitespace-pre-wrap`}>
                                {e.description}
                            </p>
                        </div>
                        <Image src={e.image} alt="Image" width={300} height={300}
                             className={isTabletHeight ? 'h-[400px] w-[600px]' : 'h-[500px] w-[700px] '}/>
                    </div>
                ))}
            </Carousel>
        </div>
    );

}
