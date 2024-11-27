"use client"
import React, {useEffect} from 'react';
import {useMobile, useTabletHeight} from "@/service/MediaQuery";


export default function ListenerCareerModify({careerField, setCareerField}) {

    const isTabletHeight = useTabletHeight();

    useEffect(() => {
        if (careerField.length === 0) {
            setCareerField([""]);
        }
    }, [careerField, setCareerField]);


    const addCareerField = () => {
        setCareerField([...careerField, ""]);
    }

    const removeCareerField = (index) => {
        setCareerField(careerField.filter((_, i) => i !== index))
    }

    const handleChange = (index, value) => {
        const updatedField = [...careerField];
        updatedField[index] = value;
        setCareerField(updatedField);
    }

    return (
        <>
            {/* 경력 label과 입력 필드들 */}
            <div className='flex flex-row w-full items-center'>
                <label htmlFor='career' className={`text-3xl w-36`}>경력</label>
                <div className="flex flex-col w-full mx-2 gap-2">
                    {careerField.map((field, index) => (
                        <div key={index} className='flex'>
                            <input
                                id={`career-${index}`}
                                className={`block border w-full border-yellow-6 p-2 rounded placeholder:text-2xl text-3xl`}
                                type="text"
                                value={field}
                                pattern="^[\s\w\d가-힣]{1,30}$"
                                onChange={(e) => handleChange(index, e.target.value)}
                                placeholder="경력을 입력해주세요"
                            />
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeCareerField(index)}
                                    className='-mx-6 font-bold text-gray-500'
                                >
                                    X
                                </button>
                            )}
                        </div>
                    ))}
                    <div
                        className=' border mt-4 border-dotted p-1 w-fit rounded-lg border-gray-500 text-xl text-gray-500 cursor-pointer'
                        onClick={addCareerField}
                    >
                        + 경력 추가
                    </div>
                </div>
            </div>


        </>
    );
}