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

        };

        CustomController.prototype.onBeforeRendering = function () {
            this._initRouting();
        };

        CustomController.prototype.onAfterRendering = function () {

        };

        CustomController.prototype.onExit = function () {

        };

        CustomController.prototype.onPayNow = function () {
            var oRouter = this.getOwnerComponent().getRouter();

            /*this._bpNum = oRouteInfo.parameters.bpNum;
            this._caNum = oRouteInfo.parameters.caNum;
            this._coNum = oRouteInfo.parameters.coNum;*/

            oRouter.navTo('quickpay', {bpNum: this._bpNum, caNum: this._caNum, coNum: this._coNum});
        };
        /*************************************************************************************************************************/
        //Init Functions
        /*************************************************************************************************************************/
        CustomController.prototype._initRouting = function () {
            var oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo();

            this._bpNum = oRouteInfo.parameters.bpNum;
            this._caNum = oRouteInfo.parameters.caNum;
            this._coNum = oRouteInfo.parameters.coNum;
            return;
        };
        /*************************************************************************************************************************/



        /*************************************************************************************************************************/
        //Handlers
        /*************************************************************************************************************************/
        CustomController.prototype._onChkbookLnkClicked = function () {
            var oRouter = this.getOwnerComponent().getRouter();

            if (this._coNum) {
                oRouter.navTo('billing.PrePayCheckBook', {bpNum: this._bpNum, caNum: this._caNum, coNum: this._coNum});
            } else {
                oRouter.navTo('billing.PrePayCheckBookNoCo', {bpNum: this._bpNum, caNum: this._caNum});
            }
        };

        CustomController.prototype._onHighbillLnkClicked = function () {

        };

        /*************************************************************************************************************************/
        return CustomController;
    }
);
