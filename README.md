# Dracox-Mao.github.io

Personal site. Plain HTML + CSS, no build step — drop it in a repo named
`Dracox-Mao.github.io` and GitHub Pages serves it as-is.

```
index.html    public page (English)
zh.html       中文版，给家里人看的那一版（正经、无小秘密）
secret.html   second page, reachable only from the faint door at the bottom
style.css     all styling, light + dark
.nojekyll     skip Jekyll
```

## 两个版本

- `index.html` — 英文主页，页面上有「中文」按钮通往 `zh.html`。
- `zh.html` — 中文版，正式、克制，不含任何小秘密内容，联系方式是
  `dracox_mao@outlook.com`。适合直接发给家人。
- 两个页面互相有 `English version` / `中文` 的切换链接。
- **发给家人时只发 `https://dracox-mao.github.io/zh.html`** 这一个地址，
  别发首页 —— 首页底部有那扇暗门。

## The small room

`secret.html` is linked from the bottom of the home page but is not in the nav,
and carries `<meta name="robots" content="noindex, nofollow">` so search engines
should leave it alone.

To make it harder to find, just **rename the file** (e.g. `r00m.html`) and update
the one `href` in `index.html`. To make it truly private, delete `secret.html`
from the repo — GitHub Pages is fully public, so a link is obscurity, not a lock.

## Deploy

```bash
git init
git add .
git commit -m "init site"
git branch -M main
git remote add origin https://github.com/Dracox-Mao/Dracox-Mao.github.io.git
git push -u origin main
```

Then: repo → Settings → Pages → Source: **Deploy from a branch** → `main` / `/ (root)`.
Site goes live at <https://dracox-mao.github.io/>.

`.nojekyll` is included so GitHub Pages skips Jekyll — no processing, no surprises.

## Edit

All content lives in `index.html`: the About section, the "Systems I've lived in"
chips, and the Elsewhere links. Colors are CSS variables at the top of `style.css`;
the site follows the OS light/dark setting automatically.
