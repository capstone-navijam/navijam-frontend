import React, {Suspense, useEffect, useState} from 'react';
import ComfortMemberRegister from "@/app/components/Comfort/ComfortMemberRegister";
import {FaPen, FaSortNumericDown, FaSortNumericUp} from "react-icons/fa";
import {ComfortListAll, ComfortListProps} from "@/app/components/Comfort/ComfortListAll";
import ComfortSearch from "@/app/components/Comfort/ComfortSearch";
import Pagination from '@mui/material/Pagination';
import {useTabletHeight} from "@/service/MediaQuery";
import Link from "next/link";
import {useCustomSearchParams} from "@/service/useCustomSearchParams";

export default function ComfortContent() {
    const isTabletHeight = useTabletHeight();
    const {searchParams} = useCustomSearchParams();

    const [showComfortMemberRegister, setShowComfortMemberRegister] = useState(false);
    const [comforts, setComforts] = useState<ComfortListProps[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [comfortsPerPage] = useState(4);


    const sortComforts = (data: ComfortListProps[], order: 'asc' | 'desc') => {
        return data.sort((a, b) => {
            if (order === 'asc') {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            } else {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        })
    }

    useEffect(() => {
        const fetchComforts = async () => {
            try {
                const data = await ComfortListAll();
                setComforts(sortComforts(data, 'desc'));
            } catch (err) {
                console.error("게시글을 불러오는 데 실패했습니다.");
            }
        };
        fetchComforts();
    }, []);

    // searchTerm 또는 comforts 변경 시 필터링


    const handleSortOrder = (order: 'asc' | 'desc') => {
        setSortOrder(order);
        const sortedData = sortComforts([...comforts], order);
        setComforts(sortedData);
    };

    const handleClick = () => {
        setShowComfortMemberRegister(true);
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    }

    const currentComforts = comforts.filter((comfort) => {
        const query = searchParams.query?.toLowerCase() || "";
        return (
            comfort.title.toLowerCase().includes(query)
        )
    }).slice((currentPage - 1) * comfortsPerPage, currentPage * comfortsPerPage);


    return (
        <>
            {showComfortMemberRegister ? (
                <ComfortMemberRegister/>
            ) : (
                <>
                    {isTabletHeight ? (
                        <section className='content-center'>
                            <div className='flex flex-col text-center'>
                                <h1 className={`font-bold mt-8 text-5xl`}>위로 받기</h1>
                                <span className='mt-4 text-2xl'>
                                    내용은 비밀이 보장되므로,<br/>작은 고민이라도 괜찮아요.
                                </span>
                            </div>
                            <div className='flex justify-center mt-8'>
                                <button
                                    onClick={handleClick}
                                    className={`w-[95%] h-28 text-center bg-yellow-6 p-8 rounded-lg`}
                                >
                                    <div className={`flex flex-row justify-center gap-2 text-white text-2xl`}>
                                        <FaPen className='mt-1'/>
                                        <span>고민을 털어 놓으면 한결 마음이 편질거에요.</span>
                                    </div>
                                </button>
                            </div>
                            <div className={`flex flex-row justify-between w-[95%] mx-auto mt-4`}>
                                <Suspense>
                                    <ComfortSearch placeholder="검색하기"/>
                                </Suspense>
                                {sortOrder === 'desc' ? (
                                    <button onClick={() => handleSortOrder('asc')}
                                            className='text-2xl flex items-center gap-0.5'>
                                        <span className='text-lg font-semibold'>정렬</span><FaSortNumericDown/>
                                    </button>
                                ) : (
                                    <button onClick={() => handleSortOrder('desc')}
                                            className='text-2xl flex items-center gap-0.5'>
                                        <span className='text-lg font-semibold'>정렬</span><FaSortNumericUp/>
                                    </button>
                                )}
                            </div>

                            {/* 게시글 목록 */}
                            <div className={`flex flex-col gap-5 mt-2 items-center mx-auto w-full`}>
                                {currentComforts.length === 0 ? (
                                    <div
                                        className={`w-[95%] h-28 text-center bg-gray-400 p-8 rounded-lg mt-2`}
                                    >
                                        <div className={`flex flex-row justify-center gap-2 text-white text-2xl `}>
                                            <span>등록된 글이 없습니다.</span>
                                        </div>
                                    </div>
                                ) : (
                                    currentComforts.map((comfort) => (
                                        <Link key={comfort.id} href={`/comforts/${comfort.id}`}
                                              className={`w-[95%] h-[100px] mt-4`}>
                                            <div
                                                className={`flex rounded-lg justify-between border-2 items-center font-semibold border-yellow-6 p-6 w-full`}>
                                                <h1 className={`text-2xl w-1/2 text-ellipsis whitespace-nowrap overflow-hidden`}>
                                                    {comfort.title}
                                                </h1>
                                                <p className={`text-lg w-1/2 text-gray-400 text-end`}>{comfort.createdAt}</p>
                                            </div>
                                        </Link>
                                    ))
                                )}
                                <Pagination
                                    count={Math.ceil(comforts.length / comfortsPerPage)}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    className="p-1 mb-10 mt-5"
                                />
                            </div>
                        </section>
                    ) : (
                        <section className='content-center'>
                            <div className='flex flex-col text-center'>
                                <h1 className={`font-bold mt-8 text-7xl`}>위로 받기</h1>
                                <span className='mt-4 text-3xl'>
                                    내용은 비밀이 보장되므로,<br/>작은 고민이라도 괜찮아요.
                                </span>
                            </div>
                            <div className='flex justify-center mt-8'>
                                <button
                                    onClick={handleClick}
                                    className={`w-[75%] h-28 text-center bg-yellow-6 p-8 rounded-lg`}
                                >
                                    <div className={`flex flex-row justify-center gap-2 text-white text-3xl`}>
                                        <FaPen className='mt-1'/>
                                        <span>고민을 털어 놓으면 한결 마음이 편질거에요.</span>
                                    </div>
                                </button>
                            </div>
                            <div className={`flex flex-row justify-between w-[75%] mx-auto mt-4`}>
                                <Suspense>
                                    <ComfortSearch placeholder="검색하기"/>
                                </Suspense>
                                {sortOrder === 'desc' ? (
                                    <button onClick={() => handleSortOrder('asc')}
                                            className='text-4xl flex items-center gap-0.5'>
                                        <span className='font-semibold'>정렬</span><FaSortNumericDown/>
                                    </button>
                                ) : (
                                    <button onClick={() => handleSortOrder('desc')}
                                            className='text-4xl flex items-center gap-0.5'>
                                        <span className='font-semibold'>정렬</span><FaSortNumericUp/>
                                    </button>
                                )}
                            </div>

                            {/* 게시글 목록 */}
                            <div className={`flex flex-col gap-5 mt-2 items-center mx-auto w-full`}>
                                {currentComforts.length === 0 ? (
                                    <div className={`w-[75%] h-28 text-center bg-gray-400 p-8 rounded-lg mt-2`}>
                                        <div className={`flex flex-row justify-center gap-2 text-white text-2xl`}>
                                            <span>등록된 글이 없습니다.</span>
                                        </div>
                                    </div>
                                ) : (
                                    currentComforts.map((comfort) => (
                                        <Link key={comfort.id} href={`/comforts/${comfort.id}`}
                                              className={`w-[75%] h-[100px] mt-4`}>
                                            <div
                                                className={`flex rounded-lg justify-between border-2 items-center font-semibold border-yellow-6 p-6 w-full`}>
                                                <h1 className={`text-3xl w-1/2 text-ellipsis whitespace-nowrap overflow-hidden`}>
                                                    {comfort.title}
                                                </h1>
                                                <p className={`text-xl w-1/2 text-gray-400 text-end`}>{comfort.createdAt}</p>
                                            </div>
                                        </Link>
                                    ))
                                )}
                                <Pagination
                                    count={Math.ceil(comforts.length / comfortsPerPage)}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    className="p-1 mb-10 mt-5"
                                />
                            </div>
                        </section>
                    )}
                </>
            )}
        </>
    );
}
