// 引入所需模組
const express = require('express'); // 引入 Express 框架
const cors = require('cors'); // 引入 cors 模組
const path = require('path');// 建立 Express 應用程式實例
const app = express(); // 建立 Express 應用程式
const methodOverride = require('method-override');

// 設定 EJS 為模板引擎，並指定模板檔案所在目錄
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// 引入 dotenv 模組並讀取 .env 檔案中的環境變數
require('dotenv').config();

// 設置中介軟體來解析 POST 請求的資料
app.use(express.json()); // 解析 JSON 格式的請求資料
app.use(express.urlencoded({ extended: false })); // 解析表單提交的資料
app.use(cors()); // 使用 CORS 中間件

// 靜態資源掛載
app.use('/css', express.static(path.join(__dirname, 'views/css')));
app.use('/js', express.static(path.join(__dirname, 'views/js')));

app.use(methodOverride('_method'));

// 引入自訂路由模組，管理 /todoList 路徑相關請求
const todoListRouter = require('./routes/todoList.router')
app.use('/', todoListRouter);

// 監聽端口，啟動伺服器並在控制台顯示訊息
const PORT = process.env.PORT || 5000 // 取得環境變數 PORT，沒有則預設使用 5000
app.listen(PORT, () => console.log(`伺服器正在執行，位於端口 ${PORT}`)); // 在控制台輸出伺服器啟動訊息
