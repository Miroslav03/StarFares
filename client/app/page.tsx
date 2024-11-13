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
            <div className="grid grid-cols-3 gap-x-6 w-[60%]">
                {tickets.map((ticket: Ticket) => (
                    <div className="bg-[#ffffff] rounded-lg  h-36 border-gra">
                        <div className="mt-6 flex flex-col items-center gap-2">
                            <h1 className="text-xl text-[#000000] text-bold">
                                {ticket.title}
                            </h1>
                            <p className="text-lg text-[#000000]">
                                Price:
                                <span className="text-main-orange-color font-bold text-xl">
                                    {ticket.price}
                                </span>
                            </p>
                            <Link
                                href={"/tickets/[ticketId]"}
                                as={`/tickets/${ticket.id}`}
                            >
                                <button className="rounded-xl text-[#ffffff] bg-[#000000] text-lg px-4 py-2">Details</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
