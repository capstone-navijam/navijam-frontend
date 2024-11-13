'use client'

import React from 'react';
import MultiCarousel from "@/app/components/Mainpage/MultiCarousel";
import MainComfort from "@/app/components/Mainpage/MainComfort";
import MainListeners from "@/app/components/Mainpage/MainListeners";
import MainCommunity from "@/app/components/Mainpage/MainCommunity";
import MainSideBar from "@/app/components/Mainpage/MainSideBar";
import { usePC} from "@/service/MediaQuery";


export default function MainPage() {
    const isPC = usePC();
    return (
        <>
        <MultiCarousel/>
        {isPC ? (<MainSideBar/>) : (<></>)}
        <MainComfort/>
        <MainListeners/>
        <MainCommunity/>
    </>);
}