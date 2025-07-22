const express = require('express');
const mongoose=require("./src/config/db");
const cors=require("cors");
const route=require("./src/routes/UserRoute");
const app = express();

const startDB=async () => {
    await mongoose();
}

app.use(express.json());
app.use(cors())
app.use("/api",route);

app.listen(8080, () => {
    startDB();
    console.log("Server is running");
});
