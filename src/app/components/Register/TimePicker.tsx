import React from 'react';

interface TimePickerProps {
    time: string[];
    handleTimeScroll: (e) => void;
    selectedTime: string;
}

export function TimePicker({time, handleTimeScroll, selectedTime}: TimePickerProps) {

    return (<div className="h-[140px] relative w-16">
        <div className="absolute pointer-events-none top-[50px] right-[14px] h-10 w-10 border-y-2"/>
        <div
            className="h-full overflow-auto scrollbar-hide snap-y snap-mandatory overscroll-contain py-[60px]"
            onScroll={handleTimeScroll}
        >
            {/* 시간/분 아이템들 */}
            {time.map((t) => (
                <div
                    key={t}
                    className={`h-[40px] flex items-center justify-center snap-center
        ${
                        selectedTime === t
                            ? "text-black text-2xl font-medium mt:border-solid"
                            : "text-gray-400"
                    }`}
                >
                    {t}
                </div>
            ))}
        </div>
    </div>);
}