jQuery.sap.require("sap.ui.core.IconPool");
sap.ui.jsview("nb.view", {

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

		var notifications = new sap.ui.commons.Label({text:"Notifications"}).addStyleClass("labelStyle");
		var badges = new sap.ui.commons.Label({text:"Badges"}).addStyleClass("labelStyle");
		var alert1 = new sap.ui.commons.Label({text:"alert"});
		var attention1 = new sap.ui.commons.Label({text:"attention"});
		var regular1 = new sap.ui.commons.Label({text:"regular"});
		var link1 = new sap.ui.commons.Label({text:"link"});
		var alert2 = new sap.ui.commons.Label({text:"alert"});
		var attention2 = new sap.ui.commons.Label({text:"attention"});
		var regular2 = new sap.ui.commons.Label({text:"regular"});


		var sURI = sap.ui.core.IconPool.getIconURI("icon-notification2x", "nrgcustomicons");
		var notiIcon1 = new sap.ui.core.Icon( {
             src : sURI,
             color : "#FF0000",
           }).addStyleClass("icon-notification2x");
		var notiIcon2 = new sap.ui.core.Icon( {
			src : sURI,
            color : "#FFAA00",
          }).addStyleClass("icon-notification2x");
		var notiIcon3 = new sap.ui.core.Icon( {
			src : sURI,
            color : "#989898",
          }).addStyleClass("icon-notification2x");
		var notiIcon4 = new sap.ui.core.Icon( {
			src : sURI,
            color : "#33CCFF",
          }).addStyleClass("icon-notification2x");

		var sURI = sap.ui.core.IconPool.getIconURI("icon-badge2x", "nrgcustomicons");
		var badgeIcon1 = new sap.ui.core.Icon( {
			src : sURI,
            color : "#FF0011",
          }).addStyleClass("icon-badge2x");
		var badgeIcon2 = new sap.ui.core.Icon( {
			src : sURI,
            color : "#FFAA00",
          }).addStyleClass("icon-badge2x");
		var badgeIcon3 = new sap.ui.core.Icon( {
			src : sURI,
            color : "#00CC99",
          }).addStyleClass("icon-badge2x");

		mLayout.createRow(notifications);
		mLayout.createRow(alert1,attention1,regular1,link1);
		mLayout.createRow(notiIcon1,notiIcon2,notiIcon3,notiIcon4);
		mLayout.createRow(null);
		mLayout.createRow(badges);
		mLayout.createRow(alert2,attention2,regular2);
		mLayout.createRow(badgeIcon1,badgeIcon2,badgeIcon3);

		oPan.addContent(mLayout);

		return oPan;

	}


});
