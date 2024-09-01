import axios, { AxiosError } from "axios";
import { useState } from "react";

interface BodyData {
    email: string;
    password: string;
}
interface UseRequestProps {
    url: string;
    method: "get" | "post" | "put" | "delete";
    body?: BodyData;
}
interface SerializedError {
    message: string;
    field?: string;
}
interface ErrorResponse {
    errors: SerializedError[];
}
export default function useRequest({ url, method, body }: UseRequestProps) {
    const [errors, setErrors] = useState<JSX.Element | null>(null);

    const doRequest = async () => {
        try {
            const response = await axios[method](url, body);
            setErrors(null);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response && axiosError.response.data.errors) {
                setErrors(
                    <div className="mt-2">
                        {axiosError.response.data.errors.map(
                            (error: SerializedError, index: number) => (
                                <p
                                    key={index}
                                >
                                    {error.message}
                                </p>
                            )
                        )}
                    </div>
                );
            }
        }
    };

    return { doRequest, errors };
}
