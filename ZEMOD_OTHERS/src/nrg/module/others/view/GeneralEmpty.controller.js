/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'nrg/base/component/WebUiManager'
    ],

    function (Controller, WebUiManager) {
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
            oWebUiManager.notifyWebUi('logout');
        };

        CustomController.prototype.onInit = function () {

        };

        return CustomController;
    }
);
