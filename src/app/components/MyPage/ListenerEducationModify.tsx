"use client"
import React, {useEffect} from 'react';
import {useMobile, useTabletHeight} from "@/service/MediaQuery";


export default function ListenerEducationModify({educationField, setEducationField}) {

    const isTabletHeight = useTabletHeight();

    useEffect(() => {
        if (educationField.length === 0) {
            setEducationField([""]);
        }
    }, [educationField, setEducationField]);


    const addCareerField = () => {
        setEducationField([...educationField, ""]);
    }

    const removeCareerField = (index) => {
        setEducationField(educationField.filter((_, i) => i !== index))
    }

    const handleChange = (index, value) => {
        const updatedField = [...educationField];
        updatedField[index] = value;
        setEducationField(updatedField);
    }

    return (
        <>
            {/* 경력 label과 입력 필드들 */}
            <div className='flex flex-row w-full items-center'>
                <label htmlFor='education' className={`text-3xl w-36`}>학력</label>
                <div className="flex flex-col w-full mx-2">
                    {educationField.map((field, index) => (
                        <div key={index} className='flex gap-2'>
                            <input
                                id={`career-${index}`}
                                className={`block border w-full border-yellow-6 p-2 rounded placeholder:text-2xl text-3xl`}
                                type="text"
                                value={field}
                                pattern="^[\s\w\d가-힣]{1,30}$"
                                onChange={(e) => handleChange(index, e.target.value)}
                                placeholder="학력을 입력해주세요"
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
                        + 학력 추가
                    </div>
                </div>
            </div>


        </>
    )
        ;
}