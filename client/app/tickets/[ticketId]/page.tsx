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
        <div className="w-full min-h-[550px] mt-20 flex justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[60%]">
                <h1 className="text-2xl font-bold text-black">
                    {ticket.title}
                </h1>
                <p className="text-lg text-gray-700">
                    Price:
                    <span className="text-main-orange-color font-bold text-xl">
                        {ticket.price}
                    </span>
                </p>
                <button
                    onClick={() => doRequest()}
                    className="mt-4 rounded-xl text-white bg-black text-lg px-4 py-2"
                >
                    Purchase
                </button>
            </div>
        </div>
    );
}
