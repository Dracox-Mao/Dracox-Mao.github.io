# Dracox Mao — 个人站点

纯静态的个人网站，跑在 GitHub Pages 上：**https://dracox-mao.github.io/**

没有框架、没有构建工具、没有后端。全部是手写 HTML / CSS / 一点原生 JS，
文件总数不到 25 个，改起来简单，坏了自己也能修。

---

## 页面

| 地址 | 语言 | 内容 |
|---|---|---|
| `/` | English | 主页：简介、用过的系统、链接 |
| `/zh.html` | 中文 | 家人版：正式、克制，联系方式 `dracox_mao@outlook.com` |
| `/blog.html` | 中文 | 日志列表 |
| `/post.html?p=<slug>` | 中文 | 单篇文章 |
| `/support.html` | 中文 | 赞赏页（扫码请咖啡） |
| `/secret.html` | English | 彩蛋页，不在任何导航里，只能从主页底部进入 |

主页顶部有「中文」按钮，中文页顶部有「English version」，两边互通。
主页和中文页的导航都能进「日志」和「赞赏」。

---

## 文件结构

```
index.html        英文主页
zh.html           中文家人版
secret.html       彩蛋页（noindex）
support.html      赞赏页
blog.html         日志列表
post.html         文章正文页（?p=<slug>）
style.css         全站样式（明暗自动切换）
blog.css          日志 / 文章 / 赞赏页样式
favicon.png       标签页图标（32×32，手搓的）
coffee.png        赞赏二维码（已裁掉底部横幅）
posts.json        文章登记表
posts/*.md        文章正文
build.py          把 posts.json + posts/*.md 合并成 posts.js
posts.js          生成文件，别手改
```

---

## 本地预览

双击 `index.html` 就能看。浏览器限制下 `file://` 读不了部分资源，
但文章正文已经内联进 `posts.js`，所以日志和文章页也能正常显示。

想更接近线上环境：

```bash
python3 -m http.server 8000
# 打开 http://localhost:8000/
```

---

## 写一篇新文章

1. 在 `posts/` 下新建 `posts/<slug>.md`，用普通 markdown 写
2. 在 `posts.json` 的 `posts` 数组里加一条：

```json
{
  "slug": "my-first-note",
  "title": "文章标题",
  "date": "2026-11-10",
  "readingTime": 4,
  "summary": "列表页显示的一句话摘要。",
  "tags": ["随笔"],
  "file": "posts/my-first-note.md"
}
```

3. 跑 `python3 build.py`（会打印「posts.js 已更新，共 N 篇」）
4. 提交推送

> 为什么需要 `build.py`：正文被内联进 `posts.js` 而不是用 `fetch()` 加载，
> 这样本地双击打开、手机直接预览时也不会因为 CORS 读不到内容。

详细说明见 [BLOG.md](BLOG.md)。

---

## 留言板

用 [giscus](https://giscus.app)，留言存在本仓库的 **Discussions** 里。
每个人必须用 GitHub 账号登录才能发言，每条都带用户名和头像；
仓库主人可以删除、锁定任何一条。不需要服务器，也没有匿名刷屏的入口。

配置需要四步（开 Discussions、装 giscus App、建 Announcements 分类、填两个 ID），
步骤写在 [BLOG.md](BLOG.md) 第三节。配好之前，页面会显示「留言区还在配置中」。

---

## 部署

仓库名必须是 **`Dracox-Mao.github.io`**，Pages 才能挂在根路径上。

```
git add .
git commit -m "update"
git push
```

推完一分钟内自动重新发布。第一次配置 Pages 的步骤、网页上传的做法、
`.nojekyll` 的处理，见 [DEPLOY.md](DEPLOY.md)。

---

## 一些约定

- 全站不挂任何统计脚本，不加追踪像素
- 秘密页带 `noindex, nofollow`，只是靠链接隐蔽，不是权限控制 ——
  GitHub Pages 上的内容本身是公开的，真有不想公开的东西就别放进来
- 修改 CSS / JS 后要同步升 `?v=N` 版本号（部分 WebView 缓存很顽固）
- 只改样式不用重建；只有加文章才需要跑 `build.py`
