/*global sap*/
/*globals ute*/
/*globals $*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'jquery.sap.global',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator'
    ],

    function (CoreController, jQuery, Filter, FilterOperator) {
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

            this.getView().setModel(this.getOwnerComponent().getModel('comp-dashboard-svcodr'), 'oODataSvc');
			//this.getView().setModel(this.getOwnerComponent().getModel('comp-dashboard'), 'oODataSvc');
            //this.getView().setModel(this.getOwnerComponent().getModel('comp-dashboard-AcctAccessPty'),'oDataASvc');

            //Model to keep information to show
			this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oSelectedTabs');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oPndingVisType');

            //Model for ESID dropdown
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oESIDDropdown');

            // Retrieve routing parameters
            this._bpNum = oRouteInfo.parameters.bpNum;
            this._caNum = oRouteInfo.parameters.caNum;
            this._coNum = oRouteInfo.parameters.coNum;

            //init displaying model
            this._initSelectTab();
            this._initPndingVisType();

            //Init dropdpwn
            this._initESIDDropdown();

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

        Controller.prototype._initPndingVisType = function () {
            this.getView().getModel('oPndingVisType').setProperty('/visMovein', true);
            this.getView().getModel('oPndingVisType').setProperty('/visReconnect', true);
            this.getView().getModel('oPndingVisType').setProperty('/visDisconnect', true);
            this.getView().getModel('oPndingVisType').setProperty('/visOthers', true);
        };

        Controller.prototype._initESIDDropdown = function () {
            this._retrESIDs();
        };
        /********************************************************************************************************************************/

        /********************************************************************************************************************************/
        //Formatter functions
        /********************************************************************************************************************************/
        Controller.prototype._formatVisPnd = function (bPndSelected, bTypeOrder) {
            return bPndSelected && bTypeOrder;
        };

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

        /********************************************************************************************************************************/
        //Service call functions
        /********************************************************************************************************************************/
        Controller.prototype._retrESIDs = function () {
            var sPath,
                aFilters = [],
                oParameters,
                oModel = this.getView().getModel('oODataSvc');

            aFilters.push(new Filter({ path: 'CA', operator: FilterOperator.EQ, value1: this._caNum}));

            sPath = '/SrvAddrS';

            oParameters = {
                filters: aFilters,
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oESIDDropdown').setData(oData);
                    }
                }.bind(this),
                error: function (oError) {
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }

        };
        /********************************************************************************************************************************/

		return Controller;
	}
);
