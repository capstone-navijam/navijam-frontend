import React from 'react';

export default function MyPageProfileSkeleton() {
    return (
        <article className="w-full animate-pulse">
            <h1 className="text-6xl w-fit font-semibold mt-4 bg-gray-300 h-12 w-40 rounded"></h1>
            <div
                className="border-4 border-gray-200 rounded-2xl flex flex-row mt-24 items-center w-[95%] mx-auto min-h-[480px] p-4 gap-4"
            >
                {/* Skeleton for Profile Image */}
                <div className="w-[250px] h-[250px] bg-gray-300 rounded-full"></div>

                <div className="flex flex-col gap-20 w-full">
                    {/* Skeleton for Nickname */}
                    <div className="flex flex-row justify-between">
                        <div className="h-10 bg-gray-300 rounded w-[60%]"></div>
                        <div className="h-10 bg-gray-300 rounded w-[30%]"></div>
                    </div>

                    {/* Skeleton for Email */}
                    <div className="flex flex-row justify-between">
                        <div className="h-10 bg-gray-300 rounded w-[60%]"></div>
                        <div className="h-10 bg-gray-300 rounded w-[30%]"></div>
                    </div>
                </div>
            </div>
        </article>
    );
}
