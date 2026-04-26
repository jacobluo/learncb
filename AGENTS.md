# CodeBuddy 操作手册 — 前端设计规范

## 项目概述

这是一个多页静态文档站点（CodeBuddy 上手操作手册），采用纯 HTML + CSS + JS 构建，无框架依赖。
内容从单页拆分为 11 个独立页面，共享侧边栏导航、样式和脚本。

### 文件结构

```
learncb/
├── index.html              # 首页入口（Hero + 简介）
├── AGENTS.md               # 项目设计规范（本文件）
├── CodeBuddy操作手册.md     # 内容源文件
├── assets/
│   ├── style.css           # 全局样式
│   └── script.js           # 全局脚本
├── images/                  # 截图和插图
│   └── install-skill-superpowers.png
└── pages/
    ├── about.html          # CodeBuddy 介绍
    ├── install.html        # 3.1 下载/安装
    ├── skills.html         # 3.2 配置 Skills
    ├── agent.html          # 3.3 配置自定义智能体
    ├── mcp.html            # 3.4 配置 MCP
    ├── rules.html          # 3.5 配置 Rules
├── planmode.html       # 四、实战案例-PLAN模式
    ├── examples.html       # 五、实战案例
    ├── seckill.html        # 5.1 Java 秒杀 API 服务
    └── resources.html      # 七、参考资源
```

## 设计要求

**必须使用 `frontend-design` skill 进行页面设计和开发。**

## 视觉风格参考

风格对齐 CodeBuddy 官网：https://www.codebuddy.cn/home/

### 设计基调

- **深色主题（Dark Mode）**：与代码编辑器暗色环境一脉相承，降低开发者认知切换成本
- **科技感 × 极简主义 × AI 未来感**：专业、智能、高效
- **面向开发者**：信息层级分明，功能导向，克制不花哨

### 配色方案

| 色彩角色 | 色值/描述 |
|---------|----------|
| 主背景 | 深黑 / 近黑灰（`#0a0e17` ~ `#0f1520`） |
| 内容卡片背景 | 半透明深灰（`#151c2c`），可带微弱毛玻璃效果 |
| 主文字 | 亮白（`#e2e8f0`） |
| 次级文字 | 柔灰（`#8892a4`） |
| 品牌主色 | 科技蓝（`#38bdf8`），用于高亮、链接、活跃态 |
| 品牌渐变 | 蓝→紫渐变（`#38bdf8` → `#818cf8`），用于标题、装饰光效 |
| 强调色/成功 | 翠绿（`#34d399`），用于时间标签、成功状态 |
| 警告色 | 橙色（`#fb923c`），用于注意提示 |
| 边框 | 深色细线（`#1e293b`），低对比度分隔 |

### 渐变与光效

- **背景光效**：暗色背景上叠加蓝紫色径向渐变光晕（`radial-gradient`），营造"光源聚焦"效果
- **品牌渐变文字**：Hero 标题使用 `linear-gradient` + `background-clip: text` 实现蓝紫渐变文字
- **卡片发光边框**：hover 时边框变为品牌色，配合 `box-shadow` 产生微弱光晕

### 排版

| 元素 | 字体 | 特征 |
|------|------|------|
| 正文 | `Noto Sans SC` | 15px，行高 1.7 |
| 代码 | `JetBrains Mono` | 13px，蓝色高亮底色 |
| 展示标题 | `Playfair Display` | Hero 大标题，渐变色 |
| 键盘按键 | `JetBrains Mono` | 带边框阴影的 `<kbd>` 样式 |

### UI 组件规范

#### 侧边栏导航
- 固定左侧，宽度 260px
- 分组标签（大写字母、小字号、宽字距）
- 活跃项：左侧 3px 蓝色边框 + 蓝色文字 + 蓝色半透明底色
- 移动端：抽屉式收起，汉堡按钮触发

#### 卡片
- 圆角 12px，深色背景，1px 细边框
- 高亮卡片：左侧 3px 蓝色装饰线
- Hover：边框变蓝 + 上浮 2-3px + 阴影加深

