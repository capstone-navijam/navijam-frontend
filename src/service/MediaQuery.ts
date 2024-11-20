import React, {useEffect, useState} from 'react';
import {useMediaQuery} from "react-responsive";

export const useMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    const mobile = useMediaQuery({query: '(max-width:767px)'});

    useEffect(() => {
        setIsMobile(mobile);
    }, [mobile]);

    return isMobile;
}

export const useTabletHeight = () => {
    const [isTabletHeight, setIsTabletHeight] = useState(false);
    const tabletHeight = useMediaQuery({query: '(min-width: 834px) and (max-width: 1023px)'});

    useEffect(() => {
        setIsTabletHeight(tabletHeight);
    }, [tabletHeight]);

    return isTabletHeight;
}

export const usePC = () => {
    const [isPC, setIsPC] = useState(false);
    const PC = useMediaQuery({query: '(min-width: 1920px) and (max-width: 2560px)'});

    useEffect(() => {
        setIsPC(PC);
    }, [PC]);

    return isPC;
}


export const useTabletWidth = () => {
    const [isTabletWidth, setIsTabletWidth] = useState(false);
    const tabletWidth = useMediaQuery({query: '(min-width: 1194px) and (max-width: 1920px)'});

    useEffect(() => {
        setIsTabletWidth(tabletWidth);
    }, [tabletWidth]);

    return isTabletWidth;
}