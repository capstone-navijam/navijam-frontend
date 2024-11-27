import React, {useEffect, useState} from 'react';
import {useTabletHeight} from "@/service/MediaQuery";
import {ListenerConsole} from "@/app/components/MyPage/ListenerProfile";
import Link from "next/link";
import Pagination from "@mui/material/Pagination";

export default function MyConsole() {

    const isTabletHeight = useTabletHeight();
    const [console, setConsole] = useState(null);

    const [consolePage, setConsolePage] = useState(1);
    const consolePerPage = 8;

    useEffect(() => {
        const fetchConsoles = async () => {
            try {
                const data = await ListenerConsole();
                setConsole(data);
            } catch (error) {
                console.error('데이터를 가져오는 데 실패했습니다.', error);
                setConsole([]);
            }
        };
        fetchConsoles();
    }, [])

    if (console === null) {
        return (
            <>
                <h1 className="text-6xl font-semibold mt-4">위로하기 목록</h1>
                <div
                    className="border-4 border-yellow-2 w-full min-h-[660px] rounded-2xl mt-4 text-4xl flex items-center justify-center">
                    데이터를 불러오는 중입니다...
                </div>
            </>);
    }
    if (console.length === 0) {
        return (
            <>
                {isTabletHeight ? (<>
                    <div
                        className="border-4 mt-4 border-yellow-2 w-full min-h-[660px] rounded-2xl text-4xl flex items-center justify-center">
                        등록한 위로하기 글이 없습니다.
                    </div>
                </>) : (<>
                    <h1 className="text-6xl font-semibold mt-4">위로하기 목록</h1>
                    <div
                        className="border-4 mt-4 border-yellow-2 w-full min-h-[660px] rounded-2xl text-4xl flex items-center justify-center">
                        등록한 위로하기 글이 없습니다.
                    </div>
                </>)}
            </>);
    }

    const currentConsole = console.slice(
        (consolePage - 1) * consolePerPage,
        consolePage * consolePerPage
    );


    return (<>
        {isTabletHeight ? (<></>) : (<>
                <article className="w-full min-h-[805px]">
                    <h1 className="text-6xl font-semibold mt-4">위로하기 목록</h1>
                    <div
                        className="border-4 border-yellow-2 w-full min-h-[660px] rounded-2xl p-3 mt-4 flex flex-col justify-between">
                        <div>
                            <h2 className="text-5xl font-semibold mb-4 mt-4">답변 완료</h2>
                            {console.length > 0 ? (
                                <div className="min-h-[300px]">
                                    {currentConsole.map(item => (
                                        <Link href={`/comforts/${item.id}`} key={item.id}>
                                            <div className="p-2 border-b flex flex-row justify-between items-center">
                                                <p className="text-2xl text-yellow-2 font-bold mt-2">
                                                    #{item.categories.join(" #")}
                                                </p>
                                                <p className="text-3xl font-medium">{item.title}</p>
                                                <p className="text-xl text-gray-500">
                                                    {new Date(item.timestamp).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex justify-center items-center text-4xl min-h-[240px]">
                                    아직 등록한 위로하기 글이 없습니다.
                                </div>
                            )}
                        </div>
                        <div className="flex justify-center mt-4">
                            <Pagination
                                count={Math.ceil(console.length / consolePerPage)}
                                page={consolePage}
                                onChange={(e, page) => setConsolePage(page)}
                            />
                        </div>
                    </div>

                </article>
            </>
        )}
    </>);
}