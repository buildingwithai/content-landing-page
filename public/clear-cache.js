// Force favicon cache refresh
window.addEventListener("load", function () {
  // Create a new link element
  var link =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = "/favicon.ico?v=" + new Date().getTime();
  document.getElementsByTagName("head")[0].appendChild(link);
});
