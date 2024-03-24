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
