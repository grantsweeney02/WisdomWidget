const {
    fetchResources,
    fetchExplanation,
    fetchScan,
} = require("../services/AiService");

const fs = require("fs");
const path = require("path");

exports.generateQuizlet = async (req, res) => {
    const { uid, classId, assignmentId } = req.body;
    try {
        const notesRef = db
            .collection("users")
            .doc(uid)
            .collection("classes")
            .doc(classId)
            .collection("assignments")
            .doc(assignmentId)
            .collection("notes");
        const snapshot = await notesRef.get();

        let aggregatedContent = "";
        snapshot.forEach((doc) => {
            const note = doc.data();
            for (const [key, value] of Object.entries(note.keyValuePairs)) {
                aggregatedContent += `${key},${value}\n`;
            }
        });
        const fileName = `aggregatedContent_${Date.now()}.txt`;
        const filePath = path.join(__dirname, "..", "generatedFiles", fileName);

        // Write the aggregatedContent to the text file
        fs.writeFile(filePath, aggregatedContent, (err) => {
            if (err) {
                console.error("Error generating text file:", err);
                res.status(500).send("Error generating text file");
            } else {
                // Send the generated text file as a response
                res.download(filePath, (err) => {
                    if (err) {
                        console.error("Error sending text file:", err);
                        res.status(500).send("Error sending text file");
                    }
                    // Delete the generated text file after sending
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error("Error deleting text file:", err);
                        }
                    });
                });
            }
        });
        res.send(aggregatedContent);
    } catch (error) {
        console.error("Error creating Quizlet doc:", error);
        res.status(500).send("Error creating document");
    }
};

exports.searchResources = async (req, res) => {
    const { selectedText } = req.body;

    try {
        const resources = await fetchResources(selectedText);
        res.json({ resources });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.explain = async (req, res) => {
    const { text } = req.body;
    try {
        const explanation_response = await fetchExplanation(text);
        const { name, summary, explanation, keyValuePairs } =
            explanation_response;
        res.json({ name, summary, explanation, keyValuePairs });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.scan = async (req, res) => {
    const { text } = req.body;
    try {
        const scan_response = await fetchScan(text);
        const { name, summary, keyValuePairs } = scan_response;
        res.json({ name, summary, keyValuePairs });
    } catch (error) {
        res.status(500).send(error);
    }
};
