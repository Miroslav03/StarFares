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
    console.log('Current user',currentUser);
    

    const authList: JSX.Element[] = [
        !currentUser && { label: "Sign Up", href: "/auth/signup" },
        !currentUser && { label: "Sign In", href: "/auth/signin" },
        currentUser && { label: "Sign Out", href: "/auth/signout" },
    ]
        .filter((item): item is AuthLink => Boolean(item))
        .map(({ label, href }) => (
            <li className="list-none mr-3" key={label}>
                <Link href={href}>{label}</Link>
            </li>
        ));

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-xl text-main-yellow-color">
                    StarFares
                </a>
            </div>
            <div className="navbar-end">
                {authList}
                <ThemeToggle />
            </div>
        </div>
    );
}
