# HW-01 — Personal Web Space & Live Temporal Dashboard

個人專屬網頁與即時時鐘儀表板（作業一完成項目）。

🔗 **Live Demo**: [https://chayi27.github.io/HW-01/](https://chayi27.github.io/HW-01/)

![HW-01 Personal Space Preview](screenshot.png)

---

## 📌 作業一需求對應 (Homework 1 Requirements Checklist)

### 👤 1. Profile (個人資訊)
- **姓名 (Name)**: Chaoy
- **Avatar / 個人頭像**: 向量數位科技風格 Avatar，搭配動態在線狀態指示點。
- **科系 / 專長 (Department & Specialty)**: 
  - 科系：資訊工程學系 (Computer Science & Information Engineering, CSIE)
  - 專長：Web 全端開發、Machine Learning、Python、系統架構
- **簡短自我介紹 (About Me)**: 熱愛探索軟體技術與前端互動體驗，專注於全端 Web 應用、AI 代理工作流與直覺美觀的使用者互動體驗。

### 🛠 2. Skills (技能專長)
完整列出核心技能，並支援標籤互動：
- **程式語言與網頁開發**: Python, C / C++, Web Development (HTML5, CSS3, JavaScript ESNext, React)
- **人工智慧與資料分析**: Machine Learning, AI & LLM Integration, Data Analysis (NumPy, Pandas)
- **系統與硬體應用**: IoT (物聯網), Docker, Git & GitHub Actions, RESTful APIs, Linux

### 🚀 3. Projects (專案與作品)
收錄作品與本學期預計完成專案：
1. **HW-01: Personal Space & Live Clock** (已上線)
   - **說明**: 響應式個人主頁與即時時鐘儀表板，具備毛玻璃美學、自動時區偵測、日進度計算與自訂主題切換。
   - **技術**: HTML5, CSS3 (Glassmorphism), JavaScript (Vanilla), GitHub Pages
   - **連結**: [線上展示](https://chayi27.github.io/HW-01/) • [GitHub 原始碼](https://github.com/chayi27/HW-01)
2. **AI Agentic Workflow Orchestrator** (本學期預計完成專案)
   - **說明**: 結合大型語言模型（LLMs）與多工具呼叫代理的智慧自動化系統，支援自然語言任務排程與資料分析。
   - **技術**: Python, Machine Learning / AI, FastAPI, LangChain, Docker
   - **連結**: [GitHub 專案](https://github.com/chayi27)

### 🕐 4. Live Clock (即時時鐘)
- **即時時鐘**: 使用純 JavaScript 定時器每秒高精度更新，顯示 **HH : MM : SS**（採用 Tabular-nums 避免跳動）。
- **動態時段問候**: 根據當前本地時間自動變更問候語與圖示（早安 ☀️、午安 🌤️、晚安 🌆、深夜專注 🌙）。
- **時間功能擴充**: 支援 12H / 24H 格式即時切換、日時間流逝進度條（% 與剩餘小時）以及一鍵複製 ISO 時間戳記。

### 🎨 5. Personal Design (個人專屬設計風格)
- **深色毛玻璃質感 (Dark Glassmorphism)**: 精緻 `backdrop-filter: blur(24px)` 毛玻璃卡片與高質感高光微邊框。
- **動態流體背景 (Ambient Glow Orbs)**: 漂浮流光光球與 CSS Keyframes 動態漸變。
- **現代字體排版**: Google Fonts 精選現代字體 `Outfit`、等寬程式碼字體 `JetBrains Mono` 與繁體中文字體 `Noto Sans TC`。
- **三款動態主題切換**: Modern Glass（紫青流光）、Cyber Neon（高對比賽博龐克藍紅）、Sunset Amber（暖色夕陽琥珀），偏好設定自動儲存至 `localStorage`。
- **即時資料持久化**: 支援頁面標題、姓名、自介內容點擊即時編輯並自動存檔。

---

## 🚀 本地端快速啟動 (Getting Started)

直接雙擊打開 `index.html`，或使用 Python 建立本機預覽伺服器：

```bash
python -m http.server 8080
```

瀏覽器訪問：[http://localhost:8080](http://localhost:8080)