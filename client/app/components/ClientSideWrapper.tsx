"use client";
import useSWR from "swr";
import axios from "axios";
import Header from "./Header";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function ClientSideWrapper({ initialUserData }: { initialUserData: any }) {
    const { data: userData, error } = useSWR(
        "/api/users/currentuser",
        fetcher,
        { fallbackData: initialUserData, revalidateOnFocus: true }
    );

    return <Header currentUser={userData?.currentUser || null} />;
}

export default ClientSideWrapper;
