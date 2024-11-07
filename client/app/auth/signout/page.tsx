"use client";
import AuthContext from "@/app/context/AuthContext";
import useRequest from "@/hooks/useRequest";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { mutate } from "swr";

export default function Signout() {
    const router = useRouter();

    const { refreshUser } = useContext(AuthContext);

    const { doRequest } = useRequest({
        url: "/api/users/signout",
        method: "post",
        body: {},
        onSuccess: async () => {
            await refreshUser(); // Refresh context after successful sign-in
            router.push("/");
        },
    });

    useEffect(() => {
        console.log("hereeee");
        doRequest();
    }, []);

    return <div>Signing out...</div>;
}
