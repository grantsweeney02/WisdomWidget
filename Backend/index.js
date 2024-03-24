const express = require("express");
var cors = require("cors");
const admin = require("firebase-admin");


var serviceAccount = require("./api_keys.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});


const classRoutes = require("./routes/classes");
const usersRoutes = require("./routes/users");


const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello, Firebase!");
});

app.use("/users", usersRoutes);
app.use("/classes", classRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