#### 代码块
- 深黑背景（`#0d1117`），圆角 8px
- 语法高亮：关键字紫色、属性名蓝色、字符串绿色、注释灰色
- **Markdown 渲染代码块**：较长的代码片段（如 JSON 配置、YAML、SKILL.md 示例）使用 `marked.js` 渲染 markdown，而非手写 `<span>` 标签做语法高亮。做法：
  1. 页面 `<head>` 引入 `<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>`
  2. 容器使用 `<div class="code-block markdown-body" data-markdown>` 包裹原始 markdown 内容（含 ` ```lang ` 围栏）
  3. `assets/script.js` 中的 `[data-markdown]` 逻辑会自动解析并渲染
  4. `.markdown-body` 样式提供 `max-height: 420px; overflow-y: auto` 实现固定高度 + 滚动，避免超长代码块撑开页面

#### 截图/图片
- **小图预览 + 点击查看原图（Lightbox）**：所有页面内截图使用 `.screenshot-wrapper` 容器展示缩略图，点击后弹出全屏 Lightbox 查看原图。做法：
  ```html
  <div class="screenshot-wrapper" style="margin-top: 16px;">
    <img src="../images/xxx.png" alt="描述文字" class="screenshot">
    <div class="screenshot-caption">图片说明文字</div>
  </div>
  ```
- `.screenshot-wrapper`：圆角 12px、深色边框、暗底背景、hover 阴影加深、`max-width: 66%` 缩小展示（约为原图 2/3）、`cursor: zoom-in` 提示可点击
- `.screenshot`：宽度 100%，自适应高度
- `.screenshot-caption`：底部居中小字说明，深色背景分隔线
- **Lightbox 行为**：`assets/script.js` 中的 `openLightbox()` 函数自动为所有 `.screenshot` 图片绑定点击事件，弹出半透明遮罩 + 原图居中显示，点击遮罩或按 `Esc` 关闭

#### 紧凑图文行（Step Row）
- 用于流程演示页面（如实战案例），左侧文字描述 + 右侧 120px 缩略图，点击查看原图
- 做法：
  ```html
  <div class="step-row">
    <div class="step-row-text">
      <strong>标题</strong>
      <p>描述文字</p>
    </div>
    <div class="step-row-thumb" onclick="openLightbox(this.querySelector('img'))">
      <img src="../images/xxx.png" alt="描述">
    </div>
  </div>
  ```
- `.step-row`：flex 布局、深色卡片背景、hover 边框变亮
- `.step-row-thumb`：120px 宽缩略图、圆角 6px、`cursor: zoom-in`、点击触发 Lightbox

#### Tab 切换
- 底部 2px 下划线指示活跃态
- 内容区无动画，直接切换显示

#### 时间线
- 左侧 2px 竖线 + 圆点标记
- 蓝色圆点，总计项用绿色突出

#### FAQ 手风琴
- `<details>` 元素，自定义 `+` / `−` 指示器
- 展开时显示底部分隔线

#### 页面底部导航
- 上一章 / 下一章按钮，flex 两端对齐
- Hover 时边框变蓝 + 微上浮

### 动效规范

| 动效 | 参数 | 应用场景 |
|------|------|---------|
| 入场动画 | `opacity 0→1, translateY 20px→0, 0.5s ease` | 卡片、列表项滚动入场 |
| Hover 浮动 | `translateY(-2px ~ -3px), 0.3s` | 卡片、资源链接 |
| 边框/颜色过渡 | `0.2s` | 导航链接、按钮 |
| 侧边栏滑入 | `transform 0.3s` | 移动端菜单 |

### 响应式断点

| 断点 | 适配策略 |
|------|---------|
| ≤ 1024px | 三列网格→单列，模式卡片堆叠 |
| ≤ 768px | 侧边栏隐藏为抽屉，内边距缩小，Hero 字号缩小 |

## 开发约定

1. **纯静态站**：不引入任何构建工具或框架，直接 HTML + CSS + JS
2. **目录组织**：`index.html` 在根目录，子页面放 `pages/`，样式和脚本放 `assets/`
3. **路径规则**：
   - `index.html` 引用：`assets/style.css`、`assets/script.js`，导航链接用 `pages/xxx.html`
   - `pages/*.html` 引用：`../assets/style.css`、`../assets/script.js`，index 链接用 `../index.html`，同级页面链接直接用文件名
4. **共享导航**：每个页面都包含完整的侧边栏 HTML，JS 根据当前文件名自动高亮
5. **样式集中**：所有样式写在 `assets/style.css`，使用 CSS 变量管理主题色
6. **语义化**：使用 `<section>`, `<nav>`, `<main>`, `<footer>`, `<details>` 等语义标签
7. **无障碍**：保证键盘可导航，颜色对比度达标
8. **内容来源**：`CodeBuddy操作手册.md` 是内容的权威来源，页面内容应与之保持一致
