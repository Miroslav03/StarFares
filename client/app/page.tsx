// app/page.tsx
"use client";

import { useContext } from "react";
import AuthContext from "./context/AuthContext";

export default function MyPage() {
    const { currentUser } = useContext(AuthContext);

    return (
        <div>
            {currentUser ? (
                <h1>Hello {currentUser.email}!</h1>
            ) : (
                <h1>Hello guest!</h1>
            )}
        </div>
    );
}
