/*global sap, ute, jQuery*/
/*jslint nomen:true*/
sap.ui.define(
    [
        'sap/ui/core/Control',
        'sap/ui/core/Popup'
    ],

    function (Control, Popup) {
        'use strict';

        var QuickPayControl = Control.extend('nrg.module.quickpay.view.QuickPayControl', {
            metadata: { },
            renderer: function (rm, ctrl) {
            }
        });

        QuickPayControl.prototype.init = function () {
            this._oPaymentPopup = new Popup();
            this._oPaymentPopup.setShadow(false);
            this._oPaymentPopup.setModal(true);
            this._oPaymentPopup.setAutoClose(false);
            this._oPaymentPopup.setDurations(0, 0);
        };


        QuickPayControl.prototype.openQuickPay = function (that) {
            var oQuickPayView = sap.ui.view({
                type: sap.ui.core.mvc.ViewType.XML,
                viewName: "nrg.module.quickpay.view.MainQuick"
            });
            that.getView().addDependent(oQuickPayView);
            oQuickPayView.addStyleClass("nrgQPPay-View");
            this._oPaymentPopup.setInitialFocusId(this.getId());
            if (this._oPaymentPopup.isOpen()) {
                this._oPaymentPopup.setContent(oQuickPayView);
                return this;
            }
            this._oPaymentPopup.setContent(oQuickPayView);
            this._oPaymentPopup.open();

            return this;
        };


        QuickPayControl.prototype.close = function () {
            var sOpenState = this._oPaymentPopup.getOpenState();

            if (!(sOpenState === sap.ui.core.OpenState.CLOSED || sOpenState === sap.ui.core.OpenState.CLOSING)) {
                this._oPaymentPopup.close();
            }

            return this;
        };
        return QuickPayControl;
    },

    true
);
