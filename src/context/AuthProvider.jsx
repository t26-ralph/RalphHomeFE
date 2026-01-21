import { useState, useEffect } from "react";
// Nhập đối tượng context từ tệp mới
import { AuthContext } from "./AuthContext";

// CHỈ xuất component
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}