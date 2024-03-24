const admin = require("firebase-admin");
const db = admin.firestore();

exports.getAssignment = async (req, res) => {
    const { uid, classId, assignmentId } = req.body;

    try {
        const assignmentRef = db
            .collection("users")
            .doc(uid)
            .collection("classes")
            .doc(classId)
            .collection("assignments")
            .doc(assignmentId);
        const assignmentDoc = await assignmentRef.get();

        if (!assignmentDoc.exists) {
            return res.status(404).send("Assignment not found");
        }
        const notesSnapshot = await assignmentRef.collection("notes").get();
        const notes = [];
        notesSnapshot.forEach((noteDoc) => {
            notes.push({
                noteId: noteDoc.id,
                ...noteDoc.data(),
            });
        });
        const assignmentData = assignmentDoc.data();
        const response = {
            ...assignmentData,
            notes: notes,
        };

        res.json(response);
    } catch (error) {
        console.error("Error getting assignment and notes:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.createAssignment = async (req, res) => {
    const { uid, classId } = req.body;
    try {
        const assignmentsRef = db
            .collection("users")
            .doc(uid)
            .collection("classes")
            .doc(classId)
            .collection("assignments");

        const newAssignmentRef = assignmentsRef.doc();
        await newAssignmentRef.set({
            name: "Introduction Assignment",
            usedUrls: ["https://example.com/getting-started"],
            recUrls: [
                "https://example.com/features-overview",
                "https://example.com/best-practices",
            ],
        });

        const newNoteRef = newAssignmentRef.collection("notes").doc();
        await newNoteRef.set({
            name: "Getting Started",
            summary:
                "Welcome to our app! Here's how to get the most out of it:",
            keyValuePairs: {
                "Create Class":
                    "Start by creating a new class for your subjects or projects.",
                "Add Assignment":
                    "Add assignments to your class and track your progress.",
                "Take Notes":
                    "Keep detailed notes for each assignment. You can include key terms, summaries, and URLs for reference.",
            },
        });

        res.status(201).json({
            message: "Assignment with default note created successfully",
            assignmentId: newAssignmentRef.id,
        });
    } catch (error) {
        console.error("Error creating assignment with default note:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteAssignment = async (req, res) => {
    const { uid, classId, assignmentId } = req.body;

    try {
        const assignmentRef = db
            .collection("users")
            .doc(uid)
            .collection("classes")
            .doc(classId)
            .collection("assignments")
            .doc(assignmentId);
        const notesSnapshot = await assignmentRef.collection("notes").get();
        const deleteNotesPromises = notesSnapshot.docs.map((noteDoc) =>
            noteDoc.ref.delete()
        );
        await Promise.all(deleteNotesPromises);
        await assignmentRef.delete();

        res.status(200).send(
            "Assignment and all related notes have been deleted successfully."
        );
    } catch (error) {
        console.error("Error deleting assignment and its notes:", error);
        res.status(500).send("Internal Server Error");
    }
};
