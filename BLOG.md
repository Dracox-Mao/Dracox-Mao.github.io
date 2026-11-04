# 博客：怎么发文章、留言板怎么开

这个博客是纯静态的，没有后台、没有数据库、没有任何账号系统。
所有页面都在 GitHub 仓库里，所以你 push 什么，外面就看到什么。

---

## 一、为什么只有你能发文章

因为**发布 = 往你自己的 GitHub 仓库提交文件**。别人没有你的仓库写权限，
就写不了文章。这是 GitHub 本身给的权限，不需要我另外写登录系统。

加一篇文章 = 加一个 markdown 文件 + 在 `posts.json` 里登记一行 + 重新生成一次。

---

## 二、怎么加一篇文章

### 1. 写正文

在 `posts/` 目录新建一个 `.md` 文件，文件名就是文章的英文短名（slug），比如
`posts/mechatronics-notes.md`。支持的写法：

```markdown
## 小标题（页面会自动降一级显示）

普通段落。可以用 **加粗**、*斜体*、`行内代码`。

- 列表项
- 列表项

1. 有序列表
2. 第二项

> 引用

​```python
print("代码块")
​```

[链接文字](https://example.com)
```

### 2. 在 `posts.json` 里登记

```json
{
  "slug": "mechatronics-notes",
  "title": "机电一体化期中复习笔记",
  "date": "2026-11-10",
  "readingTime": 4,
  "summary": "一句话介绍（列表里会显示）。",
  "tags": ["学习", "机电"],
  "file": "posts/mechatronics-notes.md"
}
```

- `slug` 唯一，会出现在地址里：`post.html?p=mechatronics-notes`
- `date` 用 `YYYY-MM-DD`，列表按它倒序排
- `readingTime` 随便估个数就行，页面上显示成「约 N 分钟」

### 3. 重新生成 `posts.js`

```
python3 build.py
```

它会打印「posts.js 已更新，共 N 篇」。`posts.js` 是生成文件，**不要手改**。

> 为什么要有这一步？因为文章正文被内联进了 `posts.js`，
> 这样在本地双击打开、或者手机上预览时也不会因为 CORS 读不到内容。

### 4. 提交

在 GitHub 网页上把这三个文件上传/提交，或者本地：

```
git add . && git commit -m "新文章：机电一体化期中复习笔记" && git push
```

一分钟内页面自动更新。

---

## 三、留言板（Giscus：用 GitHub 账号回复）

留言板用的是 [giscus](https://giscus.app)，原理是把留言存进仓库的
**Discussions**，每个人必须用 GitHub 账号登录才能发言。
这样既不用服务器，也没法匿名刷屏。

### 现在还没开，需要你在仓库里做 4 步

1. **打开 Discussions**
   仓库 → Settings → 往下拉到 Features → 勾选 **Discussions**

2. **装 giscus App**
   打开 https://github.com/apps/giscus → Install → 选择
   `Dracox-Mao/Dracox-Mao.github.io`

3. **建一个 Discussions 分类**
   仓库 → Discussions → 右侧分类旁边的 ✏️ 编辑 →
   新建分类，名字填 `Announcements`（或者你喜欢的英文名），
   类型选 **Announcements**
   —— 必须选 Announcements 类型，这样别人才能建新帖

4. **拿两个 id**
   打开 https://giscus.app ，在 Repository 里填
   `Dracox-Mao/Dracox-Mao.github.io`，下面会自动出现
   **Repository ID** 和 **Category ID**，复制那两串。
   （仓库 ID 现在就是 `R_kgDOVguYCA`）

### 把 id 填进去

在 `blog.html` 和 `post.html` 里各有一处：

```
data-repo-id="__REPO_ID__"
data-category="Announcements"
data-category-id="__CATEGORY_ID__"
```

把 `__REPO_ID__` 换成仓库 ID，`__CATEGORY_ID__` 换成分类 ID，
`Announcements` 换成你实际分类名。两个文件都改完提交就好。

配好之前，页面上会显示一句「留言区还在配置中」，不会出现空白框。

### 留言规则

- 必须登录 GitHub，所以每条留言都挂着用户名和头像
- 你（仓库主人）可以在 Discussions 里删除、锁定任何一条
- 每篇文章一个讨论帖（按网址区分），互相分开

---

## 四、文件清单

| 文件 | 作用 |
|---|---|
| `blog.html` | 日志列表页 |
| `post.html` | 单篇文章页 |
| `blog.css` | 博客样式 |
| `blog.js` | 列表渲染 |
| `post.js` | 文章渲染 |
| `markdown.js` | 极简 markdown 渲染器（无依赖） |
| `posts.json` | 文章登记表（源数据） |
| `posts/` | 文章正文（markdown） |
| `posts.js` | 生成文件，别手改 |
| `build.py` | 生成 `posts.js` 的脚本 |
