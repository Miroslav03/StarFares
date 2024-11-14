"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Order {
    id: string;
    userId: string;
    status: string;
    expiresAt: any;
    ticket: Ticket;
}

interface Ticket {
    id: string;
    title: string;
    price: number;
}

export default function AllOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get<Order[]>("/api/orders");
                console.log(data);
                setOrders(data);
            } catch (err) {
                setError("Error fetching orders");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{error}</h1>;

    return (
        <div className="w-full min-h-[550px] mt-20 flex justify-center">
            <div className="grid grid-cols-3 gap-x-6 w-[60%]">
                {orders.map((order: Order) => (
                    <div className="bg-[#ffffff] rounded-lg  h-36 border-gra">
                        <h1>
                            {order.ticket.title} - {order.status}
                        </h1>
                    </div>
                ))}
            </div>
        </div>
    );
}
