'use client';

import React, {useEffect, useState} from 'react';
import ComfortMemberDetail from "@/app/components/Comfort/ComfortMemberDetail";
import ComfortListenerDetail from "@/app/components/Comfort/ComfortListenerDetail";
import {useParams} from "next/navigation";
import ComfortListDetail from "@/app/components/Comfort/ComfortListlDetail";
import ComfortListenerRegister from "@/app/components/Comfort/ComfortListenerRegister";
import ComfortSkeleton from "@/app/components/SkeletonUI/ComfortSkeleton";
import {getCookie} from "cookies-next";
import {useMobile, useTablet} from "@/service/MediaQuery";

export default function ComfortDetailPage() {

    const isTablet = useTablet();

    const {id} = useParams();
    const [comfort, setComfort] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [role, setRole] = useState("");


    useEffect(() => {
        const role = getCookie("Role");
        if (role === "MEMBER" || role === "LISTENER") {
            setRole(role);
        } else {
            setRole("");
        }

        const fetchComfortData = async () => {
            if (id) {
                //@ts-ignore
                const data = await ComfortListDetail(BigInt(id));
                setComfort(data);
                setIsAnswered(data.isAnswered);
                setIsLoading(false);
            }
        };

        fetchComfortData();

    }, [id]);

    if (isLoading) {
        return <ComfortSkeleton/>
    }

    return (
        <>
            <div className="flex-grow">
                <ComfortMemberDetail/>
                {isAnswered ? (
                    <div className="pb-20"> {/* 하단 여백 추가 */}
                        <ComfortListenerDetail consoles={comfort.consoles}/>
                    </div>
                ) : (
                    <div className={`mx-auto mt-10 ${isTablet ? 'w-[95%]' : 'w-[80%]'}`}>
                        <div className={`${isTablet ? 'w-[25%]' : 'w-[15%]'}  border-[4px] border-yellow-2`}></div>
                        <h1 className={`font-[Tenada] text-start mt-4 ${isTablet ? 'text-3xl' : 'text-4xl'}`}>전문가의 답변</h1>
                        {role === "MEMBER" ? (
                            <>
                                <div
                                    className='relative mt-10 rounded-lg mx-auto w-full h-[250px] text-start border-yellow-2 border-2 p-4'>
                                    <p className={`${isTablet ? 'text-4xl' : 'text-6xl'} items-center text-center mt-20 text-gray-500`}>아직
                                        등록된 답변이
                                        없습니다.</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <ComfortListenerRegister/>
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
