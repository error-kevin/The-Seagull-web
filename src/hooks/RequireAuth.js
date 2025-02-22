import { useLocation,Navigate,Outlet } from "react-router-dom";
import useAuth from "./useAuth";
import { getRolesFromToken } from "./authUtils";

const RequireAuth = ({ allowedroles })=>{
    const {auth} = useAuth();
    const location = useLocation();
    
    

    const roles = getRolesFromToken(auth?.accessToken);
    return(
        roles?.find(role => allowedroles?.includes(role))
            ? <Outlet/>
            : auth?.email
                ? <Navigate to="/unauthorised" state={{from:location}} replace/>
                : <Navigate to="/signin" state={{from:location}} replace />
    );
}


export default RequireAuth ;
