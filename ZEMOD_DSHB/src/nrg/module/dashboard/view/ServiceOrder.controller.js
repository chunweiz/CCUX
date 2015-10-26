	/*globals sap*/
	/*globals ute*/
	/*jslint nomen:true*/

	sap.ui.define(
		[
			'nrg/base/view/BaseController',
			'sap/ui/core/routing/HashChanger',
			'sap/ui/model/json/JSONModel',
			'sap/ui/model/Filter',
			'sap/ui/model/FilterOperator'
		],

		function (CoreController, HashChanger, JSONModel, Filter, FilterOperator) {
			'use strict';

			var Controller = CoreController.extend('nrg.module.dashboard.view.ServiceOrder');

			Controller.prototype.onInit = function(){

			};

			Controller.prototype.onBeforeRendering = function () {
				this.getView().setModel(this.getOwnerComponent().getModel('comp-dashboard'), 'oODataSvc');

				//Model to keep information to show
				this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oSmryBpInf');

				this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oSmryBuagInf');

				this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oSmryAllBuags');

				//Model to keep segmentation information
				this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oSmryBpSegInf');

				//Model to keep Segmentation Info if it's more than 3 segmentations
				this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oSmryBpAllSegInf');

				//Model to keep Assainged Accounts
				this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oSmryAssignedAccounts');

				//Model to Keep Account Access Authorizations
				this.getView().setModel(new sap.ui.model.json.JSONModel(),'oSmryAccessAuth');

				// Retrieve routing parameters
				var oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo();

				this._bpNum = oRouteInfo.parameters.bpNum;
				this._caNum = oRouteInfo.parameters.caNum;
				this._coNum = oRouteInfo.parameters.coNum;

			};

			return Controller;

		}
);
