'use client';

import React, {useEffect, useState} from 'react';
import {ListenersListAll, ListenersListProps} from "@/app/components/Listeners/ListenersListAll";
import Image from 'next/image';
import {MdArrowForward, MdLocalPhone, MdLocationOn} from "react-icons/md";
import ListenerDetail from "@/app/components/Listeners/ListenerDetail";
import Pagination from "@mui/material/Pagination";
import {useMobile, useTabletHeight} from "@/service/MediaQuery";

export default function ListenerList() {

    const isTabletHeight = useTabletHeight();

    const [showListenersDetail, setShowListenersDetail] = useState(false);
    const [listeners, setListeners] = useState<ListenersListProps[]>([]);
    const [selectedListener, setSelectedListener] = useState<ListenersListProps | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [listenersPerPage] = useState(4);

    useEffect(() => {
        const fetchListeners = async () => {
            try {
                const data = await ListenersListAll();
                setListeners(data)
            } catch (err) {
                console.error('상담사를 불러오는데 실패했습니다.')
            }
        };

        fetchListeners();
    }, []);

    const handleDetailClick = (listener: ListenersListProps) => {
        setShowListenersDetail(true);
        setSelectedListener(listener);
    }

    const handleCloseModal = () => {
        setShowListenersDetail(false);
    }

    const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    }

    const currentListeners = listeners.slice(
        (currentPage - 1) * listenersPerPage,
        currentPage * listenersPerPage
    )

    return (
        <>
            {showListenersDetail && selectedListener && (
                <div
                    onClick={handleCloseModal}
                    className='fixed inset-0 bg-black/50 flex flex-col justify-center items-center z-50'>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={`bg-white rounded-xl shadow-lg  ${isTabletHeight ? ' w-[70%] min-h-[1000px]' : ' w-[48%] min-h-[1000px]'}`}>
                        <ListenerDetail
                            nickname={selectedListener.nickname}
                            categories={selectedListener.categories}
                            profile={selectedListener.profile}
                            career={selectedListener.career}
                            education={selectedListener.education}
                            description={selectedListener.description}
                            address={selectedListener.address}
                            phoneNumber={selectedListener.phoneNumber}
                            contactNumber={selectedListener.contactNumber}
                        />


                    </div>
                </div>
            )}

            <div className='text-center mt-8'>
                <h1 className={`font-bold ${isTabletHeight ? 'text-5xl' : 'text-7xl'}`}>나비잠 멘토</h1>
            </div>
            {listeners.length === 0 ? (
                <div className='text-center items-center'>
                </div>
            ) : (
                <>
                    <section className='relative mx-auto min-h-[900px]'>
                        {currentListeners.map((listener) => (
                            <div key={listener.id}
                                 className='flex flex-col items-center'
                            >
                                <div className={`flex flex-row ${isTabletHeight ? 'w-[95%]' : 'w-[70%]'} mt-10`}>
                                    <Image src={listener.profile} alt="Linster Image" width={230}
                                           height={400}
                                           className='rounded-2xl'
                                    />
                                    <div className='flex flex-col gap-6 mx-4'>
                                        <div className='flex gap-2'>
                                            <h1 className={`${isTabletHeight ? 'text-4xl' : 'text-6xl'} font-semibold`}>{listener.nickname}
                                                <span
                                                    className={`${isTabletHeight ? 'text-2xl' : 'text-4xl'} font-medium`}>상담사</span>
                                            </h1>
                                            <p className={`text-yellow-2 ${isTabletHeight ? 'text-xl mt-3' : 'text-3xl mt-auto'} font-bold`}>#{listener.categories.join(' #')}</p>
                                            <div className={`${isTabletHeight ? 'mt-3 text-xl' : 'mt-10'} text-2xl  -mx-1`}>평점: <span
                                                className='text-yellow-2'>4.3</span></div>
                                        </div>
                                        <h2 className={`${isTabletHeight ? 'text-xl' : 'text-3xl'} text-gray-600`}><span
                                            className="text-black">한 줄 소개:</span> {listener.description}</h2>
                                        <p className={`flex flex-row items-center gap-1 ${isTabletHeight ? 'text-xl' : 'text-2xl'}`}>
                                            <MdLocationOn/>{listener.address}</p>
                                        <p className={`flex flex-row items-center gap-1 ${isTabletHeight ? 'text-xl' : 'text-2xl'}`}>
                                            <MdLocalPhone/>{listener.contactNumber}</p>
                                        <p className={`${isTabletHeight ? 'text-xl' : 'text-3xl'} mt-2 flex flex-row gap-1 items-center`}
                                           key={listener.id}
                                           onClick={() => handleDetailClick(listener)}
                                        >전문가 프로필 보기 <MdArrowForward/></p>
                                    </div>
                                </div>
                                <div
                                    className={`${isTabletHeight ? 'w-[95%]' : 'w-[75%]'} mt-4 mb-2 border-[1px] border-lightGray/30`}></div>
                            </div>
                        ))}
                        <div className="flex justify-center p-10">
                            <Pagination
                                count={Math.ceil(listeners.length / listenersPerPage)}
                                page={currentPage}
                                onChange={handlePageChange}
                            />
                        </div>
                    </section>
                </>
            )}
        </>
    );
}


//   {isMobile ? (<></>): (<aside><ListenerSearch/><ListenerSearchCategory/></aside>)}