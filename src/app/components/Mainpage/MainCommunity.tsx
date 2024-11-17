'use client';
import React, {useEffect, useState} from 'react';
import CommunityListAll, {CommunityListProps} from "@/app/components/Community/CommunityListAll";
import {FaArrowCircleLeft, FaArrowCircleRight, FaRegCommentAlt} from "react-icons/fa";
import Carousel from "react-material-ui-carousel";
import {useRouter} from "next/navigation";
import Image from 'next/image'
import {useTablet} from "@/service/MediaQuery";
import CommunityLikesCount from "@/app/components/Community/CommunityLikesCount";

export default function MainCommunity() {

    const [mainCommunity, setMainCommunity] = useState<CommunityListProps[]>([]);
    const router = useRouter();
    const isTablet = useTablet();

    useEffect(() => {
        const fetchMainCommunity = async () => {
            try {
                const data = await CommunityListAll();
                setMainCommunity(data);
            } catch (err) {
                console.error('커뮤니티 게시글을 불러오는 데 실패했습니다.')
            }
        }
        fetchMainCommunity();
    }, []);

    const handleDetailClick = (id: string) => {
        router.push(`/community/${id}`);
    }

    return (
        <>{isTablet ? (<>
            <section className="mt-12">
                <div className='flex flex-col items-center text-center'>
                    <h1 className='font-semibold text-yellow-6 text-5xl mb-4 mt-12'>같이 소통해요</h1>
                    <p className='text-3xl'>비슷한 고민을 가진 사람들과 대화를 나눠보세요.</p>
                </div>

                <Carousel
                    className={`rounded-lg mt-10 h-auto mx-auto bg-yellow-2 p-8 w-[80%] flex flex-col items-center`}
                    NextIcon={<FaArrowCircleRight/>}
                    PrevIcon={<FaArrowCircleLeft/>}
                    indicators={false}
                    autoPlay
                    animation={"slide"}
                    duration={500}
                >
                    {mainCommunity.map((community) => (
                        <div key={community.id}
                             onClick={() => handleDetailClick(community.id)}
                        >
                            <p className='w-[95%] mx-auto overflow-hidden overflow-ellipsis whitespace-nowrap text-white text-2xl'>
                                <span className='text-start'>인기있는 사연 👀 | </span>{community.content}</p>
                        </div>
                    ))}
                </Carousel>
                <div className='w-[80%] mx-auto mt-12 mb-12'>
                    <p className='text-4xl font-medium mb-4'>최근 등록된 커뮤니티</p>
                    <div className='flex flex-col gap-4'>
                        {mainCommunity.map((community) => (
                            <div key={community.id}
                                 onClick={() => handleDetailClick(community.id)}
                                 className='relative flex flex-col border-4 w-full h-[380px] rounded-3xl border-yellow-2 p-2 overflow-hidden'
                            >
                                <div className='flex justify-between items-center'>
                                    <div className='flex flex-row gap-2'>
                                        <p className='text-4xl font-bold'>{community.title}</p>
                                        <p className='text-2xl text-yellow-2 content-end mt-1'>{community.categories.join(', ')}</p>
                                    </div>
                                    <Image src={community.profile} alt="Profile Image" width={100} height={100}
                                           className="rounded-full w-[50px] h-[50px]"/>
                                </div>
                                <div className="w-full mt-2 mb-2 border-[2px] border-lightGray/30"></div>
                                <p className='whitespace-pre-wrap leading-normal h-[220px] text-3xl overflow-hidden mt-1'>{community.content}</p>
                                <div className='absolute bottom-4 left-4 flex flex-row gap-4 text-3xl'>
                                    <CommunityLikesCount communityId={community.id} initialLiked={community.liked}
                                                         initialLikeCount={community.likeCount}/>
                                    <FaRegCommentAlt className='text-yellow-2'/>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>

            </section>
        </>) : (
            <>
                <section className="mt-12">
                    <div className='flex flex-col items-center text-center'>
                        <h1 className='font-semibold text-yellow-6 text-7xl mb-4 mt-12'>같이 소통해요</h1>
                        <p className='text-3xl'>비슷한 고민을 가진 사람들과 대화를 나눠보세요.</p>
                    </div>

                    <Carousel
                        className={`rounded-lg mt-10 h-auto mx-auto bg-yellow-2 p-8 w-[80%] flex flex-col items-center`}
                        NextIcon={<FaArrowCircleRight/>}
                        PrevIcon={<FaArrowCircleLeft/>}
                        indicators={false}
                        autoPlay
                        animation={"slide"}
                        duration={500}
                    >
                        {mainCommunity.map((community) => (
                            <div key={community.id}
                                 onClick={() => handleDetailClick(community.id)}
                            >
                                <p className='w-[95%] mx-auto overflow-hidden overflow-ellipsis whitespace-nowrap text-white text-2xl'>
                                    <span className='text-start text-3xl'>인기있는 사연 👀 | </span>{community.content}</p>
                            </div>
                        ))}
                    </Carousel>
                    <div className='w-[80%] mx-auto mt-12 mb-12'>
                        <p className='text-5xl font-medium mb-8'>최근 등록된 커뮤니티</p>
                        <div className='flex flex-row gap-4'>
                            {mainCommunity.map((community) => (
                                <div key={community.id}
                                     className='relative flex flex-col border-4 w-[33%] h-[500px] rounded-3xl border-yellow-2 p-2'
                                >
                                    <div className='flex flex-col'
                                         onClick={() => handleDetailClick(community.id)}>
                                        <div className='flex flex-col '>
                                            <Image src={community.profile} alt="Profile Image" width={100} height={100}
                                                   className="rounded-full w-[50px] h-[50px]"/>
                                            <p className='text-4xl font-bold overflow-hidden text-ellipsis whitespace-nowrap'>{community.title}</p>
                                            <p className='text-2xl text-yellow-2 mt-1'>{community.categories.join(', ')}</p>
                                        </div>
                                        <p className='whitespace-pre-wrap leading-normal h-[278px] text-3xl mt-2 overflow-hidden'>{community.content}</p>
                                    </div>
                                    <div className='absolute bottom-4 left-4 flex flex-row gap-4 text-3xl'>
                                        <CommunityLikesCount communityId={community.id} initialLiked={community.liked}
                                                             initialLikeCount={community.likeCount}/>
                                        <FaRegCommentAlt className='text-yellow-2'/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </section>
            </>
        )}
        </>);
}


/*
*   <section className='mt-12 flex flex-col items-center text-center'>
            <div className="w-[64%] mt-1 mb-10 border-[2px] border-lightGray/30"></div>

            <div className='w-[60%] mt-14'>
                <div className='justify-between flex text-center items-center'>
                    <p className='text-2xl'>전문가의 조언</p>
                    <Link href='counselors' className='text-yellow-2'>전체보기</Link>
                </div>
                <div className='flex gap-6 mt-10'>
                    <div className='shadow-lg rounded-lg border-yellow-6 border-2 h-[30vh] w-full bg-white'>본문 내용</div>
                    <div className='shadow-lg rounded-lg border-yellow-6 border-2 h-[30vh] w-full bg-white'>본문 내용</div>
                    <div className='shadow-lg rounded-lg border-yellow-6 border-2 h-[30vh] w-full bg-white'>본문 내용</div>
                </div>
            </div>
        </section>
        * */