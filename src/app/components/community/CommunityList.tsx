'use client';

import React, {useEffect, useState} from 'react';
import CommunityListAll, {CommunityListProps} from "@/app/components/community/CommunityListAll";
import {useRouter} from "next/navigation";
import Pagination from "@mui/material/Pagination";
import Image from "next/image";
import {FaRegCommentAlt, FaRegHeart} from "react-icons/fa";
import {useTablet} from "@/service/MediaQuery";
import CommunityLikesCount from "@/app/components/community/CommunityLikesCount";

export default function CommunityList() {
    const isTablet = useTablet();

    const [communities, setCommunities] = useState<CommunityListProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [communitiesPerPage] = useState(20);

    const handlePageChange = (e: any, page: number) => {
        setCurrentPage(page);
    }

    const currentCommunities = communities.slice(
        (currentPage - 1) * communitiesPerPage,
        currentPage * communitiesPerPage
    )

    const router = useRouter();

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

    const handleDetailClick = (id: string) => {
        router.push(`/community/${id.toString()}`);
    }

    return (
        <>
            {isTablet ? (<>
                <div className={`grid grid-cols-2 justify-center w-[95%] mx-auto mt-10 gap-4`}>
                    {currentCommunities.map((community, index) => (
                        <div key={community.id}
                             onClick={() => handleDetailClick(community.id)}
                             className="relative border-2 border-yellow-6 rounded-3xl p-4 cursor-pointer w-full h-[300px]">
                            <div className='flex flex-row items-center mt-2 justify-between'>
                                <p className="font-bold text-2xl whitespace-nowrap overflow-hidden ">{community.title}</p>
                                <div className='flex flex-row gap-2 items-center'>
                                    <p className='text-lg'>{community.nickname}</p>
                                    <Image src={community.profile} alt="Profile Image" width={400} height={400}
                                           className='w-[20px] h-[20px] rounded-full'/>
                                </div>
                            </div>
                            <p className="text-yellow-1 text-xl mt-2">{community.categories.join(', ')}</p>
                            <p className="text-2xl truncate mt-4 whitespace-pre-wrap overflow-hidden h-[125px]">{community.content}</p> {/* 긴 내용은 잘라냅니다 */}

                            <div className='absolute bottom-4 left-4 flex flex-row gap-4 text-2xl'>
                                <CommunityLikesCount communityId={community.id} initialLiked={community.liked} initialLikeCount={community.likeCount} />
                                <FaRegCommentAlt className='text-yellow-2'/>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-8">
                    <Pagination
                        count={Math.ceil(communities.length / communitiesPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </div>
            </>) : (<>
                <div className={`grid grid-cols-2 justify-center w-[80%] mx-auto mt-10 gap-16`}>
                    {currentCommunities.map((community, index) => (
                        <div key={community.id}
                             onClick={() => handleDetailClick(community.id)}
                             className="relative border-2 border-yellow-6 rounded-3xl p-4 cursor-pointer w-full h-[400px]">
                            <div className='flex flex-row items-center mt-2 justify-between'>
                                <p className="font-bold text-4xl whitespace-nowrap overflow-hidden text-ellipsis ">{community.title}</p>
                                <div className='flex flex-row gap-2'>
                                    <p className='text-2xl whitespace-nowrap '>{community.nickname}</p>
                                    <Image src={community.profile} alt="Profile Image" width={400} height={400}
                                           className='w-[30px] h-[30px] rounded-full'/>
                                </div>
                            </div>
                            <p className="text-yellow-1 text-2xl mt-2">{community.categories.join(', ')}</p>
                            <p className="text-3xl truncate mt-4 whitespace-pre-wrap overflow-hidden h-[220px]">{community.content}</p> {/* 긴 내용은 잘라냅니다 */}

                            <div className='absolute bottom-4 left-4 flex flex-row gap-4 text-3xl'>
                                <CommunityLikesCount communityId={community.id} initialLiked={community.liked} initialLikeCount={community.likeCount} />
                                <FaRegCommentAlt className='text-yellow-2'/>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-8">
                    <Pagination
                        count={Math.ceil(communities.length / communitiesPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </div>
            </>)}
        </>

    );
}
