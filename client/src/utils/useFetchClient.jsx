import { useState, useEffect, useContext } from 'react';
// importing api end-points
import { fetchCondenseClientInfo } from '../api';
// importing contexts
import { ClientContext } from '../contexts/Client.context';

const useFetchClient = () => {
    const [loading, setLoading] = useState(true);

    const { isLoggedIn, setIsLoggedIn, condenseClientInfo, setCondenseClientInfo } = useContext(ClientContext);

    const fetchClientInfoFromDataBase = async () => {
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