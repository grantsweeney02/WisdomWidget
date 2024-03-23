import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import dummyUser from "../dummyUser.json";
import NoteDetails from "./components/NoteDetails";
import ClassesSidebar from "./components/ClassesSidebar";
import AssignmentDetails from "./components/AssignmentDetails";
import { auth } from "../firebaseConfig";

import "./styles/theme.css";
import { useEffect, useState } from "react";

function App() {
    const [loggedIn, setLoggedIn] = useState(auth.currentUser);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });
    }, []);

    return (
        <>
            <BrowserRouter>
                <div className="container-fluid">
                    <div className="row">
                        {auth.currentUser && <ClassesSidebar />}
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route
                                path="/:assignmentID"
                                element={<AssignmentDetails data={dummyUser} />}
                            />
                            <Route
                                path="/:assignmentID/:noteID"
                                element={<NoteDetails />}
                            />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
