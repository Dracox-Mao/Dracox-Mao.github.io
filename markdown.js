/* Minimal markdown → HTML, enough for blog posts.
   Supports: headings, paragraphs, bold/italic/inline code, links,
   unordered/ordered lists, fenced code blocks, blockquotes, hr, images. */
(function (global) {
  'use strict';

  function esc(s) {
    return s.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
  }

  function inline(s) {
    var out = esc(s);
    // inline code first, protect contents with placeholders
    var codes = [];
    out = out.replace(/`([^`]+)`/g, function (_, c) {
      codes.push(c);
      return '\u0000CODE' + (codes.length - 1) + '\u0000';
    });
    out = out.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img alt="$1" src="$2" loading="lazy">');
    out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" rel="noopener">$1</a>');
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
    out = out.replace(/\u0000CODE(\d+)\u0000/g, function (_, i) {
      return '<code>' + codes[+i] + '</code>';
    });
    return out;
  }

  function md(src) {
    var lines = String(src).replace(/\r\n/g, '\n').split('\n');
    var html = [];
    var i = 0;
    var para = [];
    var listType = null;
    var listItems = [];

    function flushPara() {
      if (para.length) {
        html.push('<p>' + inline(para.join(' ')) + '</p>');
        para = [];
      }
    }
    function flushList() {
      if (listType) {
        html.push('<' + listType + '>' + listItems.join('') + '</' + listType + '>');
        listType = null;
        listItems = [];
      }
    }

    while (i < lines.length) {
      var line = lines[i];

      // fenced code
      if (/^```/.test(line)) {
        flushPara(); flushList();
        var lang = line.replace(/^```/, '').trim();
        var buf = [];
        i++;
        while (i < lines.length && !/^```/.test(lines[i])) {
          buf.push(lines[i]);
          i++;
        }
        i++;
        html.push('<pre><code' + (lang ? ' class="lang-' + esc(lang) + '"' : '') + '>' +
                  esc(buf.join('\n')) + '</code></pre>');
        continue;
      }

      if (!line.trim()) { flushPara(); flushList(); i++; continue; }

      if (/^---+$/.test(line.trim())) {
        flushPara(); flushList();
        html.push('<hr>');
        i++;
        continue;
      }

      var h = line.match(/^(#{1,4})\s+(.*)$/);
      if (h) {
        flushPara(); flushList();
        var lvl = Math.min(h[1].length + 1, 4); // ## → h3 on page (page has its own h2)
        html.push('<h' + lvl + '>' + inline(h[2].trim()) + '</h' + lvl + '>');
        i++;
        continue;
      }

      if (/^>\s?/.test(line)) {
        flushPara(); flushList();
        var quote = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) {
          quote.push(lines[i].replace(/^>\s?/, ''));
          i++;
        }
        html.push('<blockquote>' + inline(quote.join(' ')) + '</blockquote>');
        continue;
      }

      var ul = line.match(/^\s*[-*]\s+(.*)$/);
      var ol = line.match(/^\s*\d+\.\s+(.*)$/);
      if (ul || ol) {
        flushPara();
        var want = ul ? 'ul' : 'ol';
        if (listType && listType !== want) flushList();
        listType = want;
        listItems.push('<li>' + inline((ul ? ul[1] : ol[1]).trim()) + '</li>');
        i++;
        continue;
      }

      if (listType) flushList();
      para.push(line.trim());
      i++;
    }

    flushPara();
    flushList();
    return html.join('\n');
  }

  global.MiniMD = { render: md, escape: esc };
})(window);
