import { useEffect, useState } from "react";
import { signInWithGooglePopup, auth } from "../../firebaseConfig";

const Dashboard = ({ data }) => {
    const [loggedIn, setLoggedIn] = useState(auth.currentUser);

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

    // print when auth state changes
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                const request = {
                    uid: user.reloadUserInfo.localId,
                    email: user.email,
                    displayName: user.displayName,
                };
                console.log("Request: ", request);
                setLoggedIn(true);
            } else {
                console.log("Logged out");
                setLoggedIn(false);
            }
        });
    }, []);

    return (
        <>
            <h1>Dashboard</h1>
            {!loggedIn && <button onClick={() => handleLogin()}>Login</button>}
            {loggedIn && <button onClick={() => auth.signOut()}>Logout</button>}
        </>
    );
};

export default Dashboard;
