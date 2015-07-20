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
            if (!this._oDialogFragment) {
                this._oDialogFragment = sap.ui.xmlfragment("PaymentMethods", "nrg.module.quickpay.view.PaymentMethods", this);
            }
            this._oPaymentDialog = new ute.ui.main.Popup.create({
/*                title: 'Select Payment Method',*/
                close: this._handleDialogClosed,
                content: this._oDialogFragment
            });
            this._oPaymentDialog.addStyleClass("nrgQPPay-dialog");
            this._oPaymentDialog.open();
        };
        /**
		 * Start Quick Pay process
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onQuickPay = function (oEvent) {
            this._oPaymentDialog.open();
        };
        return Controller;
    }


);
