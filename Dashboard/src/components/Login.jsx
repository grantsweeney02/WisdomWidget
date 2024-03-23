import { useEffect, useState } from "react";
import { signInWithGooglePopup, auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import GoogleIcon from "@mui/icons-material/Google";

const Login = ({ data }) => {
    const [loggedIn, setLoggedIn] = useState(auth.currentUser);
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await signInWithGooglePopup();

        console.log(response);

        const request = {
            uid: response._tokenResponse.localId,
            email: response.user.email,
            firstName: response,
        };
        const localId = response._tokenResponse.localId;
    };

    const handleLogout = async () => {
        await auth.signOut();
        navigate("/");
    };

    // print when auth state changes
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                const request = {
                    uid: user.reloadUserInfo.localId,
                    email: user.email,
                    displayName: user.displayName,
                };
                setLoggedIn(true);
            } else {
                console.log("Logged out");
                setLoggedIn(false);
            }
        });
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
