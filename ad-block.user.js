// ==UserScript==
// @name         Ad-Block
// @match        *://*/*
// @run-at       document-end
// ==/UserScript==

(function () {

  const AD_SELECTORS = [
    'iframe[src*="doubleclick.net"]',
    'iframe[src*="googlesyndication.com"]',
    'iframe[src*="adnxs.com"]',
    'iframe[src*="amazon-adsystem.com"]',
    '[id*="google_ads"]',
    '[id*="ad-container"]',
    '[id*="AdContainer"]',
    '[class*="ad-banner"]',
    '[class*="ad-slot"]',
    '[class*="sponsored-content"]',
    '[aria-label="Advertisements"]',
    '[aria-label="Advertisement"]',
  ];

  const removeAds = () => {
    AD_SELECTORS
      .flatMap(sel => [...document.querySelectorAll(sel)])
      .forEach(el => el.remove());
  };

  removeAds();

  // Re-run as page loads dynamic content
  new MutationObserver(removeAds).observe(document.body, {
    childList: true,
    subtree: true,
  });

  const iframe = document.querySelector('iframe[src*=".google.com"]');
  if (!iframe) return;

  const veil = document.createElement('div');
  const rect = iframe.getBoundingClientRect();
  veil.style.cssText = `
    position: fixed;
    top: ${rect.top}px;
    left: ${rect.left}px;
    width: ${rect.width}px;
    height: ${rect.height}px;
    z-index: 99;
    cursor: default;
  `;
  document.body.appendChild(veil);

  const update = () => {
    const r = iframe.getBoundingClientRect();
    veil.style.top = r.top + 'px';
    veil.style.left = r.left + 'px';
    veil.style.width = r.width + 'px';
    veil.style.height = r.height + 'px';
  };

  window.addEventListener('resize', update);
  window.addEventListener('scroll', update, true);

})();
