"use client";
import useRequest from "@/hooks/useRequest";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { mutate } from "swr";

export default function Signout() {
    const router = useRouter();
    const { doRequest } = useRequest({
        url: "/api/users/signout",
        method: "post",
        body: {},
        onSuccess: () => {
            mutate("/api/users/currentuser");
            router.push("/");
        },
    });

    useEffect(() => {
        console.log('hereeee');
        doRequest();
    }, []);

    return <div>Signing out...</div>;
}
