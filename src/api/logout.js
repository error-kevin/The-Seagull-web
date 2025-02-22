import { GoogleLogout } from 'react-google-login';

const clientid = "834076948983-uijgu2upatm0sfppdln0087fh0etojkt.apps.googleusercontent.com"

function Logout() {

    const onSuccess = (res) =>{
        console.log("LOGOUT SUCCESSFUL");
    }


    return(
        <div id="signOutbutton">
            <GoogleLogout
                clientId={clientid}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}
export default Logout