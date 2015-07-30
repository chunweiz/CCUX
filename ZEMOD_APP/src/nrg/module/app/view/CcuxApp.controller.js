/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'nrg/module/app/view/App'
    ],

    function (Controller, App) {
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

            if (oContext.dashboard) {
                if (oContext.dashboard.bpNum && oContext.dashboard.caNum) {
                    oRouter.navTo('dashboard.CaInfo', {
                        bpNum: oContext.dashboard.bpNum,
                        caNum: oContext.dashboard.caNum
                    });

                } else if (oContext.dashboard.bpNum) {
                    oRouter.navTo('dashboard.BpInfo', {
                        bpNum: oContext.dashboard.bpNum
                    });
                }
            }
        };

        CustomController.prototype._onCampaignClick = function (oControlEvent) {
            var oContext, oRouter;

            oContext = this.getOwnerComponent().getCcuxContextManager().getContext().getData();
            oRouter = this.getOwnerComponent().getRouter();

            if (oContext.dashboard && oContext.dashboard.coNum) {
                oRouter.navTo('campaign', {
                    coNum: oContext.dashboard.coNum,
                    type: 'C' //TODO: hardcoded to current for the time being, need to revise
                });
            }
        };

        return CustomController;
    }
);
