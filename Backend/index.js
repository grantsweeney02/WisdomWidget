const express = require("express");
const admin = require("firebase-admin");

var serviceAccount = require("./api_keys.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, Firebase!");
});

app.post("/retrieveUserData", async (req, res) => {
    try {
        const { uid, email, displayName } = req.body;
        const userData = { email, displayName };

        const userRef = db.collection("users").doc(uid);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
            const existingUserData = userDoc.data();
            res.status(200).json(existingUserData);
        } else {
            await userRef.set(userData);
            res.status(200).json(userData);
        }
    } catch (error) {
        console.error("Error adding user: ", error);
        res.status(500).send("Error adding user");
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});