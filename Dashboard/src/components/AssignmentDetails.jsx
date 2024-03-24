import Citations from "./Citations";
import NoteCard from "./NoteCard";
import URLRec from "./URLRec";
import dummyUser from "../../dummyUser.json";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";

import "../styles/AssignmentDetails.css";

const AssignmentDetails = ({}) => {
    const { classIDassignmentID } = useParams();
    const classID = classIDassignmentID.split("-")[0];
    const assignmentID = classIDassignmentID.split("-")[1];

    // fetch assignment info
    // const response = dummyUser;
    const [assignment, setAssignment] = useState(null);
    const userData = useContext(UserContext).userData;

    useEffect(() => {
        if (userData) {
            const populateAssignment = async () => {
                const uid = userData.uid;
                const body = {
                    uid: uid,
                    classId: classID,
                    assignmentId: assignmentID,
                };
                const response = await axios.post(
                    "http://localhost:8000/assignments/getAssignment",
                    body
                );
                setAssignment(response.data);
            };
            populateAssignment();
        }
    }, [userData]);

    const getAllNoteUrls = (notes) => {
        const urls = [];
        notes.forEach((note) => {
            urls.push(note.url);
        });
        return urls;
    };

    console.info(assignment);
    return (
        <>
            {assignment && (
                <div className="col-9 assignment-detail">
                    <h1>{assignment.name}</h1>
                    {assignment.due ? (
                        <h4 className="due-date">Due Date: {assignment.due}</h4>
                    ) : null}
                    <h4 className="notes">Notes: </h4>
                    <div className="note-card-container">
                        {assignment.notes.map((note, index) => (
                            <NoteCard
                                key={index}
                                classID={classID}
                                assignmentID={assignmentID}
                                note={note}
                            />
                        ))}
                        {/* <div className="card note-add-card">
							<div className="card-body note-add-body">
								<p className="card-text note-card-text">
									<AddIcon />
									Add
								</p>
							</div>
						</div> */}
                    </div>
                    <Citations urls={getAllNoteUrls(assignment.notes)} />
                    <h4>More Resources: </h4>
                    {assignment.recUrls.map((url, index) => (
                        <URLRec key={index} url={url} />
                    ))}
                </div>
            )}
        </>
    );
};

export default AssignmentDetails;
