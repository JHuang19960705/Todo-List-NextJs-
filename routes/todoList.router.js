const express = require("express")
const path = require('path')
const router = express.Router()

const pool = require('../database/index') // 引入 pool
const todoListController = require("../controller/todoList.controller")

router.get("/", async (req, res) => {
  try {
    const [todos] = await pool.query("SELECT * FROM todoList");
    res.render("index", { todos });
  } catch (error) {
    console.error("取得 todoList 發生錯誤", error);
    res.status(500).send("伺服器錯誤");
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query('SELECT * FROM todoList WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).send('找不到該代辦事項');
    }
    const todo = rows[0];
    res.render('edit', { todo });
  } catch (error) {
    console.error(error);
    res.status(500).send('伺服器錯誤');
  }
});



router.get("/get_todoList", todoListController.getAll)
router.post("/add_todoList", todoListController.create)
router.patch("/update_todoList/:id", todoListController.update)
router.delete("/delete_todoList/:id", todoListController.delete)

module.exports = router