require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");
const todoRouter = require("./routers/todoRouter");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/todo";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("몽고디비 연결 성공");
    app.listen(PORT, () => {
      console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
    });
  })
  .catch((err) => {
    console.error("몽고디비 연결 실패:", err);
  });

app.use(express.json());
app.use(cors());
app.use("/todos", todoRouter);
