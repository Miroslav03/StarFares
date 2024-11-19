"use client";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import useRequest from "@/hooks/useRequest";
import { useParams, useRouter } from "next/navigation";
import AuthContext from "@/app/context/AuthContext";

interface Ticket {
    id: string;
    title: string;
    price: number;
}

export default function TicketShow() {
    const { ticketId } = useParams();
    const router = useRouter();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { refreshUser } = useContext(AuthContext);

    useEffect(() => {
        if (ticketId) {
            const fetchTicket = async () => {
                try {
                    const { data } = await axios.get<Ticket>(
                        `/api/tickets/${ticketId}`
                    );
                    setTicket(data);
                } catch (err) {
                    setError("Error fetching ticket details");
                } finally {
                    setLoading(false);
                }
            };

            fetchTicket();
        }
    }, [ticketId]);

    const { doRequest, errors } = useRequest({
        url: "/api/orders",
        method: "post",
        body: { ticketId },
        onSuccess: async (order) => {
            await refreshUser();
            router.push(`/orders/${order.id}`);
            console.log(order);
        },
    });

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{error}</h1>;
    if (!ticket) return <h1>Ticket not found</h1>;

    return (
        <div className="w-full min-h-[100px] mt-20 flex justify-center">
            <div className="bg-main-gray-color p-6 rounded-lg shadow-lg w-[60%] flex flex-col gap-6 border-2 border-[#ffffff]">
                <h1 className="text-3xl font-semibold text-[#ffffff]">
                    {ticket.title}
                </h1>

                <p className="text-lg text-[#ffffff]">
                    Price:{" "}
                    <span className="text-main-orange-color font-bold text-xl">
                        {ticket.price}$
                    </span>
                </p>

                <div className="flex justify-end">
                    <button
                        onClick={() => doRequest()}
                        className="rounded-xl text-[#ffffff] bg-[#000000] text-lg px-6 py-3 hover:bg-gray-800 transition duration-300"
                    >
                        Purchase
                    </button>
                </div>
            </div>
        </div>
    );
}
