'use client';
import React, {useEffect, useState} from 'react';
import {useTabletHeight} from "@/service/MediaQuery";
import {MemberComforts} from "@/app/components/MyPage/MemberProfile";
import Pagination from '@mui/material/Pagination';
import Link from 'next/link';

export default function MyComfort() {
    const isTabletHeight = useTabletHeight();
    const [comfort, setComfort] = useState(null);

    const [answeredPage, setAnsweredPage] = useState(1);
    const [unAnsweredPage, setUnAnsweredPage] = useState(1);
    const comfortPerPage = 5;

    useEffect(() => {
        const fetchComfortData = async () => {
            try {
                const data = await MemberComforts();
                setComfort(data);
            } catch (error) {
                console.error("데이터를 가져오는 데 실패했습니다.", error);
                setComfort([]);
            }
        };
        fetchComfortData();
    }, []);

    if (comfort === null) {
        return <p>데이터를 불러오는 중입니다...</p>;
    }

    if (comfort.length === 0) {
        return <p>등록된 데이터가 없습니다. 다시 시도해주세요.</p>;
    }

    const answeredComforts = comfort.filter(item => item.isAnswered);
    const unAnsweredComforts = comfort.filter(item => !item.isAnswered);

    const currentAnsweredComfort = answeredComforts.slice(
        (answeredPage - 1) * comfortPerPage,
        answeredPage * comfortPerPage
    );

    const currentUnAnsweredComfort = unAnsweredComforts.slice(
        (unAnsweredPage - 1) * comfortPerPage,
        unAnsweredPage * comfortPerPage
    );

    return (
        <>
            {isTabletHeight ? (
                <article className="w-full">
                    <div className="border-4 border-yellow-2 w-full min-h-[660px] mb-20 rounded-2xl p-3 ">
                        <h2 className="text-4xl font-semibold mb-4">상담 완료</h2>
                        {answeredComforts.length > 0 ? (
                            <>
                                <div className=' min-h-[300px]'>
                                    {currentAnsweredComfort.map(item => (
                                        <Link href={`/comforts/${item.id}`} key={item.id}>
                                            <div className="p-2 border-b flex flex-row justify-between items-center">
                                                <p className="text-lg font-medium">{item.title}</p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                    <Pagination
                                        count={Math.ceil(answeredComforts.length / comfortPerPage)}
                                        page={answeredPage}
                                        onChange={(e, page) => setAnsweredPage(page)}
                                        className="p-1 mt-4 mx-auto"
                                        style={{display: 'flex', justifyContent: 'center'}}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="flex justify-center items-center text-4xl min-h-[300px]">
                                아직 등록된 글이 없습니다.
                            </div>
                        )}

                        <div className="w-[99%] mx-auto border-[2px] border-yellow-2 my-4"></div>

                        <h2 className="text-4xl font-semibold mb-4">답변 대기중</h2>
                        {unAnsweredComforts.length > 0 ? (
                            <>
                                <div className=' min-h-[300px]'>
                                    {currentUnAnsweredComfort.map(item => (
                                        <Link href={`/comforts/${item.id}`} key={item.id}>
                                            <div className="p-2 border-b flex flex-row justify-between items-center">
                                                <p className="text-3xl font-medium">{item.title}</p>
                                                <p className="text-xl text-gray-500">
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                    <Pagination
                                        count={Math.ceil(unAnsweredComforts.length / comfortPerPage)}
                                        page={unAnsweredPage}
                                        onChange={(e, page) => setUnAnsweredPage(page)}
                                        className="p-1 mt-4 mx-auto"
                                        style={{display: 'flex', justifyContent: 'center'}}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="flex justify-center items-center text-4xl min-h-[300px]">
                                아직 등록된 글이 없습니다.
                            </div>
                        )}
                    </div>
                </article>
            ) : (
                <article className="w-full min-h-[805px]">
                    <h1 className="text-6xl font-semibold mt-4">위로받기 목록</h1>
                    <div className="border-4 border-yellow-2 w-full min-h-[660px] rounded-2xl p-3 mt-4">
                        <h2 className="text-4xl font-semibold mb-4">상담 완료</h2>
                        {answeredComforts.length > 0 ? (
                            <>
                                <div className=' min-h-[250px]'>
                                    {currentAnsweredComfort.map(item => (
                                        <Link href={`/comforts/${item.id}`} key={item.id}>
                                            <div className="p-2 border-b flex flex-row justify-between items-center">
                                                <p className="text-lg font-medium">{item.title}</p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                    <Pagination
                                        count={Math.ceil(answeredComforts.length / comfortPerPage)}
                                        page={answeredPage}
                                        onChange={(e, page) => setAnsweredPage(page)}
                                        className="p-1 mt-4 mx-auto"
                                        style={{display: 'flex', justifyContent: 'center'}}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="flex justify-center items-center text-4xl min-h-[250px]">
                                아직 등록된 글이 없습니다.
                            </div>
                        )}

                        <div className="w-[95%] mx-auto border-[2px] border-yellow-2 my-4"></div>

                        <h2 className="text-4xl font-semibold mb-4">답변 대기중</h2>
                        {unAnsweredComforts.length > 0 ? (
                            <>
                                <div className=' min-h-[250px]'>
                                    {currentUnAnsweredComfort.map(item => (
                                        <Link href={`/comforts/${item.id}`} key={item.id}>
                                            <div className="p-2 border-b flex flex-row justify-between items-center">
                                                <p className="text-3xl font-medium">{item.title}</p>
                                                <p className="text-xl text-gray-500">
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                    <Pagination
                                        count={Math.ceil(unAnsweredComforts.length / comfortPerPage)}
                                        page={unAnsweredPage}
                                        onChange={(e, page) => setUnAnsweredPage(page)}
                                        className="p-1 mt-4 mx-auto"
                                        style={{display: 'flex', justifyContent: 'center'}}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="flex justify-center items-center text-4xl min-h-[250px]">
                                아직 등록된 글이 없습니다.
                            </div>
                        )}
                    </div>
                </article>
            )}
        </>
    );
}
