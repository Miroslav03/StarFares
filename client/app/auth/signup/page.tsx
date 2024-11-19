"use client";
import { useState, FormEvent, useContext } from "react";
import useRequest from "@/hooks/useRequest";
import { useRouter } from "next/navigation";
import AuthContext from "@/app/context/AuthContext";

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { refreshUser } = useContext(AuthContext);

    const { doRequest, errors } = useRequest({
        url: "/api/users/signup",
        method: "post",
        body: { email, password },
        onSuccess: async () => {
            await refreshUser(); // Refresh context after successful sign-in
            router.push("/");
        },
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await doRequest();
    };

    return (
        <div className="flex w-full justify-center items-center py-[15rem] ">
            <div className="flex flex-col">
                <h1 className="font-semibold text-center mb-12 text-3xl ">
                    Create your account
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="email"
                            className="text-sm text-[#ffffff]"
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-[#f8f8f8] h-[2.4rem] rounded-[.5rem] pl-4 focus:outline-none focus:ring-2 focus:ring-[#ffffff] text-main-black-color"
                            placeholder="john@email.com"
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-3">
                        <label
                            htmlFor="password"
                            className="text-sm text-[#ffffff]"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-[#f8f8f8] h-[2.4rem] rounded-[.5rem] pl-4 focus:outline-none focus:ring-2 focus:ring-[#ffffff] text-main-black-color"
                            placeholder="********"
                        />
                    </div>
                    <div className="text-[#ffffff] text-center text-[0.8rem] mt-3 font-semibold">
                        {errors}
                    </div>
                    <div>
                        <button
                            style={{ color: "white" }}
                            className="bg-main-gray-color h-[2.4rem] w-full text-sm rounded-[.5rem] font-semibold uppercase mt-6 "
                        >
                            Sign Up
                        </button>
                        <h2 className="mt-3 text-center">
                            Have an account?
                            <span className="text-[#ffffff] ml-2">SIGN IN</span>
                        </h2>
                    </div>
                </form>
            </div>
        </div>
    );
}
