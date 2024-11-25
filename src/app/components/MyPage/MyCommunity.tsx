'use client';
import React, {useEffect, useState} from 'react';
import {useTabletHeight} from "@/service/MediaQuery";
import {MemberCommunity, MemberCommunityComments} from "@/app/components/MyPage/MemberProfile";
import Pagination from '@mui/material/Pagination';
import Link from 'next/link';

export default function MyCommunity() {
    const isTabletHeight = useTabletHeight();
    const [community, setCommunity] = useState(null);
    const [communityComment, setCommunityComment] = useState(null);

    const [communityPage, setCommunityPage] = useState(1);
    const [communityCommentPage, setCommunityCommentPage] = useState(1);

    const communityPerPage = 5;
    const communityCommentPerPage = 5;

    // 커뮤니티 데이터 가져오기
    useEffect(() => {
        const fetchCommunityData = async () => {
            try {
                const data = await MemberCommunity();
                setCommunity(data);
            } catch (err) {
                console.error("커뮤니티 데이터를 가져오는 데 실패했습니다.", err);
                setCommunity([]);
            }
        };
        fetchCommunityData();
    }, []);

    // 커뮤니티 댓글 데이터 가져오기
    useEffect(() => {
        const fetchCommunityCommentData = async () => {
            try {
                const data = await MemberCommunityComments();
                setCommunityComment(data);
            } catch (err) {
                console.error("댓글 데이터를 가져오는 데 실패했습니다.", err);
                setCommunityComment([]);
            }
        };
        fetchCommunityCommentData();
    }, []);

    // 로딩 상태 처리
    if (community === null || communityComment === null) {
        return <p>데이터를 불러오는 중입니다...</p>;
    }

    if (community.length === 0 && communityComment.length === 0) {
        return <p>등록된 데이터가 없습니다. 다시 시도해주세요.</p>;
    }

    // 현재 페이지 데이터 추출
    const currentCommunity = community.slice(
        (communityPage - 1) * communityPerPage,
        communityPage * communityPerPage
    );

    const currentCommunityComment = communityComment.slice(
        (communityCommentPage - 1) * communityCommentPerPage,
        communityCommentPage * communityCommentPerPage
    );

    return (
        <>
            {isTabletHeight ? (
                <article className="w-full">
                    <div className="border-4 border-yellow-2 w-full min-h-[660px] mb-20 rounded-2xl p-3">
                        {/* 커뮤니티 섹션 */}
                        <h2 className="text-4xl font-semibold mb-4">사연 작성</h2>
                        {currentCommunity.length > 0 ? (
                            <div className="min-h-[300px]">
                                {currentCommunity.map(item => (
                                    <Link href={`/community/${item.id}`} key={item.id}>
                                        <div className="p-2 border-b flex flex-row justify-between items-center">
                                            <p className="text-3xl font-medium">{item.title}</p>
                                            <p className="text-xl text-gray-500">
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                                <Pagination
                                    count={Math.ceil(community.length / communityPerPage)}
                                    page={communityPage}
                                    onChange={(e, page) => setCommunityPage(page)}
                                    className="p-1 mt-4 mx-auto"
                                    style={{ display: 'flex', justifyContent: 'center' }}
                                />
                            </div>
                        ) : (
                            <div className="flex justify-center items-center text-4xl min-h-[300px]">
                                아직 등록된 글이 없습니다.
                            </div>
                        )}

                        <div className="w-[99%] mx-auto border-[2px] border-yellow-2 my-4"></div>

                        {/* 댓글 섹션 */}
                        <h2 className="text-4xl font-semibold mb-4">댓글 작성</h2>
                        {currentCommunityComment.length > 0 ? (
                            <div className="min-h-[300px]">
                                {currentCommunityComment.map(item => (
                                    <Link href={`/community/${item.id}`} key={item.id}>
                                        <div className="p-2 border-b flex flex-row justify-between items-center">
                                            <p className="text-3xl font-medium">{item.content}</p>
                                            <p className="text-xl text-gray-500">
                                                {new Date(item.timestamp).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                                <Pagination
                                    count={Math.ceil(communityComment.length / communityCommentPerPage)}
                                    page={communityCommentPage}
                                    onChange={(e, page) => setCommunityCommentPage(page)}
                                    className="p-1 mt-4 mx-auto"
                                    style={{ display: 'flex', justifyContent: 'center' }}
                                />
                            </div>
                        ) : (
                            <div className="flex justify-center items-center text-4xl min-h-[300px]">
                                아직 등록된 댓글이 없습니다.
                            </div>
                        )}
                    </div>
                </article>
            ) : (
                <article className="w-full min-h-[805px]">
                    <h1 className="text-6xl font-semibold mt-4">커뮤니티 목록</h1>
                    <div className="border-4 border-yellow-2 w-full min-h-[660px] rounded-2xl p-3 mt-4">
                        <h2 className="text-4xl font-semibold mb-4">사연 작성</h2>
                        {currentCommunity.length > 0 ? (
                            <div className="min-h-[300px]">
                                {currentCommunity.map(item => (
                                    <Link href={`/community/${item.id}`} key={item.id}>
                                        <div className="p-2 border-b flex flex-row justify-between items-center">
                                            <p className="text-3xl font-medium">{item.title}</p>
                                            <p className="text-xl text-gray-500">
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                                <Pagination
                                    count={Math.ceil(community.length / communityPerPage)}
                                    page={communityPage}
                                    onChange={(e, page) => setCommunityPage(page)}
                                    className="p-1 mt-4 mx-auto"
                                    style={{ display: 'flex', justifyContent: 'center' }}
                                />
                            </div>
                        ) : (
                            <div className="flex justify-center items-center text-4xl min-h-[300px]">
                                아직 등록한 글이 없습니다.
                            </div>
                        )}

                        <div className="w-[95%] mx-auto border-[2px] border-yellow-2 my-4"></div>

                        <h2 className="text-4xl font-semibold mb-4">댓글 작성</h2>
                        {currentCommunityComment.length > 0 ? (
                            <div className="min-h-[300px]">
                                {currentCommunityComment.map(item => (
                                    <Link href={`/community/${item.id}`} key={item.id}>
                                        <div className="p-2 border-b flex flex-row justify-between items-center">
                                            <p className="text-3xl font-medium">{item.content}</p>
                                            <p className="text-xl text-gray-500">
                                                {new Date(item.timestamp).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                                <Pagination
                                    count={Math.ceil(communityComment.length / communityCommentPerPage)}
                                    page={communityCommentPage}
                                    onChange={(e, page) => setCommunityCommentPage(page)}
                                    className="p-1 mt-4 mx-auto"
                                    style={{ display: 'flex', justifyContent: 'center' }}
                                />
                            </div>
                        ) : (
                            <div className="flex justify-center items-center text-4xl min-h-[300px]">
                                아직 등록한 댓글이 없습니다.
                            </div>
                        )}
                    </div>
                </article>
            )}
        </>
    );
}
