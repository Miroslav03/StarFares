// app/components/Header.tsx
"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

interface AuthLink {
    label: string;
    href: string;
}

export default function Header() {
    const { currentUser } = useContext(AuthContext);
    console.log("Current user", currentUser);

    const links: JSX.Element[] = [
        !currentUser && { label: "Sign Up", href: "/auth/signup" },
        !currentUser && { label: "Sign In", href: "/auth/signin" },
        currentUser && { label: "Create ticket", href: "/tickets/new" },
        currentUser && { label: "My orders", href: "/orders/all" },
        currentUser && { label: "Sign Out", href: "/auth/signout" },
    ]
        .filter((item): item is AuthLink => Boolean(item))
        .map(({ label, href }) => (
            <li className="list-none mr-3" key={label}>
                <Link href={href}>{label}</Link>
            </li>
        ));

    return (
        <div className="flex justify-between items-center bg-main-black-color py-6 px-4">
            <div className="">
                <Link
                    href={"/"}
                    className=" text-4xl font-semibold"
                >
                    StarFares
                </Link>
            </div>
            <div className="flex text-xl text-[#ffffff]">
                {links}
                {/*  <ThemeToggle /> */}
            </div>
        </div>
    );
}
