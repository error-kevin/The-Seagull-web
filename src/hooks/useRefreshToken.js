import axios from '../api/axios';
import useAuth from './useAuth';
import { getEmailFromToken } from './authUtils';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    
    const refresh = async () => {
        try{
            const response = await axios.get('/refresh', {
                withCredentials: true
            });
        
            const email = getEmailFromToken(response?.data?.accessToken)
            
            const responsedata = await axios.get(`/users/${email}`, {
                headers: {
                    Authorization: `Bearer ${response?.data?.accessToken}`,
                },
            });
            setAuth(prev => {
                
                return { 
                    ...prev,
                    
                    email:email,
                    accessToken: response?.data?.accessToken,
                    roles: responsedata?.data?.roles,
                    username: responsedata?.data?.username,
                    firstname: responsedata?.data?.firstname,
                    lastname: responsedata?.data?.lastname,
                    mobileNumber: responsedata?.data?.mobilenumber,
                    whatsmobileNumber: responsedata?.data?.whatsmobilenumber,
                    stdcode: responsedata?.data?.stdcode,
                    pfpUrl:responsedata?.data?.pfp
                }
            });
            return response.data.accessToken;
        }
        catch(err){
            console.error(err)
        }
    }
    return refresh;
};

export default useRefreshToken;
