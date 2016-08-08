/*jQuery.sap.require("sap.ui.core.IconPool");*/
sap.ui.jsview("nb", {

	/** Specifies the Controller belonging to this View.
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf customIconsUsingFonts.customIconsUsingFonts
	*/
	getControllerName : function() {
		return "nb.controller";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
	* Since the Controller is given to this method, its event handlers can be attached right away.
	* @memberOf customIconsUsingFonts.customIconsUsingFonts
	*/
	createContent : function(oController) {

		var oPan = new sap.ui.commons.Panel({id:"panel1",text:"NRG Custom Icons",width:"400px"});
		var mLayout = new sap.ui.commons.layout.MatrixLayout();

        var rhs = new sap.ui.commons.Label(({text:"RHS"}));

        var rhsIcon = new sap.ui.core.Icon( {
            // src : sURI,
             color : "#FF0000"
           });
        rhsIcon.addStyleClass("icon-NRG-rhs");

        mlayout.createrow(rhsIcon);

		oPan.addContent(mLayout);

		return oPan;

	}


});
