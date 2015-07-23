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
		 * Show Stop Voice Log Recording msg
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onCreditCard = function (oEvent) {
            var oTabBarItem2 = this.getView().byId("idnrgQPPay-tabBarItem002");
            oTabBarItem2.setSelected(true);

        };
        /**
		 * Credit Card Process initialization
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onStopRec = function (oEvent) {
            var oTabBarItem3 = this.getView().byId("idnrgQPPay-tabBarItem003");
            this.getView().getParent().removeStyleClass("nrgQPPay-dialogPale");
            this.getView().getParent().addStyleClass("nrgQPPay-dialogRegular");
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
        return Controller;
    }


);
