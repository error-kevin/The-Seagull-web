import { GoogleLogin } from 'react-google-login';

const clientid = "834076948983-uijgu2upatm0sfppdln0087fh0etojkt.apps.googleusercontent.com"

function Login() {

    const onSuccess = (res) =>{
        console.log("LOGIN SUCCESS! Current user:",res.profileObj);
    }

    const onFailure = (res) =>{
        console.log("LOGIN FAILURE! res:",res);
    }

    return(
        <div id="signinbutton">
            <GoogleLogin
                clientId={clientid}
                buttonText="login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}
export default Login