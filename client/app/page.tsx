import axios from "axios";
import { headers } from "next/headers";
const getUser = async (cookieHeader: string) => {
    const { data } = await axios.get(
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
        {
            headers: {
                Host: "localhost",
                Cookie: cookieHeader,
            },
        }
    );
    return data;
};

export default async function MyPage() {
    const headersList = headers();
    const cookieHeader = headersList.get("cookie") || "";

    const userData = await getUser(cookieHeader);

    console.log(userData);

    return cookieHeader ? (
        <h1>Hello {userData.currentUser.email}!</h1>
    ) : (
        <h1>Hello guest!</h1>
    );
}
