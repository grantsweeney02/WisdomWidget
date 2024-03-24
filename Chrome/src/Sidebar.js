import React, { useState, useEffect } from "react";
import HomePage from "./HomePage";
import TextNote from "./TextNote";
import TextExplain from "./TextExplain";
import TextSearch from "./TextSearch";
import "./styles/styles.css";
import dummyData from "./dummyData";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function Sidebar() {
    const [url, setUrl] = useState("");
    const [source, setSource] = useState("");
    const [textExplain, setTextExplain] = useState(false);
    const [textSearch, setTextSearch] = useState(false);
    const [textNote, setTextNote] = useState(false);
    const [homePage, setHomePage] = useState(true);
    const [activeClassId, setActiveClassId] = useState(null);
    const [activeAssignmentId, setActiveAssignmentId] = useState(null);
    const [notesForAssignment, setNotesForAssignment] = useState([]);
    const [explanationResponse, setExplanationResponse] = useState({});
    const [searchResponse, setSearchResponse] = useState({});
    const [noteResponse, setNoteResponse] = useState({});
    const [currentPhrase, setCurrentPhrase] = useState("");

    const userData = dummyData;
    useEffect(() => {
        const messageListener = (message, sender, sendResponse) => {
            if (message.type === "textAction") {
                console.log(`Action: ${message.action}, Text: ${message.text}`);
                // Here, you can handle the action, such as updating state or calling an API
                handleTextAction(message.action, message.text);
                sendResponse({ status: "Action received" });
            }
            if (message.type === "getUser") {
                console.log(uid);
                handleGetUser(message.uid, message.displayName, message.email);
                sendResponse({ status: "Action reveived" });
            }
            // Add the message listener
            chrome.runtime.onMessage.addListener(messageListener);

            // Clean up the listener when the component unmounts
            return () => {
                chrome.runtime.onMessage.removeListener(messageListener);
            };
        };
    }, []); // Empty dependency array means this effect runs once on mount

    const handleButtonClick = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { action: "getPageInfo" },
                (response) => {
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError.message);
                        return;
                    }
                    setUrl(response.url);
                    setSource(response.source);
                }
            );
        });
        handleCreateNote();
    };

    const handleCreateNote = async () => {
        const dataToSend = {
            url: url,
            source: source,
        };

        try {
            const response = await fetch("http://localhost:8000/createNote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Success:", data);
            // Handle success - update UI
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const handleGetUser = async (uid, displayName, email) => {
        const dataToSend = {
            uid: uid,
            displayName: displayName,
            email: email,
        };

        try {
            const response = await fetch(
                "http://localhost:8000/users/retrieveUserData",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataToSend),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Success:", data);
            // Handle success - update UI
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleTextAction = async (action, text) => {
        if (action === "search") {
            handleTextActionSearch(text);
        } else if (action === "note") {
            handleTextActionNote(text);
        } else if (action === "explain") {
            handleTextActionExplain(text);
        }
    };

    const handleTextActionNote = async (text) => {
        try {
            const response = await fetch(
                "http://localhost:8000/services/note",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        text: text,
                        uid: userData.uid,
                        classId: activeClassId,
                        assignmentId: activeAssignmentId,
                    }),
                }
            );
            setNoteResponse(await response.json());
            setTextNote(true);
            setTextExplain(false);
            setTextSearch(false);
            setHomePage(false);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleTextActionSearch = async (text) => {
        try {
            const response = await fetch(
                "http://localhost:8000/services/searchResources",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        text: text,
                    }),
                }
            );
            setCurrentPhrase(text);
            setSearchResponse(await response.json());
            setTextNote(false);
            setTextExplain(false);
            setTextSearch(true);
            setHomePage(false);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleTextActionExplain = async (text) => {
        try {
            const response = await fetch(
                "http://localhost:8000/services/explain",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ text: text }),
                }
            );
            setExplanationResponse(await response.json());
            setTextNote(false);
            setTextExplain(true);
            setTextSearch(false);
            setHomePage(false);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleHomeClick = () => {
        setTextNote(false);
        setTextExplain(false);
        setTextSearch(false);
        setHomePage(true);
    };

    const handleDashboardClick = () => {
        chrome.tabs.create({ url: "http://localhost:5173/" });
    };

    const handleGenerateNotes = () => {
        console.log(
            "Generating notes for assignment with id: ",
            activeAssignmentId
        );
    };

    useEffect(() => {
        if (activeAssignmentId) {
            userData.classes
                .find((classObj) => classObj.id === activeClassId)
                .assignments.find((assignment) => {
                    if (assignment.id === activeAssignmentId) {
                        console.log(assignment.notes);
                        setNotesForAssignment(assignment.notes);
                    }
                });
        }
    }, [activeClassId, activeAssignmentId]);

    return (
        <div>
            <span className="nav-buttons">
                <button className="nav-button" onClick={handleHomeClick}>
                    Home
                </button>
                <button className="nav-button">Login</button>
                <button
                    className="nav-button"
                    onClick={handleDashboardClick}
                >
                    Dashboard
                    <OpenInNewIcon fontSize="small" />
                </button>
            </span>

            {homePage ? (
                <HomePage
                    classes={userData.classes}
                    activeClassId={activeClassId}
                    setActiveClassId={setActiveClassId}
                    activeAssignmentId={activeAssignmentId}
                    setActiveAssignmentId={setActiveAssignmentId}
                    notesForAssignment={notesForAssignment}
                    handleGenerateNotes={handleGenerateNotes}
                />
            ) : (
                ""
            )}

            {textNote ? (
                <TextNote
                    handleNoteClick={handleNoteClick}
                    text={currentPhrase}
                    data={noteResponse}
                />
            ) : (
                ""
            )}

            {textExplain ? (
                <TextExplain
                    data={explanationResponse}
                    uid={userData.uid}
                    activeClassId={activeClassId}
                    activeAssignmentId={activeAssignmentId}
                />
            ) : (
                ""
            )}

            {textSearch ? (
                <TextSearch text={currentPhrase} data={searchResponse} />
            ) : (
                ""
            )}
        </div>
    );
}

export default Sidebar;
