"use client"

import {io} from "socket.io-client"
import {getCookie} from "cookies-next";

const token = getCookie("accessToken")

export const socket = io(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/chat`, {
    auth: {
        token: `Bearer ${token}`,
    }
})