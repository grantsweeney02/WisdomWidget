const admin = require("firebase-admin");
const db = admin.firestore();

exports.retrieveUserData = async (req, res) => {
    try {
        const { uid, email, displayName } = req.body;

        let userData = { uid, email, displayName, classes: [] };

        const userRef = db.collection("users").doc(uid);
        let userDoc = await userRef.get();
        if (!userDoc.exists) {
            await userRef.set({ email, displayName });
            const classRef = userRef.collection("classes").doc();
            await classRef.set({
                name: "Welcome to Our Note-Taking App",
            });
            const assignmentRef = classRef.collection("assignments").doc();
            await assignmentRef.set({
                name: "Introduction",
                usedUrls: ["https://example.com/getting-started"],
                recUrls: [
                    "https://example.com/features-overview",
                    "https://example.com/best-practices",
                ],
            });
            const noteRef = assignmentRef.collection("notes").doc();
            await noteRef.set({
                name: "Getting Started",
                url: "www.getting-started.com",
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
        }
        const classesSnapshot = await userRef.collection("classes").get();
        for (const classDoc of classesSnapshot.docs) {
            const classData = {
                id: classDoc.id,
                ...classDoc.data(),
                assignments: [],
            };
            const assignmentsSnapshot = await classDoc.ref
                .collection("assignments")
                .get();
            classData.assignments = [];

            for (const assignmentDoc of assignmentsSnapshot.docs) {
                const assignmentData = {
                    id: assignmentDoc.id,
                    ...assignmentDoc.data(),
                    notes: [],
                };
                const notesSnapshot = await assignmentDoc.ref
                    .collection("notes")
                    .get();

                for (const noteDoc of notesSnapshot.docs) {
                    const noteData = {
                        id: noteDoc.id,
                        ...noteDoc.data(),
                    };
                    assignmentData.notes.push(noteData);
                }

                classData.assignments.push(assignmentData);
            }
            userData.classes.push(classData);
        }

        res.status(200).json(userData);
    } catch (error) {
        console.error("Error retrieving or adding user: ", error);
        res.status(500).send("Error retrieving or adding user");
    }
};
