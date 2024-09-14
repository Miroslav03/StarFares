"use client";
import { useState, FormEvent } from "react";
import useRequest from "@/hooks/useRequest";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { doRequest, errors } = useRequest({
        url: "/api/users/signin",
        method: "post",
        body: { email, password },
        onSuccess: () => router.push("/"),
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await doRequest();
    };

    return (
        <div className="flex w-full justify-center items-center py-[15rem] ">
            <div className="flex flex-col">
                <h1 className="font-semibold text-center mb-12 text-3xl ">
                    Sign in your account
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="email"
                            className="text-sm text-[#444444]"
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-[#f8f8f8] h-[2.4rem] rounded-[.5rem] pl-4 focus:outline-none focus:ring-2 focus:ring-[#f2e817]"
                            placeholder="john@email.com"
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-3">
                        <label
                            htmlFor="password"
                            className="text-sm text-[#444444]"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-[#f8f8f8] h-[2.4rem] rounded-[.5rem] pl-4 focus:outline-none focus:ring-2 focus:ring-[#f2e817]"
                            placeholder="********"
                        />
                    </div>
                    <div className="text-[#ff2c2c] text-center text-[0.8rem] mt-1 font-semibold">
                        {errors}
                    </div>
                    <div>
                        <button
                            style={{ color: "white" }}
                            className="bg-gradient-to-r from-[#ff8d09] to-[#f2e817] h-[2.4rem] w-full text-sm rounded-[.5rem] font-semibold uppercase mt-6 "
                        >
                            Sign In
                        </button>
                        <h2 className="mt-3 text-center">
                             Don't have an account?
                            <span className="text-[#f2e817] ml-2">SIGN UP</span>
                        </h2>
                    </div>
                </form>
            </div>
        </div>
    );
}
