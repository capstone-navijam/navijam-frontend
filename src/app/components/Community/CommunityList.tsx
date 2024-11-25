'use client';

import React, {useEffect, useState} from 'react';
import CommunityListAll, {CommunityListProps} from "@/app/components/Community/CommunityListAll";
import Pagination from "@mui/material/Pagination";
import Image from "next/image";
import {FaRegCommentAlt} from "react-icons/fa";
import {useTabletHeight} from "@/service/MediaQuery";
import CommunityLikesCount from "@/app/components/Community/CommunityLikesCount";
import Link from 'next/link';
import CommunitySearch from "@/app/components/Community/CommunitySearch";
import {useCustomSearchParams} from "@/service/useCustomSearchParams";

export default function CommunityList() {
    const isTabletHeight = useTabletHeight();
    const {searchParams} = useCustomSearchParams();

    const [communities, setCommunities] = useState<CommunityListProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [communitiesPerPage] = useState(20);

    const handlePageChange = (e: any, page: number) => {
        setCurrentPage(page);
    }

    const currentCommunities = communities
        .filter((community) => {
            const query = searchParams.query?.toLowerCase() || "";
            return (
                community.title.toLowerCase().includes(query) ||
                community.categories.some((category: string) => category.toLowerCase().includes(query))
            );
        })
        .slice((currentPage - 1) * communitiesPerPage, currentPage * communitiesPerPage);

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const data = await CommunityListAll();
                setCommunities(data);
            } catch (err) {
                console.error("커뮤니티 게시글을 불러오는 데 실패했습니다.")
            }
        };
        fetchCommunities();
    }, []);

    return (
        <>
            {isTabletHeight ? (
                <section>
                    <div className={`grid grid-cols-2 justify-center w-[95%] mx-auto mt-10 gap-4`}>
                        {currentCommunities.map((community, index) => (

                            <Link key={community.id} href={`/community/${community.id}`}
                                  as={`/community/${community.id}`}>
                                <div key={community.id}
                                     className="relative border-2 border-yellow-6 rounded-3xl p-4 cursor-pointer w-full h-[300px]">
                                    <div className='flex flex-row items-center mt-2 justify-between'>
                                        <p className="font-bold text-2xl whitespace-nowrap overflow-hidden text-ellipsis w-[70%]">{community.title}</p>
                                        <div className='flex flex-row gap-2 items-center'>
                                            <p className='text-2xl'>{community.nickname}</p>
                                            <Image src={community.profile} alt="Profile Image" width={400} height={400}
                                                   className='w-[40px] h-[40px] rounded-full'/>
                                        </div>
                                    </div>
                                    <p className="text-yellow-2 text-xl">{community.categories.join(', ')}</p>
                                    <p className="text-2xl truncate mt-2 whitespace-pre-wrap overflow-hidden h-[125px]">{community.content}</p> {/* 긴 내용은 잘라냅니다 */}

                                    <div
                                        className='absolute bottom-2 left-2 w-full flex flex-row justify-between  text-2xl'>
                                        <div className='flex flex-row gap-4'>
                                            <CommunityLikesCount communityId={community.id}
                                                                 initialLiked={community.liked}
                                                                 initialLikeCount={community.likeCount}/>
                                            <FaRegCommentAlt className='text-yellow-2'/>
                                        </div>
                                        <p className='text-xl mx-6'>{community.timestamp}</p>

                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="flex justify-center mt-8 mb-10">
                        <Pagination
                            count={Math.ceil(communities.length / communitiesPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                        />
                    </div>
                </section>) : (<section className='flex flex-row mt-10 mb-10'>
                <CommunitySearch placeholder="검색하기"/>
                <div className="w-[67.5%] mx-20 flex-col flex">
                    {currentCommunities.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 justify-center gap-16">
                                {currentCommunities.map((community, index) => (

                                    <Link href={`/community/${community.id}`} as={`/community/${community.id}`}>
                                        <div key={community.id}
                                             className="relative border-2 border-yellow-6 rounded-3xl p-4 cursor-pointer w-full h-[400px]">
                                            <div className='flex flex-row items-center mt-2 justify-between'>
                                                <p className="font-bold text-4xl whitespace-nowrap overflow-hidden text-ellipsis ">{community.title}</p>
                                                <div className='flex flex-row gap-2'>
                                                    <p className='text-2xl whitespace-nowrap '>{community.nickname}</p>
                                                    <Image src={community.profile} alt="Profile Image" width={400}
                                                           height={400}
                                                           className='w-[30px] h-[30px] rounded-full'/>
                                                </div>
                                            </div>
                                            <p className="text-yellow-1 text-2xl mt-2">#{community.categories.join(' #')}</p>
                                            <p className="text-3xl truncate mt-4 whitespace-pre-wrap overflow-hidden h-[220px]">{community.content}</p> {/* 긴 내용은 잘라냅니다 */}

                                            <div className='absolute bottom-2 left-2 w-full flex flex-row justify-between  text-3xl'>
                                                <div className='flex flex-row gap-4'>
                                                    <CommunityLikesCount communityId={community.id}
                                                                         initialLiked={community.liked}
                                                                         initialLikeCount={community.likeCount}/>
                                                    <FaRegCommentAlt className='text-yellow-2'/>
                                                </div>
                                                <p className='text-2xl mx-6'>{community.timestamp}</p>

                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <div className="flex justify-center mt-8 mb-10">
                                <Pagination
                                    count={Math.ceil(communities.length / communitiesPerPage)}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                />
                            </div>
                        </>) : (<>
                        <div className="text-center my-auto text-3xl text-gray-500">
                            등록된 글이 없습니다.
                        </div>
                        <div className="flex justify-center mt-8 mb-10">
                            <Pagination
                                count={Math.ceil(communities.length / communitiesPerPage)}
                                page={currentPage}
                                onChange={handlePageChange}
                            />
                        </div>
                    </>)}
                </div>
            </section>)}

        </>

    );
}
