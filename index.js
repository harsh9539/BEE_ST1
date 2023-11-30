import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import postRoutes from "./routes/postRoute.js"


const app = express();
app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Api Working successfully",
    });
});


app.use("/api/v1/posts",postRoutes);


app.listen(8009, () => console.log("Server Running on port 8009"));
