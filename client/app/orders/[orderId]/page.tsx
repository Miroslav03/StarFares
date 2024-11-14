import AuthContext from "@/app/context/AuthContext";
import useRequest from "@/hooks/useRequest";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";

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

export default function OrderShow() {
    const { orderId } = useParams();
    const router = useRouter();

    const [order, setOrder] = useState<Order | null>(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (orderId) {
            const fetchTicket = async () => {
                try {
                    const { data } = await axios.get<Order>(
                        `/api/orders/${orderId}`
                    );
                    setOrder(data);
                } catch (err) {
                    setError("Error fetching order details");
                } finally {
                    setLoading(false);
                }
            };

            fetchTicket();
        }
    }, [orderId]);

    useEffect(() => {
        const findTimeLeft = () => {
            const expirationDate = new Date(order!.expiresAt);
            const msLeft = expirationDate.getTime() - new Date().getTime();
            setTimeLeft(Math.round(msLeft / 1000));
        };
        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, [order]);

    const { doRequest, errors } = useRequest({
        url: "/api/orders",
        method: "post",
        body: { orderId: order!.id },
        onSuccess: async (payment) => {
            console.log(payment);
        },
    });

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{error}</h1>;

    if (timeLeft < 0) {
        return <div className="text-4xl">Order Expired</div>;
    }

    return (
        <div className="w-full min-h-[550px] mt-20 flex justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[60%]">
                <p className="text-lg text-gray-700">
                    Time left to pay:
                    <span className="text-main-orange-color font-bold text-xl">
                        {timeLeft}
                    </span>
                </p>
                <StripeCheckout
                    token={(token) => doRequest({ token })}
                    stripeKey="pk_test_51QDRR2KbAtMmiqKgOqJISSs2ypeqRtzh4kZrgsSvDtUEx1pAHaf3FuTDsdPWmS3FfjZytbT87HFNJOEaXxEhbMct00rhr2gLYI"
                    amount={order!.ticket.price * 100}
                    email={currentUser?.email}
                />
            </div>
        </div>
    );
}
