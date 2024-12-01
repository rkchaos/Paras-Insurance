import { createContext, useState } from "react";

export const ClientContext = createContext();
export const ClientProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [condenseClientInfo, setCondenseClientInfo] = useState(null);

    return (
        <ClientContext.Provider value={{ isLoggedIn, setIsLoggedIn, condenseClientInfo, setCondenseClientInfo }}>
            {children}
        </ClientContext.Provider>
    )
}