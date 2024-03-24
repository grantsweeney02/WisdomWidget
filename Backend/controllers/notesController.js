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

exports.createNote = async (req, res) => {
    const { uid, classId, assignmentId, name, summary, url, keyValuePairs } =
        req.body;
    const defaultNoteContent = {
        name: name,
        url: url,
        summary: summary,
        keyValuePairs: keyValuePairs,
    };

    try {
        const notesRef = db
            .collection("users")
            .doc(uid)
            .collection("classes")
            .doc(classId)
            .collection("assignments")
            .doc(assignmentId)
            .collection("notes");

        const newNoteRef = await notesRef.add(defaultNoteContent);

        res.status(201).json({
            message: "Note created successfully with default content",
            noteId: newNoteRef.id,
        });
    } catch (error) {
        console.error("Error creating note with default content:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteNote = async (req, res) => {
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
        await noteRef.delete();

        res.status(200).send("Note deleted successfully.");
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).send("Internal Server Error");
    }
};
