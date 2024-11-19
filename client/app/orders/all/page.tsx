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
        <div className="w-full min-h-[100px] mt-20 flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[70%]">
                {orders.map((order: Order) => (
                    <div
                        key={order.id}
                        className="bg-main-gray-color p-4 rounded-lg shadow-lg border-2 border-[#ffffff] flex flex-col justify-between"
                    >
                        {/* Order Details */}
                        <div className="flex flex-col gap-2">
                            <h1 className="text-xl font-semibold text-[#ffffff]">
                                {order.ticket.title}
                            </h1>
                            <p className="text-md text-[#ffffff]">
                                Status:{" "}
                                <span
                                    className={`font-bold ${
                                        order.status === "Completed"
                                            ? "text-green-500"
                                            : "text-main-orange-color"
                                    }`}
                                >
                                    {order.status}
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
