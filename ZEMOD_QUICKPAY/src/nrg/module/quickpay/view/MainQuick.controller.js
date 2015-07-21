/*globals sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController'
    ],

    function (CoreController) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.quickpay.view.MainQuick');


		/* =========================================================== */
		/* lifecycle method- Init                                     */
		/* =========================================================== */
        Controller.prototype.onInit = function () {

        };
        /**
		 * Start Quick Pay process
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onQuickPay = function (oEvent) {
            var oBtnsTag, oStopRecTag;

            if (!this._oDialogFragment) {
                this._oDialogFragment = sap.ui.xmlfragment("PaymentMethods", "nrg.module.quickpay.view.PaymentMethods", this);
            }
            oBtnsTag = sap.ui.core.Fragment.byId("PaymentMethods", "idnrgQPPay-btns");
            oStopRecTag = sap.ui.core.Fragment.byId("PaymentMethods", "idnrgQPPay-StopRec");
            oStopRecTag.addStyleClass("nrgQPPay-hide");
            oBtnsTag.removeStyleClass("nrgQPPay-hide");
            if (!this._oPaymentDialog) {
                this._oPaymentDialog = new ute.ui.main.Popup.create({
                    close: this._handleDialogClosed,
                    content: this._oDialogFragment
                });
            }
            this._oPaymentDialog.addStyleClass("nrgQPPay-dialog");
            this.getView().addDependent(this._oPaymentDialog);
            this._oPaymentDialog.open();
        };
        /**
		 * Show Stop Voice Log Recording msg
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onCreditCard = function (oEvent) {
            var oBtnsTag = this.getView().byId("idnrgQPPay-btns"),
                oStopRecTag = this.getView().byId("idnrgQPPay-StopRec");
            oBtnsTag.addStyleClass("nrgQPPay-hide");
            oStopRecTag.removeStyleClass("nrgQPPay-hide");
        };
        /**
		 * Credit Card Process initialization
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onStopRec = function (oEvent) {
            if (!this._oPaymentDialog) {
                this._oPaymentDialog = new ute.ui.main.Popup.create({
                    close: this._handleCreditCardClosed,
                    content: this._oDialogFragment
                });
            }
            this._oPaymentDialog.open();
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
        return Controller;
    }


);
