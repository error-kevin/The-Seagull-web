import axios from '../api/axios';
import useAuth from './useAuth';
import { getEmailFromToken } from './authUtils';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        const email = getEmailFromToken(response.data.accessToken)
        
        const responsedata = await axios.get(`/users/${email}`, {
            headers: {
                Authorization: `Bearer ${response.data.accessToken}`,
            },
        });
        
        setAuth(prev => {
            
            return { 
                ...prev,
                
                email:email,
                accessToken: response.data.accessToken,
                roles: responsedata?.data?.roles,
                Username: responsedata?.data?.username,
                Firstname: responsedata?.data?.firstname,
                Lastname: responsedata?.data?.lastname,
                MobileNumber: responsedata?.data?.mobilenumber,
                AltMobileNumber: responsedata?.data?.altmobilenumber,
                WhatsMobileNumber: responsedata?.data?.whatsmobilenumber,
                SchoolName: responsedata?.data?.schoolname,
                UserClass: responsedata?.data?.class,
                StdCode: responsedata?.data?.stdcode, }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
