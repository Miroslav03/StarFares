"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Ticket {
    id: string;
    title: string;
    price: number;
}

export default function MyPage() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const { data } = await axios.get<Ticket[]>("/api/tickets");
                setTickets(data);
            } catch (err) {
                setError("Error fetching tickets");
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{error}</h1>;

    return (
        <div className="w-full min-h-[550px] mt-20 flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%]">
                {tickets.map((ticket: Ticket) => (
                    <div className="bg-main-gray-color rounded-lg border-2 border-[#ffffff] p-6 flex flex-col justify-between h-40">
                        {/* Title and Price */}
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl text-[#ffffff] font-semibold">
                                {ticket.title}
                            </h1>
                            <p className="text-lg text-white">
                                Price:{" "}
                                <span className="text-main-orange-color font-bold text-xl">
                                    {ticket.price}$
                                </span>
                            </p>
                        </div>

                        {/* Details Button */}
                        <div className="flex justify-end">
                            <Link
                                href={"/tickets/[ticketId]"}
                                as={`/tickets/${ticket.id}`}
                            >
                                <button className="rounded-xl text-[#ffffff] bg-[#000000] text-lg px-4 py-2 hover:bg-gray-800 transition duration-300">
                                    Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
