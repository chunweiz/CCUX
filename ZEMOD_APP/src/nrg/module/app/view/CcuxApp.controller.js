/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'nrg/module/app/view/App',
        'nrg/module/app/view/AppHeader',
        'sap/ui/model/json/JSONModel'
    ],

    function (Controller, App, AppHeader, JSONModel) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.app.view.CcuxApp');

        CustomController.prototype.onBeforeRendering = function () {
            this.getView().setModel(new JSONModel({
                notification: [
                    { link: false, design: 'Warning', text: 'Lite Up Customer' },
                    { link: false, design: 'Error', text: 'Invalid Mailing Address' },
                    { link: true, design: 'Success', text: 'Customer is eligible for extension' },
                    { link: false, design: 'Information', text: 'This is a normal text.' },
                    { link: true, design: 'Error', text: 'Late fee for last month was not paid.' },
                    { link: true, design: 'Error', text: 'Disconnection notice amount - $130.00. Net amount - $110.00. Due Date: 11/20/2014' }
                ],
                rhs : {
                    current: 'Water Heater Protect $1000',
                    pending: 'None',
                    history: 'Plumbing Essentials'
                }
            }), 'view-data');
        };

        CustomController.prototype.onInit = function () {
            this._oApp = new App(this);

            this.getView().setModel(
                sap.ui.getCore().getMessageManager().getMessageModel(),
                'view-message'
            );
        };

        CustomController.prototype.getApp = function () {
            return this._oApp;
        };

        // Click the links under the Notification section in the footer
        CustomController.prototype._onFooterNotificationLinkPress = function (oControlEvent) {
            console.log(oControlEvent.getSource());
        };

        CustomController.prototype._onQuickLinkClick = function (oControlEvent) {
            this._oApp.setHeaderMenuItemSelected(false, App.HMItemId.Menu);

            switch (oControlEvent.getSource().getId()) {
              case App.QuickLinkId.Dashboard:
                  this._onQLDashboardClick(oControlEvent);
                  break;
              case App.QuickLinkId.Campaign:
                  this._onQLCampaignClick(oControlEvent);
                  break;
              case App.QuickLinkId.BusinessPartner:
                  this._onQLBusinessPartnerClick(oControlEvent);
                  break;
            }
        };

        CustomController.prototype._onQLBusinessPartnerClick = function (oControlEvent) {
            var oContext, oRouter;

            oContext = this.getOwnerComponent().getCcuxContextManager().getContext().getData();
            oRouter = this.getOwnerComponent().getRouter();

            if (oContext.bpNum) {
                oRouter.navTo('dashboard.BpInfo', {
                    bpNum: oContext.pNum
                });
            }
        };

        CustomController.prototype._onQLDashboardClick = function (oControlEvent) {
            var oContext, oRouter;

            oContext = this.getOwnerComponent().getCcuxContextManager().getContext().getData();
            oRouter = this.getOwnerComponent().getRouter();

            if (oContext.bpNum) {
                oRouter.navTo('dashboard.Bp', {
                    bpNum: oContext.bpNum
                });
            }
        };

        CustomController.prototype._onQLCampaignClick = function (oControlEvent) {
            var oContext, oRouter;

            oContext = this.getOwnerComponent().getCcuxContextManager().getContext().getData();
            oRouter = this.getOwnerComponent().getRouter();

            if (oContext.coNum) {
                oRouter.navTo('campaign', {
                    bpNum: oContext.bpNum,
                    caNum: oContext.caNum,
                    coNum: oContext.coNum,
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
            if (!this.getView().getModel('view-index')) {
                this._initIndexConfigModel();
            }

            this._oApp._getHeader().setSelected(
                oControlEvent.getSource().getSelected(),
                AppHeader.HMItemId.Index
            );
        };

        CustomController.prototype._onTransactionPress = function (oControlEvent) {
            var oWebUiManager = this.getOwnerComponent().getCcuxWebUiManager();

            this._oApp._getHeader().setSelected(
                oControlEvent.getSource().getSelected(),
                AppHeader.HMItemId.Transaction
            );

            this._oApp.setOccupied(true);
            if (oWebUiManager.isAvailable()) {
                oWebUiManager.notifyWebUi('launchTransaction', {}, this._onTransactionPressCallback, this);
            } else {
                this._onTransactionPressCallback();
            }
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
            if (oWebUiManager.isAvailable()) {
                oWebUiManager.notifyWebUi('openEsidTool', {}, this._onEsidToolPressCallback, this);
            } else {
                this._onEsidToolPressCallback();
            }
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
            if (oWebUiManager.isAvailable()) {
                oWebUiManager.notifyWebUi('openPalPlus', {}, this._onPalPlusPressCallback, this);
            } else {
                this._onPalPlusPressCallback();
            }
        };

        CustomController.prototype._onPalPlusPressCallback = function (oEvent) {
            this._oApp.setOccupied(false);
        };

        CustomController.prototype._onRefreshPress = function (oControlEvent) {
            var oWebUiManager, oRouter, oRouteManager, oCurrRouteInfo, fnConfirmCallback, oAppRbModel;

            oWebUiManager = this.getOwnerComponent().getCcuxWebUiManager();
            oRouteManager = this.getOwnerComponent().getCcuxRouteManager();
            oRouter = this.getOwnerComponent().getRouter();

            this._oApp._getHeader().setSelected(
                oControlEvent.getSource().getSelected(),
                AppHeader.HMItemId.Refresh
            );

            if (this._oApp.isInEdit()) {
                fnConfirmCallback = function (sAction) {
                    if (sAction === ute.ui.main.Popup.Action.Yes) {
                        this._oApp.setInEdit(false);

                        if (oWebUiManager.isAvailable()) {
                            oWebUiManager.notifyWebUi('refresh');
                        }

                        oCurrRouteInfo = oRouteManager.getCurrentRouteInfo();
                        oRouter.navTo('app.refresh');
                        oRouter.navTo(oCurrRouteInfo.name, oCurrRouteInfo.parameters);

                    } else {
                        this._oApp._getHeader().setSelected(false, AppHeader.HMItemId.Refresh);
                    }
                }.bind(this);

                oAppRbModel = this.getOwnerComponent().getModel('comp-i18n-app');

                ute.ui.main.Popup.Confirm({
                    title: oAppRbModel.getProperty('nrgAppRefreshDataLossTitle'),
                    message: oAppRbModel.getProperty('nrgAppRefreshDataLossMsg'),
                    callback: fnConfirmCallback
                });

            } else {
                if (oWebUiManager.isAvailable()) {
                    oWebUiManager.notifyWebUi('refresh');
                }

                oCurrRouteInfo = oRouteManager.getCurrentRouteInfo();
                oRouter.navTo('app.refresh');
                oRouter.navTo(oCurrRouteInfo.name, oCurrRouteInfo.parameters);
            }
        };

        CustomController.prototype._onClearAccPress = function (oControlEvent) {
            var oWebUiManager = this.getOwnerComponent().getCcuxWebUiManager();

            this._oApp._getHeader().setSelected(
                oControlEvent.getSource().getSelected(),
                AppHeader.HMItemId.ClearAcc
            );

            this._oApp.setOccupied(true);

            if (oWebUiManager.isAvailable()) {
                oWebUiManager.notifyWebUi('clearAccount', {}, this._onClearAccPressCallback, this);
            } else {
                this._onClearAccPressCallback();
            }
        };

        CustomController.prototype._onClearAccPressCallback = function (oEvent) {
            var oContext, oRouter;

            this._oApp.setOccupied(false);
            oContext = this.getOwnerComponent().getCcuxContextManager().resetContext();
            oRouter = this.getOwnerComponent().getRouter();

            oRouter.navTo('app.refresh');
            oRouter.navTo('search.SearchNoID');
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

        CustomController.prototype._initIndexConfigModel = function () {
            var oWebUiManager, sId;

            oWebUiManager = this.getOwnerComponent().getCcuxWebUiManager();

            if (!oWebUiManager.isAvailable()) {
                return this;
            }

            this._oApp.setOccupied(true);
            sId = oWebUiManager.notifyWebUi('getIndexConfig', {}, this._onInitIndexConfigModelCallback, this);
        };

        CustomController.prototype._onInitIndexConfigModelCallback = function (oEvent) {
            var oResponse = oEvent.getParameters();

            this.getView().setModel(new JSONModel(oResponse), 'view-index');
            this._oApp.setOccupied(false);
        };

        CustomController.prototype._onIndexLinkPress = function (oControlEvent) {
            var oWebUiManager = this.getOwnerComponent().getCcuxWebUiManager();

            this._oApp.setHeaderMenuItemSelected(false, App.HMItemId.Index);

            oWebUiManager.notifyWebUi('openIndex', {
                LINK_ID: oControlEvent.getSource().getRefId()
            });
        };

        return CustomController;
    }
);
