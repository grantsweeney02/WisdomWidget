import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import dummyUser from "../dummyUser.json";
import NoteDetails from "./components/NoteDetails";
import ClassesSidebar from "./components/ClassesSidebar";
import AssignmentDetails from "./components/AssignmentDetails";
import { auth } from "../firebaseConfig";

import "./styles/theme.css";
import { useEffect, useState, createContext } from "react";

export const UserContext = createContext();

function App() {
    const [loggedIn, setLoggedIn] = useState(auth.currentUser);
    const [userData, setUserData] = useState(() => {
        // Retrieve userData from localStorage if available, otherwise return an empty object
        return JSON.parse(localStorage.getItem("userData")) || {};
    });

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });
    }, []);

    useEffect(() => {
        localStorage.setItem("userData", JSON.stringify(userData));
    }, [userData]);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            <BrowserRouter>
                <div className="container-fluid">
                    <div className="row">
                        {auth.currentUser && <ClassesSidebar />}
                        <Routes>
                            <Route
                                path="/"
                                element={<Login setUserData={setUserData} />}
                            />
                            <Route
                                path="/:classIDassignmentID"
                                element={<AssignmentDetails />}
                            />
                            <Route
                                path="/:classIDassignmentID/:noteID"
                                element={<NoteDetails />}
                            />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
