sap.ui.jsview("tm.nav.view.App", {  // this View file is called Address.view.js

   getControllerName: function() {
      return "tm.nav.view.App";     // the Controller lives in Address.controller.js
   },

   createContent: function(oController) {
       var oBlockDiv = new ute.ui.commons.BlockDivision();

       var oLabel = new sap.ui.commons.Label();
       oLabel.setText('this is a content from a label');
       oBlockDiv.setContent(oLabel);
       return oBlockDiv;
   }

});
