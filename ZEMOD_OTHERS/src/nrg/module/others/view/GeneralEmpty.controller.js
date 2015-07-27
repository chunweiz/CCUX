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

            oComponent.getApp().setOccupied(true);
            oWebUiManager.notifyWebUi('bpConfirmed', {
                bpNum: '0002955761'
            }, this._handleBpConfirmed, this);
        };

        CustomController.prototype._handleBpConfirmed = function (oEvent) {
            var oComponent, oRouter, oRouteInfo;

            oComponent = this.getOwnerComponent();
            oComponent.getApp().setOccupied(false);

            oRouteInfo = oEvent.getParameters();
            if (oRouteInfo.CONFIRMED && oRouteInfo.CONFIRMED === 'X') {
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

            oComponent.getApp().setOccupied(true);
            oWebUiManager.notifyWebUi('logout', {}, this._handleLogout, this);
        };

        CustomController.prototype._handleLogout = function (oEvent) {
            var oComponent, oResponse;

            oComponent = this.getOwnerComponent();
            oComponent.getApp().setOccupied(false);

            oResponse = oEvent.getParameters();
            if (oResponse.CANCEL && oResponse.CANCEL === 'X') {
                jQuery.sap.log.info('[GeneralEmptyController._handleLogout()]', 'Logout cancelled by user');
            }
        };

        CustomController.prototype.onInit = function () {

        };

        return CustomController;
    }
);
