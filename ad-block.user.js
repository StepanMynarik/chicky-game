// ==UserScript==
// @name         Ad-Block
// @match        *://*/*
// @run-at       document-end
// ==/UserScript==

(function () {
  const SELECTORS = [
    '[role=presentation]',
  ];

  const strip = el => {
    const clone = el.cloneNode(true);
    el.replaceWith(clone);
  };

  SELECTORS
    .flatMap(sel => [...document.querySelectorAll(sel)])
    .forEach(strip);
})();