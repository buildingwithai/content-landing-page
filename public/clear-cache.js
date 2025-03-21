// Force favicon cache refresh
window.addEventListener("load", function () {
  // Create a new link element
  var link =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");
  link.type = "image/png";
  link.rel = "shortcut icon";
  link.href = "/GTM LABS LOGO (1).png?v=" + new Date().getTime();
  document.getElementsByTagName("head")[0].appendChild(link);
});
