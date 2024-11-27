'use client';

import React, { useEffect, useState } from 'react';
import CommunityListAll, { CommunityListProps } from "@/app/components/Community/CommunityListAll";
import Pagination from "@mui/material/Pagination";
import Image from "next/image";
import { FaRegCommentAlt, FaSortNumericDown, FaSortNumericUp } from "react-icons/fa";
import { useTabletHeight } from "@/service/MediaQuery";
import CommunityLikesCount from "@/app/components/Community/CommunityLikesCount";
import Link from 'next/link';
import CommunitySearch from "@/app/components/Community/CommunitySearch";
import { useCustomSearchParams } from "@/service/useCustomSearchParams";

export default function CommunityList() {
    const isTabletHeight = useTabletHeight();
    const { searchParams } = useCustomSearchParams();

    const [communities, setCommunities] = useState<CommunityListProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [communitiesPerPage] = useState(20);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); // 기본값: 최신순

    const handlePageChange = (e: any, page: number) => {
        setCurrentPage(page);
    };

    const handleSortOrder = (order: 'asc' | 'desc') => {
        setSortOrder(order);
        const sortedData = [...communities].sort((a, b) => {
            const timeA = new Date(a.timestamp).getTime();
            const timeB = new Date(b.timestamp).getTime();
            return order === 'asc' ? timeA - timeB : timeB - timeA;
        });
        setCommunities(sortedData);
    };

    const currentCommunities = communities
        .filter((community) => {
            const query = searchParams.query?.toLowerCase() || "";
            return (
                community.title.toLowerCase().includes(query) ||
                community.categories.some((category: string) =>
                    category.toLowerCase().includes(query)
                )
            );
        })
        .slice(
            (currentPage - 1) * communitiesPerPage,
            currentPage * communitiesPerPage
        );

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const data = await CommunityListAll();
                const sortedData = data.sort(
                    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
                ); // 기본 정렬: 최신순
                setCommunities(sortedData);
            } catch (err) {
                console.error("커뮤니티 게시글을 불러오는 데 실패했습니다.");
            }
        };
        fetchCommunities();
    }, []);

    return (
        <>
            {isTabletHeight ? (
                <section>
                    <div className="flex justify-end w-[95%] mx-auto mb-4">
                        {sortOrder === 'desc' ? (
                            <button
                                onClick={() => handleSortOrder('asc')}
                                className="flex items-center gap-1 text-xl font-semibold"
                            >
                                최신 순 <FaSortNumericUp />
                            </button>
                        ) : (
                            <button
                                onClick={() => handleSortOrder('desc')}
                                className="flex items-center gap-1 text-xl font-semibold"
                            >
                                오래된 순 <FaSortNumericDown />
                            </button>
                        )}
                    </div>

                    <div className={`grid grid-cols-2 justify-center w-[95%] mx-auto mt-4 gap-4`}>
                        {currentCommunities.map((community) => (
                            <Link
                                key={community.id}
                                href={`/community/${community.id}`}
                                as={`/community/${community.id}`}
                            >
                                <div
                                    className="relative border-2 border-yellow-6 rounded-3xl p-4 cursor-pointer w-full h-[300px]"
                                >
                                    <div className="flex flex-row items-center mt-2 justify-between">
                                        <p className="font-bold text-2xl whitespace-nowrap overflow-hidden text-ellipsis w-[70%]">
                                            {community.title}
                                        </p>
                                        <div className="flex flex-row gap-2 items-center">
                                            <Image
                                                src={community.profile}
                                                alt="Profile Image"
                                                width={400}
                                                height={400}
                                                className="w-[50px] h-[50px] rounded-full"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-yellow-2 text-xl">
                                        #{community.categories.join(" #")}
                                    </p>
                                    <p className="text-2xl truncate mt-2 whitespace-pre-wrap overflow-hidden h-[125px]">
                                        {community.content}
                                    </p>

                                    <div className="absolute bottom-2 left-2 w-full flex flex-row justify-between text-2xl">
                                        <div className="flex flex-row gap-4">
                                            <CommunityLikesCount
                                                communityId={community.id}
                                                initialLiked={community.liked}
                                                initialLikeCount={community.likeCount}
                                            />
                                            <FaRegCommentAlt className="text-yellow-2" />
                                        </div>
                                        <p className="text-xl mx-6">{community.timestamp}</p>
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
                </section>
            ) : (
                <section className="flex flex-row mt-10 mb-10">
                    <CommunitySearch placeholder="검색하기" />
                    <div className="w-[67.5%] mx-20 flex-col flex">
                        <div className="flex justify-end mb-4">
                            {sortOrder === 'desc' ? (
                                <button
                                    onClick={() => handleSortOrder('asc')}
                                    className="flex items-center gap-1 text-2xl font-semibold"
                                >
                                    최신 순 <FaSortNumericUp />
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleSortOrder('desc')}
                                    className="flex items-center gap-1 text-2xl font-semibold"
                                >
                                    오래된 순 <FaSortNumericDown />
                                </button>
                            )}
                        </div>
                        {currentCommunities.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2 justify-center gap-16">
                                    {currentCommunities.map((community) => (
                                        <Link
                                            href={`/community/${community.id}`}
                                            as={`/community/${community.id}`}
                                            key={community.id}
                                        >
                                            <div
                                                className="relative border-2 border-yellow-6 rounded-3xl p-4 cursor-pointer w-full h-[340px]"
                                            >
                                                <div className="flex flex-row items-center mt-2 justify-between">
                                                    <p className="font-bold text-4xl whitespace-nowrap overflow-hidden text-ellipsis">
                                                        {community.title}
                                                    </p>
                                                    <div className="flex flex-row gap-2 items-center">
                                                        <Image
                                                            src={community.profile}
                                                            alt="Profile Image"
                                                            width={400}
                                                            height={400}
                                                            className="w-[65px] h-[65px] rounded-full"
                                                        />
                                                        <p className="text-2xl whitespace-nowrap overflow-hidden text-ellipsis">
                                                            {community.nickname}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="text-yellow-2 text-2xl mt-2">
                                                    #{community.categories.join(" #")}
                                                </p>
                                                <p className="text-3xl truncate mt-4 whitespace-pre-wrap overflow-hidden h-[144px]">
                                                    {community.content}
                                                </p>

                                                <div
                                                    className="absolute bottom-2 left-2 w-full flex flex-row justify-between text-3xl">
                                                    <div className="flex flex-row gap-4">
                                                        <CommunityLikesCount
                                                            communityId={community.id}
                                                            initialLiked={community.liked}
                                                            initialLikeCount={community.likeCount}
                                                        />
                                                        <FaRegCommentAlt className="text-yellow-2"/>
                                                    </div>
                                                    <p className="text-2xl mx-6">{community.timestamp}</p>
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
                            </>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
                </section>
            )}
        </>
    );
}
