import { useEffect, useState } from "react";
import { signInWithGooglePopup, auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";

const Login = ({ data, setUserData }) => {
    const [loggedIn, setLoggedIn] = useState(auth.currentUser);
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await signInWithGooglePopup();
        const request = {
            uid: response._tokenResponse.localId,
            email: response.user.email,
            firstName: response,
        };
        const localId = response._tokenResponse.localId;
    };


    useEffect(() => {
        const checkUser = async (user) => {
            if (user) {
                const request = {
                    uid: user.reloadUserInfo.localId,
                    email: user.email,
                    displayName: user.displayName,
                };
                console.log("Request: ", request);
                try {
                    const response = await axios.post(
                        "http://localhost:8000/users/retrieveUserData",
                        request
                    );
                    console.log("Response: ", response);
                    setUserData(response.data);
                    setLoggedIn(true);
                } catch (error) {
                    console.error("Error retrieving user data: ", error);
                }
            } else {
                console.log("Logged out");
                setLoggedIn(false);
            }
        };
    
        const unsubscribe = auth.onAuthStateChanged(checkUser);
    
        return () => unsubscribe();
    }, []);

    return (
        <div className="login-container">
            <h1>Welcome to ____!</h1>
            {!loggedIn && (
                <button
                    className="btn btn-primary login-button"
                    onClick={() => handleLogin()}
                >
                    <GoogleIcon style={{ marginRight: "5px" }} />
                    Login with Google
                </button>
            )}
        </div>
    );
};

export default Login;
