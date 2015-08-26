/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'nrg/module/nnp/view/NNPPopup'
    ],

    function (CoreController, NNPPopup) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.nnp.view.General');


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
            var NNPPopupControl = new NNPPopup();
            NNPPopupControl.openNNP(this);
        };
        return Controller;
    }


);
