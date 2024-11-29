import { createContext, useState } from "react";

export const ClientContext = createContext();
export const ClientProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [condenseClientInfo, setCondenseClientInfo] = useState({
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    }
    );
    // const [snackbarValue, setSnackbarValue] = useState({ message: "", status: "" });

    return (
        <ClientContext.Provider value={{ isLoggedIn, setIsLoggedIn, condenseClientInfo, setCondenseClientInfo }}>
            {children}
        </ClientContext.Provider>
    )
}