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

        QuickPayController.prototype.openQuickPay = function (oParentView) {
/*            var oQuickPayView = sap.ui.view({
                type: sap.ui.core.mvc.ViewType.XML,
                viewName: "nrg.module.quickpay.view.MainQuick"
            });*/
            this._oParentView = oParentView;
            if (!this._oDialogFragment) {
                this._oDialogFragment = sap.ui.xmlfragment("QuickPayFragment", "nrg.module.quickpay.view.MainQuickPay", this);
            }
            if (!this._oPaymentDialog) {
                this._oPaymentDialog = new ute.ui.main.Popup.create({
                    close: this._handleDialogClosed,
                    content: this._oDialogFragment
                });
            }
            this._oPaymentDialog.addStyleClass("nrgQPPay-dialogPale");
            oParentView.addDependent(this._oPaymentDialog);
            this._oPaymentDialog.open();
        };
        /**
		 * Show Stop Voice Log Recording msg
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onCreditCard = function (oEvent) {
            var oTabBarItem2 = sap.ui.core.Fragment.byId("QuickPayFragment", "idnrgQPPay-tabBarItem002");
            oTabBarItem2.setSelected(true);

        };
        /**
		 * Credit Card Process initialization
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onStopRec = function (oEvent) {
            var oTabBarItem3 = sap.ui.core.Fragment.byId("QuickPayFragment", "idnrgQPPay-tabBarItem003");
            this._oPaymentDialog.removeStyleClass("nrgQPPay-dialogPale");
            this._oPaymentDialog.addStyleClass("nrgQPPay-dialogRegular");
            oTabBarItem3.setSelected(true);
        };
        /**
		 * Bank Draft Process initialization
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onBankDraft = function (oEvent) {
            this._oPaymentDialog.open();
        };
        /**
		 * Receipt Process initialization
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onReceipt = function (oEvent) {
            this._oPaymentDialog.open();
        };
        /**
		 * Reliant Card Process initialization
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onReliantCard = function (oEvent) {
            this._oPaymentDialog.open();
        };
        /**
		 * Pending Credit Card Process initialization
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onPendingCreditCard = function (oEvent) {
            this._oPaymentDialog.open();
        };
        /**
		 * Pending Bank Draft Process initialization
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onPendingBankDraft = function (oEvent) {
            this._oPaymentDialog.open();
        };

        return QuickPayController;
    },

    true
);
