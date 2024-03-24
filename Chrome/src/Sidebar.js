import React, { useState, useEffect } from "react";
import HomePage from "./HomePage";
import TextNote from "./TextNote";
import TextExplain from "./TextExplain";
import TextSearch from "./TextSearch";
import "./styles/styles.css";
import dummyData from "./dummyData";
import "./styles/bootstrap.min.css";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

function Sidebar() {
    const [textExplain, setTextExplain] = useState(false);
    const [textSearch, setTextSearch] = useState(false);
    const [textNote, setTextNote] = useState(false);
    const [homePage, setHomePage] = useState(true);
    const [activeClassId, setActiveClassId] = useState(null);
    const [activeAssignmentId, setActiveAssignmentId] = useState(null);
    const [notesForAssignment, setNotesForAssignment] = useState([]);
    const [explanationResponse, setExplanationResponse] = useState({});
    const [searchResponse, setSearchResponse] = useState([]);
    const [noteResponse, setNoteResponse] = useState({});
    const [currentPhrase, setCurrentPhrase] = useState("");
    const [userInfo, setUserInfo] = useState({});

    const userData = dummyData;

    // useEffect(() => {
    //     const call = async () => {
    //         const response = await fetch(
    //             "http://localhost:8000/services/",
    //             {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         );
    //         const data = await response.json();
    //         console.log("Test Response:", data);
    //     };
    //     call();
    // }, []);

    useEffect(() => {
      console.log("Active Class ID: ", activeClassId);
      console.log("Active Assignment ID: ", activeAssignmentId);
      console.log("User ID: ", userInfo.uid);
    }, [userInfo, activeClassId, activeAssignmentId]);

    useEffect(() => {
        chrome.storage.sync.get(["userData"], function (result) {
            if (result.userData) {
                console.log("victory");
                setUserInfo(result.userData);
            }
        });
        const messageListener = (message, sender, sendResponse) => {
            if (message.type === "textAction") {
                console.log(`Action: ${message.action}, Text: ${message.text}`);
                // Here, you can handle the action, such as updating state or calling an API
                handleTextAction(message.action, message.text);
                sendResponse({ status: "Action received" });
            }
        };
        // Add the message listener
        chrome.runtime.onMessage.addListener(messageListener);

        //Clean up the listener when the component unmounts
        return () => {
            chrome.runtime.onMessage.removeListener(messageListener);
        };
    }, []); // Empty dependency array means this effect runs once on mount

    const handleGenerateNoteClick = () => {
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

    useEffect(() => {
        if (userInfo) {
            const getAllUserInfo = async () => {
                const response = await fetch(
                    "http://localhost:8000/users/retrieveUserData",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            uid: userInfo.uid,
                            displayName: userInfo.displayName,
                            email: userInfo.email,
                        }),
                    }
                );
                const data = await response.json();
                console.log("All user Info:", data);
            };
            getAllUserInfo();
        }
    }, [userInfo]);

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
            uid: userInfo.uid,
            displayName: userInfo.displayName,
            email: userInfo.email,
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
        console.log("Text: ", text);
        try {
            const response1 = await fetch(
                "http://localhost:8000/services/explain",
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
            const responseJSON = await response1.json();
            console.log("Response: ", responseJSON);
            const body = {
                name: responseJSON.name,
                summary: responseJSON.summary,
                keyValuePairs: responseJSON.keyValuePairs,
                classId: activeClassId,
                assignmentId: activeAssignmentId,
                uid: userInfo.uid,
                url: window.location.href,
            };
            console.log("Bodyyyyy: ", body);
            const response2 = await fetch(
                "http://localhost:8000/notes/createNote",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: responseJSON.name,
                        summary: responseJSON.summary,
                        keyValuePairs: responseJSON.keyValuePairs,
                        classId: activeClassId,
                        assignmentId: activeAssignmentId,
                        uid: userInfo.uid,
                        url: window.location.href,
                    }),
                }
            );
            const secondResponseJSON = await response2.json();
            console.log("Second Response: ", secondResponseJSON);

            setNoteResponse(secondResponseJSON);
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
                        selectedText: text,
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
        let attempts = 0;
        let success = false;
    
        while (attempts < 5 && !success) {
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
    
                if (!response.ok) {
                    // If response is not OK, throw an error and trigger the catch block
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const responseJSON = await response.json();
                console.log("Response: ", responseJSON);
                setExplanationResponse(responseJSON);
                setTextNote(false);
                setTextExplain(true);
                setTextSearch(false);
                setHomePage(false);
                success = true; // Update success to true to break the loop
            } catch (error) {
                console.error(`Attempt ${attempts + 1} Error:`, error);
                attempts++;
                if (attempts < 5) {
                    // Optionally, wait for a bit before retrying (e.g., 1 second)
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
        }
    
        if (!success) {
            // Handle the case where all attempts failed
            console.error("All attempts to fetch explanation have failed.");
        }
    };
    

    const handleHomeClick = () => {
        setTextNote(false);
        setTextExplain(false);
        setTextSearch(false);
        setHomePage(true);
    };

    const handleNoteClick = (classId, assignmentId, noteId) => {
        chrome.tabs.create({
            url: `http://localhost:5173/${classId}-${assignmentId}/${noteId}`,
        });
    };

    const handleDashboardClick = () => {
        chrome.tabs.create({ url: "http://localhost:5173/" });
    };

    // const handleGenerateNotes = () => {
    //     console.log(
    //         "Generating notes for assignment with id: ",
    //         activeAssignmentId
    //     );
    //     let html = document.documentElement.outerHTML;
    //     let cleanHTML = removeTagsFromDocument(html);
    //     const response = fetch("http://localhost:8000/services/scan", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             text: cleanHTML,
    //         }),
    //     });

    // };

    function removeTagsFromDocument(htmlDocument) {
        const $ = cheerio.load(htmlDocument);
        $("script").remove();

        return $.text()
            .replace(/\s\s+/g, " ")
            .trim()
            .replace(/[\r\n]+/g, " ");
    }

    useEffect(() => {
        if (activeAssignmentId) {
            userInfo.classes
                .find((classObj) => classObj.id === activeClassId)
                .assignments.find((assignment) => {
                    if (assignment.id === activeAssignmentId) {
                        console.log("Notes SIDEBAR: ", assignment.notes);
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
                    uid={userInfo.uid}
                    classes={userInfo.classes}
                    activeClassId={activeClassId}
                    setActiveClassId={setActiveClassId}
                    activeAssignmentId={activeAssignmentId}
                    setActiveAssignmentId={setActiveAssignmentId}
                    notesForAssignment={notesForAssignment}
                    // handleGenerateNotes={handleGenerateNotes}
                />
            ) : (
                ""
            )}

            {textNote ? (
                <TextNote
                    handleNoteClick={handleNoteClick}
                    activeClassId={activeClassId}
                    activeAssignmentId={activeAssignmentId}
                    text={currentPhrase}
                    data={noteResponse}
                />
            ) : (
                ""
            )}

            {textExplain ? (
                <TextExplain
                    data={explanationResponse}
                    uid={userInfo.uid}
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
