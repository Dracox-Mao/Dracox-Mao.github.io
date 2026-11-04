#!/usr/bin/env python3
"""把 posts.json + posts/*.md 合并成 posts.js。

用法：
    python3 build.py            # 重新生成 posts.js
加新文章的流程见 BLOG.md。
"""
import io
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
INDEX = os.path.join(HERE, 'posts.json')
OUT = os.path.join(HERE, 'posts.js')


def main():
    with io.open(INDEX, encoding='utf-8') as f:
        data = json.load(f)

    posts = data.get('posts', [])
    built = []
    for p in posts:
        q = dict(p)
        src = q.pop('file', None) or 'posts/%s.md' % q['slug']
        path = os.path.join(HERE, src)
        if not os.path.exists(path):
            sys.stderr.write('缺少正文文件：%s\n' % src)
            sys.exit(1)
        with io.open(path, encoding='utf-8') as f:
            q['body'] = f.read()
        built.append(q)

    # 新文章排前面
    built.sort(key=lambda x: x.get('date', ''), reverse=True)

    js = (
        '/* GENERATED — 不要手改。\n'
        '   源数据：posts.json + posts/*.md\n'
        '   重新生成：python3 build.py\n'
        '   为什么用脚本而不是 fetch：本地 file:// / minis:// 预览下 fetch 会被 CORS 拦掉。 */\n'
        'window.POSTS = '
        + json.dumps({'posts': built}, ensure_ascii=False, indent=2)
        + ';\n'
    )
    with io.open(OUT, 'w', encoding='utf-8') as f:
        f.write(js)

    print('posts.js 已更新，共 %d 篇' % len(built))


if __name__ == '__main__':
    main()
