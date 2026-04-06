// ==UserScript==
// @name         Ad-Block
// @match        https://calendar.google.com/*
// @include      https://calendar.google.com/*
// @run-at       document-end
// ==/UserScript==

(function () {
  const style = document.createElement('style');
  style.textContent = '[role=presentation], [role=presentation] * { pointer-events: none !important; }';
  document.head.appendChild(style);
})();
