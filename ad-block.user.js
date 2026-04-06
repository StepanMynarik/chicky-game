// ==UserScript==
// @name         Ad-Block
// @match        *://*/*
// @include      *://*/*
// @run-at       document-end
// ==/UserScript==

(function () {
  const style = document.createElement('style');
  style.textContent = '[role=presentation], [role=presentation] * { pointer-events: none !important; }';
  document.head.appendChild(style);
})();
