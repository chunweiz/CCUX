/*globals sap, ute*/
/*jslint nomen:true*/
sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'jquery.sap.global',
        "sap/ui/model/json/JSONModel"
    ],

    function (CoreController, Filter, FilterOperator, jQuery, JSONModel) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.billing.view.FeeAdjustments');
        /* =========================================================== */
		/* lifecycle method- Before Rendering                          */
		/* =========================================================== */
        Controller.prototype.onBeforeRendering = function () {
            var oViewModel = new JSONModel({
                    discNoticefee : false,  // true for invoice & false for consumption
                    discRecovfee : true,  // true for first Card change, false for second card change for Invoice
                    Latefee : true, // true for first Card change, false for second card change for Consumption
                    Reconnectfee : true,
                    feeDateDD : true,
                    reasonDD: false,
                    ok: false
			    }),
                oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo();
            this._sContract = oRouteInfo.parameters.coNum;
            this._sBP = oRouteInfo.parameters.bpNum;
            this._sCA = oRouteInfo.parameters.caNum;
            this.getView().setModel(oViewModel, "comp-feeAdj");
        };
        /**
		 * Clicked on Disconnect Notice Fee
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onDiscNoticeFee = function (oEvent) {
        };
        /**
		 * Clicked on Disconnect Recovery Fee
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onDiscRecovFee = function (oEvent) {
        };
        /**
		 * Clicked on Late Fee
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onLateFee = function (oEvent) {
        };
        /**
		 * Clicked on Reconnect Fee
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onReconnectFee = function (oEvent) {
        };
        return Controller;
    }

);
