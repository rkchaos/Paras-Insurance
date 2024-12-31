import { useState, useEffect, useContext } from "react";
import { fetchCondenseClientInfo } from "../api";
import { ClientContext } from "../contexts/Client.context";

const useFetchClient = () => {
    const [loading, setLoading] = useState(true);

    const { isLoggedIn, setIsLoggedIn, condenseClientInfo, setCondenseClientInfo } = useContext(ClientContext);

    async function fetchClientInfoFromDataBase() {
        try {
            const { data } = await fetchCondenseClientInfo();
            setCondenseClientInfo(data);
            setIsLoggedIn(true);
        } catch (error) {
            setCondenseClientInfo(null);
            setIsLoggedIn(false);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (!condenseClientInfo) {
            fetchClientInfoFromDataBase();
        }
    }, [condenseClientInfo]);

    return { loading, isLoggedIn, condenseClientInfo };
};

export default useFetchClient;