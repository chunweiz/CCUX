/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'nrg/module/app/view/App',
        'nrg/module/app/view/AppHeader'
    ],

    function (Controller, App, AppHeader) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.app.view.CcuxApp');

        CustomController.prototype.onInit = function () {
            this._oApp = new App(this);
        };

        CustomController.prototype.getApp = function () {
            return this._oApp;
        };

        CustomController.prototype._onQuickLinkClick = function (oControlEvent) {
            this._oApp.setHeaderMenuItemSelected(false, App.HMItemId.Menu);

            switch (oControlEvent.getSource().getId()) {
            case App.QuickLinkId.Dashboard:
                this._onDashboardClick(oControlEvent);
                break;
            case App.QuickLinkId.Campaign:
                this._onCampaignClick(oControlEvent);
                break;
            }
        };

        CustomController.prototype._onDashboardClick = function (oControlEvent) {
            var oContext, oRouter;

            oContext = this.getOwnerComponent().getCcuxContextManager().getContext().getData();
            oRouter = this.getOwnerComponent().getRouter();

            if (oContext.dashboard && oContext.dashboard.bpNum) {
                oRouter.navTo('dashboard.Bp', {
                    bpNum: oContext.dashboard.bpNum
                });
            }
        };

        CustomController.prototype._onCampaignClick = function (oControlEvent) {
            var oContext, oRouter;

            oContext = this.getOwnerComponent().getCcuxContextManager().getContext().getData();
            oRouter = this.getOwnerComponent().getRouter();

            if (oContext.dashboard && oContext.dashboard.coNum) {
                oRouter.navTo('campaign', {
                    coNum: oContext.dashboard.coNum,
                    typeV: 'C' //TODO: hardcoded to current for the time being, need to revise
                });
            }
        };

        CustomController.prototype._onMenuPress = function (oControlEvent) {
            this._oApp._getHeader().setSelected(
                oControlEvent.getSource().getSelected(),
                AppHeader.HMItemId.Menu
            );
        };

        CustomController.prototype._onMessagesPress = function (oControlEvent) {
            this._oApp._getHeader().setSelected(
                oControlEvent.getSource().getSelected(),
                AppHeader.HMItemId.Messages
            );
        };

        CustomController.prototype._onIndexPress = function (oControlEvent) {
            var oWebUiManager = this.getOwnerComponent().getCcuxWebUiManager();

            this._oApp._getHeader().setSelected(
                oControlEvent.getSource().getSelected(),
                AppHeader.HMItemId.Index
            );

            this._oApp.setOccupied(true);
            oWebUiManager.notifyWebUi('openIndex', {}, this._onIndexPressCallback, this);
        };

        CustomController.prototype._onIndexPressCallback = function (oEvent) {
            this._oApp.setOccupied(false);
        };

        CustomController.prototype._onTransactionPress = function (oControlEvent) {
            var oWebUiManager = this.getOwnerComponent().getCcuxWebUiManager();

            this._oApp._getHeader().setSelected(
                oControlEvent.getSource().getSelected(),
                AppHeader.HMItemId.Transaction
            );

            this._oApp.setOccupied(true);
            oWebUiManager.notifyWebUi('launchTransaction', {}, this._onTransactionPressCallback, this);
        };

        CustomController.prototype._onTransactionPressCallback = function (oEvent) {
            this._oApp.setOccupied(false);
        };

        CustomController.prototype._onEsidToolPress = function (oControlEvent) {
            var oWebUiManager = this.getOwnerComponent().getCcuxWebUiManager();

            this._oApp._getHeader().setSelected(
                oControlEvent.getSource().getSelected(),
                AppHeader.HMItemId.EsidTool
            );

            this._oApp.setOccupied(true);
            oWebUiManager.notifyWebUi('openEsidTool', {}, this._onEsidToolPressCallback, this);
        };

        CustomController.prototype._onEsidToolPressCallback = function (oEvent) {
            this._oApp.setOccupied(false);
        };

        CustomController.prototype._onPalPlusPress = function (oControlEvent) {
            var oWebUiManager = this.getOwnerComponent().getCcuxWebUiManager();

            this._oApp._getHeader().setSelected(
                oControlEvent.getSource().getSelected(),
                AppHeader.HMItemId.PalPlus
            );

            this._oApp.setOccupied(true);
            oWebUiManager.notifyWebUi('openPalPlus', {}, this._onPalPlusPressCallback, this);
        };

        CustomController.prototype._onPalPlusPressCallback = function (oEvent) {
            this._oApp.setOccupied(false);
        };

        CustomController.prototype._onRefreshPress = function (oControlEvent) {
            var oWebUiManager, oRouter, oRouteManager, oCurrRouteInfo;

            oWebUiManager = this.getOwnerComponent().getCcuxWebUiManager();

            this._oApp._getHeader().setSelected(
                oControlEvent.getSource().getSelected(),
                AppHeader.HMItemId.Refresh
            );

            oWebUiManager.notifyWebUi('refresh');

            oRouteManager = this.getOwnerComponent().getCcuxRouteManager();
            oCurrRouteInfo = oRouteManager.getCurrentRouteInfo();

            oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo('app.refresh');
            oRouter.navTo(oCurrRouteInfo.name, oCurrRouteInfo.parameters);
        };

        CustomController.prototype._onClearAccPress = function (oControlEvent) {
            var oWebUiManager = this.getOwnerComponent().getCcuxWebUiManager();

            this._oApp._getHeader().setSelected(
                oControlEvent.getSource().getSelected(),
                AppHeader.HMItemId.ClearAcc
            );

            this._oApp.setOccupied(true);
            oWebUiManager.notifyWebUi('clearAccount', {}, this._onClearAccPressCallback, this);
        };

        CustomController.prototype._onClearAccPressCallback = function (oEvent) {
            var oContext, oRouter;

            this._oApp.setOccupied(false);
            oContext = this.getOwnerComponent().getCcuxContextManager().resetContext();
            oRouter = this.getOwnerComponent().getRouter();

            oRouter.navTo('app.refresh');
            oRouter.navTo('dashboard.SearchNoID'); //SearchNoIDREBS - need to differentiate between rebs and normal?
        };

        CustomController.prototype._onLogoffPress = function (oControlEvent) {
            var oWebUiManager = this.getOwnerComponent().getCcuxWebUiManager();

            this._oApp._getHeader().setSelected(
                oControlEvent.getSource().getSelected(),
                AppHeader.HMItemId.Logout
            );

            this._oApp.setOccupied(true);
            oWebUiManager.notifyWebUi('logout', {}, this._onLogoffPressCallback, this);
        };

        CustomController.prototype._onLogoffPressCallback = function (oEvent) {
            var oResponse = oEvent.getParameters();
            if (oResponse.CANCEL && oResponse.CANCEL === 'X') {
                this._oApp.setOccupied(false);
            }
        };

        return CustomController;
    }
);
