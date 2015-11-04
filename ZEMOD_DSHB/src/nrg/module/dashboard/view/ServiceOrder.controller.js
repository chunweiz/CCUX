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

            //Model for Movin Enroll
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oEnrollHolds');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oEnrollPndingStats');

            //Model for Reconnect
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oReconOrds');

            //Model for Disconnect
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDiscOrds');

            //Model for Others
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oOtherOrds');

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
            this.getView().getModel('oPndingVisType').setProperty('/visMovein', false);
            this.getView().getModel('oPndingVisType').setProperty('/visReconnect', false);
            this.getView().getModel('oPndingVisType').setProperty('/visDisconnect', false);
            this.getView().getModel('oPndingVisType').setProperty('/visOthers', false);
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

        Controller.prototype._formatDate = function (oDate) {
            var sFormattedDate;

            if (!oDate) {
                return null;
            } else {
                sFormattedDate = (oDate.getMonth() + 1).toString() + '/' + oDate.getDate().toString() + '/' + oDate.getFullYear().toString().substring(2, 4);
                return sFormattedDate;
            }
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

        Controller.prototype._onESIDSelect = function (oEvent) {
            var temp = oEvent;
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
                        oData.results.selectedKey = '';
                        this.getView().getModel('oESIDDropdown').setData(oData);
                        this.getView().byId('idESIDDropdown').setSelectedKey(oData.results[0].ESID);
                        this._retrEnrollHolds(oData.results[0].ESID, oData.results[0].Contract);
                    }
                }.bind(this),
                error: function (oError) {
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }

        };

        Controller.prototype._retrEnrollHolds = function (sESID, sContract) {
            var sPath,
                aFilters = [],
                oParameters,
                oModel = this.getView().getModel('oODataSvc');

            aFilters.push(new Filter({ path: 'Contract', operator: FilterOperator.EQ, value1: sContract}));
            aFilters.push(new Filter({ path: 'ESID', operator: FilterOperator.EQ, value1: sESID}));

            sPath = '/EnrollHoldS';

            oParameters = {
                filters: aFilters,
                success : function (oData) {
                    if (oData.results.length > 0) {
                        this.getView().getModel('oEnrollHolds').setData(oData);
                        this.getView().getModel('oPndingVisType').setProperty('/visMovein', true);
                        this._retrEnrollPndingStats(this._bpNum, this._caNum);
                    } else {
                        sPath = 'test';
                    }
                    //This part need to move to else later
                    this._retrReconOrds(this._bpNum, this._caNum, sContract, sESID);

                }.bind(this),
                error: function (oError) {
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        Controller.prototype._retrEnrollPndingStats = function (sBpNum, sCaNum) {
            var sPath,
                aFilters = [],
                oParameters,
                oModel = this.getView().getModel('oODataSvc');

            aFilters.push(new Filter({ path: 'BP', operator: FilterOperator.EQ, value1: sBpNum}));
            aFilters.push(new Filter({ path: 'CA', operator: FilterOperator.EQ, value1: sCaNum}));

            sPath = '/PendStatS';

            oParameters = {
                filters: aFilters,
                success : function (oData) {
                    if (oData.results.length > 0) {
                        this.getView().getModel('oEnrollPndingStats').setData(oData);
                        this.getView().getModel('oPndingVisType').setProperty('/visMovein', true);
                    }
                }.bind(this),
                error: function (oError) {
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        Controller.prototype._retrReconOrds = function (sBpNum, sCaNum, sCoNum, sESID) {
            var sPath,
                aFilters = [],
                oParameters,
                oModel = this.getView().getModel('oODataSvc');

            aFilters.push(new Filter({ path: 'BP', operator: FilterOperator.EQ, value1: sBpNum}));
            aFilters.push(new Filter({ path: 'CA', operator: FilterOperator.EQ, value1: sCaNum}));
            aFilters.push(new Filter({ path: 'Contract', operator: FilterOperator.EQ, value1: sCoNum}));
            aFilters.push(new Filter({ path: 'ESID', operator: FilterOperator.EQ, value1: sESID}));

            sPath = '/ReconOrdS';

            oParameters = {
                filters: aFilters,
                success : function (oData) {
                    if (oData.results.length > 0) {
                        this.getView().getModel('oReconOrds').setData(oData);
                        this.getView().getModel('oPndingVisType').setProperty('/visReconnect', true);
                    }
                }.bind(this),
                error: function (oError) {
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

         /*//Model for Reconnect
            this.getView().setModel(new sap.ui.model.json.JSONModel(), '');

            //Model for Disconnect
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDiscOrds');

            //Model for Others
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oOtherOrds');*/

        /********************************************************************************************************************************/

		return Controller;
	}
);
