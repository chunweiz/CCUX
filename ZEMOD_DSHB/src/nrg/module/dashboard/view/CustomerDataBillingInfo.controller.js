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

        var CustomController = Controller.extend('nrg.module.dashboard.view.CustomerDataBillingInfo');

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

        CustomController.prototype._onInvoiceAmntClicked = function (oEvent) {
            alert("Hi, invoice!");
        };

        CustomController.prototype._onPaymentsClicked = function (oEvent) {
            if (!this._oPaymentPopup) {
                this._oPaymentPopup = sap.ui.xmlfragment("PaymentPopup", "nrg.module.dashboard.view.PaymentsPopup", this);
            }

            this._oPaymentsPopup = ute.ui.main.Popup.create({
                content: this._oPaymentPopup,
                title: 'Payments'
            });

            this._oPaymentsPopup.setShowCloseButton(true);
            this.getView().addDependent(this._oPaymentsPopup);
            this._oPaymentsPopup.open();
        };

        return CustomController;
    }
);
