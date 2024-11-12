"use client";
import AuthContext from "@/app/context/AuthContext";
import useRequest from "@/hooks/useRequest";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";

export default function NewTicket() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");

    const { refreshUser } = useContext(AuthContext);

    const { doRequest, errors } = useRequest({
        url: "/api/tickets",
        method: "post",
        body: { title, price },
        onSuccess: async () => {
            await refreshUser();
            router.push("/");
        },
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await doRequest();
    };

    const roundValue = () => {
        const value = parseFloat(price);

        if (isNaN(value)) {
            return;
        }

        setPrice(value.toFixed(2));
    };

    return (
        <div className="flex w-full justify-center items-center py-[15rem] ">
            <div className="flex flex-col">
                <h1 className="font-semibold text-center mb-12 text-3xl ">
                    Create a ticket
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="email"
                            className="text-sm text-[#444444]"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-[#f8f8f8] h-[2.4rem] rounded-[.5rem] pl-4 focus:outline-none focus:ring-2 focus:ring-[#f2e817]"
                            placeholder="Titanic"
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-3">
                        <label
                            htmlFor="password"
                            className="text-sm text-[#444444]"
                        >
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            onBlur={roundValue}
                            className="bg-[#f8f8f8] h-[2.4rem] rounded-[.5rem] pl-4 focus:outline-none focus:ring-2 focus:ring-[#f2e817]"
                            placeholder="123"
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
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
