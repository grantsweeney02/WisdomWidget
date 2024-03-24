import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import "../styles/NoteDetails.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";

const NoteDetails = ({}) => {
    const { classIDassignmentID, noteID } = useParams();
    const classID = classIDassignmentID.split("-")[0];
    const assignmentID = classIDassignmentID.split("-")[1];
    const navigate = useNavigate();
    const [newKeyword, setNewKeyword] = useState("");
    const [newDefinition, setNewDefinition] = useState("");
    const [addingKeyword, setAddingKeyword] = useState(false);
    const [data, setData] = useState(null); // Initial data from demoResponse
    const [Keywords, setKeywords] = useState(null);

    const userData = useContext(UserContext).userData;

    if (data) {
        console.log("DATA", data);
    }

    useEffect(() => {
        if (userData) {
            const populateNote = async () => {
                const uid = userData.uid;
                const body = {
                    uid: uid,
                    classId: classID,
                    assignmentId: assignmentID,
                    noteId: noteID,
                };
                const response = await axios.post(
                    "http://localhost:8000/notes/getNote",
                    body
                );
                setData(response.data);
            };
            populateNote();
        }
    }, [userData]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleAddKeyword = () => {
        setAddingKeyword(true);
    };

    const handleConfirmAddKeyword = () => {
        const newData = { ...data };
        newData.keyValuePairs[newKeyword] = newDefinition;
        setData(newData);
        setNewKeyword("");
        setNewDefinition("");
        setAddingKeyword(false);
    };

    const handleCancelAddKeyword = () => {
        setNewKeyword("");
        setNewDefinition("");
        setAddingKeyword(false);
    };

    return (
        <>
            {data && (
                <div className="col-9 note-details">
                    <h1>{data.name}</h1>
                    <button
                        className="btn back-button"
                        onClick={() => handleBack()}
                    >
                        <ArrowBackIosNewIcon />
                    </button>
                    <p>{data.summary}</p>
                    <div className="keywords">
                        {data &&
                            Object.entries(data.keyValuePairs).map(
                                ([keyword, definition]) => (
                                    <div
                                        key={keyword}
                                        className="keyword-container"
                                    >
                                        <div className="keyword-card">
                                            <h5 className="keyword">
                                                {keyword}
                                            </h5>
                                            <p className="definition">
                                                {definition}
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        {/* {addingKeyword ? (
							<div className="keyword-add-container">
								<input
									className="form-control keyword-input"
									type="text"
									placeholder="New Keyword"
									value={newKeyword}
									onChange={(e) => setNewKeyword(e.target.value)}
								/>
								<input
									className="form-control definition-input"
									type="text"
									placeholder="Definition"
									value={newDefinition}
									onChange={(e) => setNewDefinition(e.target.value)}
								/>
								<div className="keyword-confirm-buttons">
									<button className="btn" onClick={handleConfirmAddKeyword}>
										<CheckIcon />
									</button>
									<button className="btn" onClick={handleCancelAddKeyword}>
										<CloseIcon />
									</button>
								</div>
							</div>
						) : (
							<button className="keyword-add-container" onClick={() => handleAddKeyword()}>
								<div className="keyword-add-button">
									<AddIcon />
									Add Keyword
								</div>
							</button>
						)} */}
                    </div>
                    {data.url && (
                        <h4>
                            Source: <a href={data.url}>{data.url}</a>
                        </h4>
                    )}
                    {!data.url && (
                        <>
                            <h4>Source:</h4>
                            <p>None Provided</p>
                            <button className="btn btn-primary">
                                Add Source
                            </button>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default NoteDetails;
