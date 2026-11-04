/* Blog index: renders the post list from posts.js (window.POSTS).
   Using a script instead of fetch() keeps it working from file:// and
   from the local minis:// preview, where fetch() is CORS-blocked. */
(function () {
  'use strict';

  var list = document.getElementById('post-list');
  if (!list) return;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function fmtDate(d) {
    if (!d) return '';
    var parts = String(d).split('-');
    if (parts.length !== 3) return esc(d);
    return parts[0] + ' 年 ' + parseInt(parts[1], 10) + ' 月 ' + parseInt(parts[2], 10) + ' 日';
  }

  var data = window.POSTS || { posts: [] };
  var posts = (data.posts || []).slice();

  if (!posts.length) {
    list.innerHTML = '<p class="muted small">还没有文章。第一篇文章正在路上。</p>';
  } else {
    posts.sort(function (a, b) {
      return String(b.date || '').localeCompare(String(a.date || ''));
    });
    list.innerHTML = posts.map(function (p) {
      var tags = (p.tags || []).map(function (t) {
        return '<span class="tag">' + esc(t) + '</span>';
      }).join('');
      return '<a class="post-item" href="post.html?p=' + encodeURIComponent(p.slug) + '">' +
        '<h3>' + esc(p.title) + '</h3>' +
        '<p class="post-meta">' + fmtDate(p.date) +
        (p.readingTime ? ' · 约 ' + esc(p.readingTime) + ' 分钟' : '') + '</p>' +
        (p.summary ? '<p class="post-summary">' + esc(p.summary) + '</p>' : '') +
        (tags ? '<div class="tagrow">' + tags + '</div>' : '') +
        '</a>';
    }).join('');
  }

  // giscus still loading / misconfigured → say so instead of an empty box
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
