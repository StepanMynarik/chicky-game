// ==UserScript==
// @name         Ad-Block
// @match        *://*/*
// @run-at       document-end
// ==/UserScript==

(function () {
  const iframe = document.querySelector('iframe[src*="calendar.google.com"]');
  const veil = document.createElement('div');
  
  const rect = iframe.getBoundingClientRect();
  veil.style.cssText = `
    position: fixed;
    top: ${rect.top}px;
    left: ${rect.left}px;
    width: ${rect.width}px;
    height: ${rect.height}px;
    z-index: 9999;
    cursor: default;
  `;
  
  document.body.appendChild(veil);
})();
