/*globals sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'nrg/module/quickpay/view/QuickPayControl'
    ],

    function (CoreController, QuickPayControl) {
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
            var QuickControl = new QuickPayControl();
            this.getView().addDependent(QuickControl);
            QuickControl.openQuickPay();
        };

        return Controller;
    }


);
