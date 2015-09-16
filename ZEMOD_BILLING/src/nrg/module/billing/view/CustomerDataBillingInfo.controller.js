/*globals sap*/
/*global ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel'
    ],

    function (jQuery, Controller, JSONModel) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.billing.view.CustomerDataBillingInfo');

        CustomController.prototype.onInit = function () {
            var oModel;

            oModel = new JSONModel({
                selectedKey: 'ilink_1',
                aLinks: [
                    { key: 'ilink_1', value: 'Checkbook' },
                    { key: 'ilink_2', value: 'High Bill' }
                ]
            });

            this.getView().setModel(oModel, 'oLinkDropdown');      //Model for the dropdown links
        };

        CustomController.prototype.onBeforeRendering = function () {


        };

        CustomController.prototype.onAfterRendering = function () {
            //this.getOwnerComponent().getCcuxApp().setLayout('FullWidthTool');
        };

        CustomController.prototype.onExit = function () {

        };

        /*************************************************************************************************************************/
        //Handlers
        /*************************************************************************************************************************/
        CustomController.prototype._onInvoiceAmntClicked = function (oEvent) {
            var i18nModel =  this.getOwnerComponent().getModel('comp-i18n-billing'),
                popupTitle = i18nModel.getProperty("nrgBilling-paymentsPopup-ACCOUNT_SUMMARY");

            if (!this._oInvoicePopup) {
                this._oInvoicePopup = sap.ui.xmlfragment("PaymentPopup", "nrg.module.billing.view.InvoicePopup", this);
                this._oInvoicePopup = ute.ui.main.Popup.create({
                    content: this._oInvoicePopup,
                    title: popupTitle
                });

                this._oInvoicePopup.setShowCloseButton(true);
                this.getView().addDependent(this._oInvoicePopup);
            }

            this._oInvoicePopup.open();
        };

        CustomController.prototype._onPaymentsClicked = function (oEvent) {
            var i18nModel =  this.getOwnerComponent().getModel('comp-i18n-billing'),
                popupTitle = i18nModel.getProperty("nrgBilling-paymentsPopup-PAYMENTS");

            if (!this._oPaymentPopup) {
                this._oPaymentPopup = sap.ui.xmlfragment("PaymentPopup", "nrg.module.billing.view.PaymentsPopup", this);
                this._oPaymentsPopup = ute.ui.main.Popup.create({
                    content: this._oPaymentPopup,
                    title: popupTitle
                });

                this._oPaymentsPopup.setShowCloseButton(true);
                this.getView().addDependent(this._oPaymentsPopup);
            }

            this._oPaymentsPopup.open();
        };

        CustomController.prototype.onPayNow = function (oEvent) {
            var oRouter = this.getOwnerComponent().getRouter(),
                oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo();

            this._bpNum = oRouteInfo.parameters.bpNum;
            this._caNum = oRouteInfo.parameters.caNum;
            this._coNum = oRouteInfo.parameters.coNum;

            oRouter.navTo('quickpay', {bpNum: this._bpNum, caNum: this._caNum, coNum: this._coNum});
        };

        CustomController.prototype._onChkbookLnkClicked = function () {
            var oRouter = this.getOwnerComponent().getRouter(),
                oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo();

            this._bpNum = oRouteInfo.parameters.bpNum;
            this._caNum = oRouteInfo.parameters.caNum;
            this._coNum = oRouteInfo.parameters.coNum;

            oRouter.navTo('billing.CheckBook', {bpNum: this._bpNum, caNum: this._caNum, coNum: this._coNum});
        };

        CustomController.prototype._onHighbillLnkClicked = function () {
            var oRouter = this.getOwnerComponent().getRouter(),
                oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo();

            this._bpNum = oRouteInfo.parameters.bpNum;
            this._caNum = oRouteInfo.parameters.caNum;
            this._coNum = oRouteInfo.parameters.coNum;

            oRouter.navTo('billing.HighBill', {bpNum: this._bpNum, caNum: this._caNum, coNum: this._coNum});
        };
        /*************************************************************************************************************************/




        return CustomController;
    }
);
