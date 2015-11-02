/*global sap*/
/*globals ute*/
/*globals $*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'jquery.sap.global'
    ],

    function (CoreController, jQuery) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.dashboard.view.ServiceOrder');

        Controller.prototype.onInit = function () {
            //Code to retrivie user role
            /*var oWebUiManager = this.getOwnerComponent().getCcuxWebUiManager();

            if (oWebUiManager) {
                oWebUiManager.notifyWebUi('getBusinessRole', null, this._handleBsnsRlCallback, this);
            } else {
                return;
            }*/
        };

        Controller.prototype.onBeforeRendering = function () {
            var oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo();

            this.getView().setModel(this.getOwnerComponent().getModel('comp-dhsbsvcodr'), 'oODataSvc');
			//this.getView().setModel(this.getOwnerComponent().getModel('comp-dashboard'), 'oODataSvc');
            //this.getView().setModel(this.getOwnerComponent().getModel('comp-dashboard-AcctAccessPty'),'oDataASvc');

            //Model to keep information to show
			this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oSelectedTabs');

            // Retrieve routing parameters
            this._bpNum = oRouteInfo.parameters.bpNum;
            this._caNum = oRouteInfo.parameters.caNum;
            this._coNum = oRouteInfo.parameters.coNum;

            this._initSelectTab();

        };

        Controller.prototype._handleBsnsRlCallback = function (oEvent) {
            var oTemp = oEvent;
            return;
        };

        /********************************************************************************************************************************/
        //Init functions
        /********************************************************************************************************************************/
        Controller.prototype._initSelectTab = function () {
            this.getView().getModel('oSelectedTabs').setProperty('/pendingSelected', true);
            this.getView().getModel('oSelectedTabs').setProperty('/completeSelected', false);
        };
        /********************************************************************************************************************************/


        /********************************************************************************************************************************/
        //Handler functions
        /********************************************************************************************************************************/
        Controller.prototype._onPendingTabClicked = function () {
            this.getView().getModel('oSelectedTabs').setProperty('/pendingSelected', true);
            this.getView().getModel('oSelectedTabs').setProperty('/completeSelected', false);
        };

        Controller.prototype._onCompleteTabClicked = function () {
            this.getView().getModel('oSelectedTabs').setProperty('/pendingSelected', false);
            this.getView().getModel('oSelectedTabs').setProperty('/completeSelected', true);
        };
        /********************************************************************************************************************************/


		return Controller;
	}
);
