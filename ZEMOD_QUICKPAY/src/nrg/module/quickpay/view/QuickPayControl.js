/*global sap, ute, jQuery*/
/*jslint nomen:true*/
sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Control) {
        'use strict';

        var QuickPayControl = Control.extend('nrg.module.quickpay.view.QuickPayControl', {
            metadata: { },
            renderer: function (rm, ctrl) {
            }
        });

        QuickPayControl.prototype.openQuickPay = function () {
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
        return QuickPayControl;
    },

    true
);
