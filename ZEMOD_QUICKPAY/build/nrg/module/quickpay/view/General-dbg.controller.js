/*globals sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController'
    ],

    function (CoreController) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.quickpay.view.General');


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
            this._oPaymentDialog.addStyleClass("nrgQPPay-dialog");
            this.getView().addDependent(this._oPaymentDialog);
            this._oPaymentDialog.open();
        };

        return Controller;
    }


);
