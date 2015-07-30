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

        };

        CustomController.prototype._onCampaignClick = function (oControlEvent) {

        };

        return CustomController;
    }
);
