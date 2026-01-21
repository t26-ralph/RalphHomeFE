import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function MomoReturnPage() {
    const location = useLocation();
    const [status, setStatus] = useState("Processing...");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const resultCode = params.get("resultCode");
        if (resultCode === "0") setStatus("Payment successful!");
        else setStatus("Payment failed or canceled");
    }, [location]);

    return (
        <div className="p-4 text-center">
            <h2 className="text-2xl font-bold">{status}</h2>
        </div>
    );
}
