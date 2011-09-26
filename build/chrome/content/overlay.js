// js to control launching of the menu command
var cmap1 = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("cmap1-strings");
  },

  onMenuItemCommand: function(e) {
	window.open("chrome://cmap1/content/cmap1.xul", "newWindow", "chrome,centerscreen,resizable");
  },

  onToolbarButtonCommand: function(e) {
    // just reuse the function above.  you can change this, obviously!
    cmap1.onMenuItemCommand(e);
  }
};

window.addEventListener("load", function () { cmap1.onLoad(); }, false);
