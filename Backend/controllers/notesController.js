const admin = require("firebase-admin");
const db = admin.firestore();

exports.getNote = async (req, res) => {
    const { uid, classId, assignmentId, noteId } = req.body;
    try {
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
        res.json({
            noteId: noteDoc.id,
            ...noteDoc.data(),
        });
    } catch (error) {
        console.error("Error getting note:", error);
        res.status(500).send("Internal Server Error");
    }
};
