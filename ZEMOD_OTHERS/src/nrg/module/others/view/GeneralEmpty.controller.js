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

        CustomController.prototype.onPressed = function (oControlEvent) {
            var oWebUiManager = this.getOwnerComponent().getWebUiManager();

            oWebUiManager.notifyWebUi('bpConfirmed', {
                bpNum: '0002955761'
            }, this._handleBpConfirmed, this);
        };

        CustomController.prototype._handleBpConfirmed = function (oEvent) {
            var oRouter, oRouteInfo;

            oRouteInfo = oEvent.getParameters();
            oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo('dashboard.Bp', {
                bpNum: oRouteInfo.bpNum
            });
        };

        return CustomController;
    }
);
