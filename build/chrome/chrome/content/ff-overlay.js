// file that adds the menu item for the extension
// standard implementation

cmap1.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ cmap1.showFirefoxContextMenu(e); }, false);
};

cmap1.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-cmap1").hidden = gContextMenu.onImage;
};

window.addEventListener("load", function () { cmap1.onFirefoxLoad(); }, false);
