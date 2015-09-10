/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel'
    ],

    function (jQuery, Controller, JSONModel) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.billing.view.CustomerDataPrePD');

        CustomController.prototype.onInit = function () {
            var oModel;

            oModel = new JSONModel({
                selectedKey: 'key003',
                dropdown: [
                    { key: 'key001', value: 'value001' },
                    { key: 'key002', value: 'value002' },
                    { key: 'key003', value: 'Checkbook' },
                    { key: 'key004', value: 'value004' },
                    { key: 'key005', value: 'value005' }
                ]
            });

            this.getView().setModel(oModel, 'data');
        };

        CustomController.prototype.onBeforeRendering = function () {

        };

        CustomController.prototype.onAfterRendering = function () {

        };

        CustomController.prototype.onExit = function () {

        };

        CustomController.prototype.onPayNow = function() {
            var oRouter = this.getOwnerComponent().getRouter();
            var oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo();

            this._bpNum = oRouteInfo.parameters.bpNum;
            this._caNum = oRouteInfo.parameters.caNum;
            this._coNum = oRouteInfo.parameters.coNum;

            oRouter.navTo('quickpay', {bpNum: this._bpNum, caNum: this._caNum, coNum: this._coNum});
        };

        return CustomController;
    }
);
