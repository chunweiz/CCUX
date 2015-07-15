/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/mvc/Controller',
        'nrg/base/component/WebUiManager'
    ],

    function (jQuery, Controller, WebUiManager) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.others.view.GeneralEmpty');

        CustomController.prototype.onConfirm = function (oControlEvent) {
            var oWebUiManager, oComponent;

            oComponent = this.getOwnerComponent();
            oWebUiManager = oComponent.getCcuxWebUiManager();

            oComponent.setCcuxBusy(true);
            oWebUiManager.notifyWebUi('bpConfirmed', {
                bpNum: '0002955761'
            }, this._handleBpConfirmed, this);
        };

        CustomController.prototype._handleBpConfirmed = function (oEvent) {
            var oComponent, oRouter, oRouteInfo;

            oComponent = this.getOwnerComponent();
            oComponent.setCcuxBusy(false);

            oRouteInfo = oEvent.getParameters();
            if (oRouteInfo.confirmed && oRouteInfo.confirmed === 'X') {
                oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo('dashboard.Bp', {
                    bpNum: oRouteInfo.bpNum
                });
            }
        };

        CustomController.prototype.onLogout = function (oControlEvent) {
            var oWebUiManager, oComponent;

            oComponent = this.getOwnerComponent();
            oWebUiManager = oComponent.getCcuxWebUiManager();

            oComponent.setCcuxBusy(true);
            oWebUiManager.notifyWebUi('logout', {}, this._handleLogout, this);
        };

        CustomController.prototype._handleLogout = function (oEvent) {
            var oComponent, oResponse;

            oComponent = this.getOwnerComponent();
            oComponent.setCcuxBusy(false);

            oResponse = oEvent.getParameters();
            if (oResponse.cancel && oResponse.cancel === 'X') {
                jQuery.sap.log.info('[GeneralEmptyController._handleLogout()]', 'Logout cancelled by user');
            }
        };

        CustomController.prototype.onInit = function () {

        };

        return CustomController;
    }
);
