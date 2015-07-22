/*global sap, ute, jQuery*/
/*jslint nomen:true*/
sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Controller) {
        'use strict';

        var QuickPayController = Controller.extend('nrg.module.quickpay.view.QuickPayController', {
            metadata: { },
            renderer: function (rm, ctrl) {
            }
        });

        QuickPayController.prototype.openQuickPay = function () {
            var oQuickPayView = sap.ui.view({
                type: sap.ui.core.mvc.ViewType.XML,
                viewName: "nrg.module.quickpay.view.MainQuick"
            });
            if (!this._oPaymentDialog) {
                this._oPaymentDialog = new ute.ui.main.Popup.create({
                    close: this._handleDialogClosed,
                    content: oQuickPayView
                });
            }
            this._oPaymentDialog.addStyleClass("nrgQPPay-dialogPale");
            this._oPaymentDialog.open();
        };


        return QuickPayController;
    },

    true
);
