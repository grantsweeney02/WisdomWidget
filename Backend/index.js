const express = require("express");
const admin = require("firebase-admin");

var serviceAccount = require("api_keys.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
