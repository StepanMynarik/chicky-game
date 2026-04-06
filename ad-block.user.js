// ==UserScript==
// @name         Ad-Block
// @match        https://calendar.google.com/*
// @run-at       document-start
// ==/UserScript==

(function () {
  const registry = new WeakMap();
  const orig = EventTarget.prototype.addEventListener;

  EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (!registry.has(this)) registry.set(this, []);
    registry.get(this).push({ type, listener, options });
    return orig.call(this, type, listener, options);
  };

  window.__removeHandlers = (selector, eventType) => {
    document.querySelectorAll(selector).forEach(el => {
      const listeners = registry.get(el) || [];
      listeners
        .filter(l => l.type === eventType)
        .forEach(({ type, listener, options }) => {
          el.removeEventListener(type, listener, options);
        });
    });
  };
  
  setInterval(() => window.__removeHandlers('[role=presentation]', 'click'), 500);
})();
