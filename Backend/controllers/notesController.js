const admin = require("firebase-admin");
const db = admin.firestore();

exports.getNote = async (req, res) => {
    const { uid, classId, assignmentId, noteId } = req.body; // Assuming you're using query parameters for a GET request

    try {
        // Reference to the specific note document
        const noteRef = db
            .collection("users")
            .doc(uid)
            .collection("classes")
            .doc(classId)
            .collection("assignments")
            .doc(assignmentId)
            .collection("notes")
            .doc(noteId);
        const noteDoc = await noteRef.get();

        if (!noteDoc.exists) {
            return res.status(404).send("Note not found");
        }

        // Respond with the note data
        res.json({
            noteId: noteDoc.id,
            ...noteDoc.data(),
        });
    } catch (error) {
        console.error("Error getting note:", error);
        res.status(500).send("Internal Server Error");
    }
};
