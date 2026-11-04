/* Single post: ?p=<slug> → find it in window.POSTS → render its markdown.
   The markdown bodies are inlined into posts.js by build.py, so this page
   needs no fetch and works from file://, minis:// and GitHub Pages alike. */
(function () {
  'use strict';

  var titleEl = document.getElementById('post-title');
  var metaEl = document.getElementById('post-meta');
  var tagsEl = document.getElementById('post-tags');
  var bodyEl = document.getElementById('post-body');

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function fail(msg) {
    titleEl.textContent = '找不到这篇文章';
    bodyEl.innerHTML = '<p class="muted">' + esc(msg) + '</p>' +
      '<p><a href="blog.html">回到日志列表</a></p>';
    document.title = '找不到这篇文章 — Dracox Mao';
  }

  var params = new URLSearchParams(location.search);
  var slug = params.get('p');
  if (!slug) { fail('地址里没有文章编号。'); return; }

  var posts = (window.POSTS && window.POSTS.posts) || [];
  var post = null;
  for (var i = 0; i < posts.length; i++) {
    if (posts[i].slug === slug) { post = posts[i]; break; }
  }
  if (!post) { fail('没有这篇，可能链接写错了。'); return; }

  document.title = post.title + ' — Dracox Mao';
  titleEl.textContent = post.title;

  var bits = [];
  if (post.date) bits.push(post.date.replace(/-/g, '/'));
  if (post.readingTime) bits.push('约 ' + post.readingTime + ' 分钟');
  metaEl.textContent = bits.join(' · ');

  tagsEl.innerHTML = (post.tags || []).map(function (t) {
    return '<span class="tag">' + esc(t) + '</span>';
  }).join('');

  bodyEl.innerHTML = window.MiniMD.render(post.body || '（这篇还没有正文）');

  window.addEventListener('load', function () {
    setTimeout(function () {
      var wrap = document.querySelector('.giscus-wrap');
      var hint = document.getElementById('giscus-hint');
      if (!wrap || !hint) return;
      if (wrap.querySelector('iframe')) {
        wrap.removeAttribute('data-giscus');
        hint.hidden = true;
      }
    }, 4000);
  });
})();
