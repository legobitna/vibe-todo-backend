const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// 할일 생성
router.post("/", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: "content는 필수입니다." });
    }
    const todo = new Todo({ content });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: "할일 생성 중 오류가 발생했습니다." });
  }
});

// 할일 전체 조회
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "할일 조회 중 오류가 발생했습니다." });
  }
});

// 할일 수정
router.patch("/:id", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: "content는 필수입니다." });
    }
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ error: "할일을 찾을 수 없습니다." });
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "할일 수정 중 오류가 발생했습니다." });
  }
});

// 할일 삭제
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "할일을 찾을 수 없습니다." });
    }
    res.json({ message: "할일이 삭제되었습니다." });
  } catch (err) {
    res.status(500).json({ error: "할일 삭제 중 오류가 발생했습니다." });
  }
});

module.exports = router;
