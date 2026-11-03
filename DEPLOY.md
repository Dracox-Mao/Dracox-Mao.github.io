# 部署到 GitHub Pages

站点已经是纯静态文件，不需要构建。仓库必须叫 **`Dracox-Mao.github.io`**，
这样地址才是 `https://dracox-mao.github.io/`（不带仓库名后缀）。

---

## 方法一：网页上传（最省事，手机也能做）

1. 打开 https://github.com/new
2. **Repository name** 填 `Dracox-Mao.github.io`
3. 选 **Public**（Pages 免费版只对公开仓库开放），**不要**勾 Add a README
4. Create repository
5. 仓库页点 **uploading an existing file**（或 Add file → Upload files）
6. 把下面 5 个文件拖进去（注意是文件本身，不是外层文件夹）：
   - `index.html`
   - `zh.html`
   - `secret.html`
   - `style.css`
   - `.nojekyll` ← 这个以点开头的文件系统里可能看不见，见方法三
7. 底部 Commit changes
8. 进 **Settings → Pages**：Source 选 **Deploy from a branch**，
   Branch 选 **main** + **/ (root)**，Save
9. 等 1–2 分钟，访问 https://dracox-mao.github.io/

---

## 方法二：命令行（已经在电脑上装好 git）

在解压后的 `Dracox-Mao` 文件夹里执行：

```bash
git init
git add .
git commit -m "init site"
git branch -M main
git remote add origin https://github.com/Dracox-Mao/Dracox-Mao.github.io.git
git push -u origin main
```

然后同上面的第 8、9 步。

第一次 push 会要求登录。GitHub 早就不接受账号密码了，要用 **Personal Access Token**：

1. https://github.com/settings/tokens → Generate new token (classic)
2. 勾 **repo** 权限，过期时间自己定
3. 复制生成的 `ghp_xxxxxxxx`
4. push 时用户名填 `Dracox-Mao`，密码栏粘这个 token

⚠️ token 等于密码，别提交进仓库、别贴到公开地方。

---

## 方法三：`.nojekyll` 传不上去怎么办

这个空文件的作用是让 GitHub Pages 跳过 Jekyll 处理。没有它站点一般也能开，
但文件名里带下划线之类的内容可能被吞。应急做法：在解压文件夹里执行
`touch .nojekyll` 再 `git add .`；用网页上传的话，可以跳过它，或者用
方法二的命令行把文件补齐。

---

## 之后更新内容

改完 `index.html` / `zh.html` / `secret.html` / `style.css` 其中任一个：

```bash
git add .
git commit -m "update"
git push
```

push 完 1 分钟内自动重新发布，不需要再做任何设置。强制刷新页面（Ctrl+Shift+R）能看到新内容。

---

## 需要你本来就有的东西

- 一个 GitHub 账号，用户名必须是 **`Dracox-Mao`**（站点地址跟用户名绑定）
- 仓库 **Public**
- 沙箱环境没有你的 GitHub 凭证，所以这些步骤只能在你自己这边做
