import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }
        
        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
        

        return () => isMounted = false;
        
    }, [isLoading,persist,refresh,auth?.accessToken])

    useEffect(() => {
        if (!isLoading) {
            const delayTimer = setTimeout(() => {
                // Clear the timer to prevent memory leaks
                clearTimeout(delayTimer);
                setIsLoading(false); // Set isLoading to false after the delay
            }, 1000)
        }
    }, [isLoading,auth?.accessToken])

    return (
        <>
            {!persist
                ?   <Outlet/>
                :   isLoading
                    ?   <div className="loading-main"/>
                    :   <Outlet />
            }
        </>
    )
}

export default PersistLogin