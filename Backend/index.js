const express = require("express");
var cors = require("cors");
const admin = require("firebase-admin");

var serviceAccount = require("./api_keys.json");
require("dotenv/config")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const classRoutes = require("./routes/classes");
const usersRoutes = require("./routes/users");
const assignmentsRoutes = require("./routes/assignments");
const notesRoutes = require("./routes/notes");
const servicesRoutes = require("./routes/services");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, Firebase!");
});

app.use("/users", usersRoutes);
app.use("/classes", classRoutes);
app.use("/assignments", assignmentsRoutes);
app.use("/notes", notesRoutes);
app.use("/services", servicesRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
