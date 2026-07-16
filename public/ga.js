/* danielolliver.com — GA4 analytics loader (async, non-blocking).
   Loaded on every page via <script defer src="/ga.js">. Change ID + redeploy to rotate. */
(function () {
  var ID = "G-Q0SM2K1KLW";
  if (!ID) return;
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag("js", new Date());
  gtag("config", ID);
})();
