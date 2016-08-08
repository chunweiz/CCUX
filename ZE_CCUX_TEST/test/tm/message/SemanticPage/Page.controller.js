sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
	], function(jQuery, Controller, JSONModel) {
	"use strict";

	var PageController = Controller.extend("sap.m.sample.SemanticPage.Page", {

	onInit: function () {
		var oModel = new JSONModel(jQuery.sap.getModulePath("/products.json"));
		this.getView().setModel(oModel);


		var oMessageProcessor = new sap.ui.core.message.ControlMessageProcessor();
		var oMessageManager = sap.ui.getCore().getMessageManager();

		oMessageManager.registerMessageProcessor(oMessageProcessor);

		oMessageManager.addMessages(
				new sap.ui.core.message.Message({
					message: "Something wrong happened",
					type: sap.ui.core.MessageType.Error,
					processor: oMessageProcessor
				})
		);
	},
	onPress: function (evt) {
		sap.m.MessageToast.show("Pressed custom button " + evt.getSource().getId());
	},
	onSemanticButtonPress: function (evt) {
		sap.m.MessageToast.show("Pressed: " + evt.getSource().getType());
	},
	onSemanticSelectChange: function (oEvent, oData) {
		var sType = oEvent.oSource.getType();
		var sStatusText = sType + " by " + oEvent.oSource.getSelectedItem().getText();
		sap.m.MessageToast.show("Selected: " + sStatusText);
	},
	onNavButtonPress: function (evt) {
		sap.m.MessageToast.show("Pressed navigation button");
	}
});


	return PageController;

});
