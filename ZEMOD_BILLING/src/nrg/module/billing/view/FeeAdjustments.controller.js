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
                    discNoticefee : false,  // Disc Notice Fee is pre-selected
                    discRecovfee : true,
                    Latefee : true,
                    Reconnectfee : true,
                    feeDateDD : true,
                    reasonDD: false,
                    ok: false
			    }),
                oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo(),
                oCADropDown = this.getView().byId("idnrgFeeAdj-DropDownCA"),
                oCATemplate = this.getView().byId("idnrgFeeAdj-DropDownCA-temp"),
                oDisconnectDropDown = this.getView().byId("idnrgFeeAdj-DropDownDate"),
                oDisconnectTemplate = this.getView().byId("idnrgFeeAdj-DropDownDate-temp"),
                aFilterIds,
                aFilterValues,
                aFilters,
                sPath,
                oBindingInfo,
                fnRecievedHandler,
                that = this;
            this._sContract = oRouteInfo.parameters.coNum;
            this._sBP = oRouteInfo.parameters.bpNum;
            this._sCA = oRouteInfo.parameters.caNum;
            this.getView().setModel(oViewModel, "view-feeAdj");
            aFilterIds = ["BP"];
            aFilterValues = ['2473499'];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            sPath = "/ContractAcctS";
            fnRecievedHandler = function (oEvent, oData) {
                var aContent = oCADropDown.getContent();
                if ((aContent) && (aContent.length > 0)) {
                    oCADropDown.setSelectedKey(aContent[0].getKey());
                    aFilterIds = ["CA"];
                    aFilterValues = ['000004014634'];
                    aFilters = that._createSearchFilterObject(aFilterIds, aFilterValues);
                    sPath = "/DiscNoticeFeeS";
                    oBindingInfo = {
                        model : "comp-feeAdjs",
                        path : sPath,
                        template : oDisconnectTemplate,
                        filters : aFilters
                    };
                    oDisconnectDropDown.bindAggregation("content", oBindingInfo);
                }
            };
            oBindingInfo = {
                model : "comp-feeAdjs",
                path : sPath,
                template : oCATemplate,
                filters : aFilters,
                events: {dataReceived : fnRecievedHandler}
            };
            oCADropDown.bindAggregation("content", oBindingInfo);
        };
       /**
		 * Assign the filter objects based on the input selection
		 *
		 * @function
		 * @param {Array} aFilterIds to be used as sPath for Filters
         * @param {Array} aFilterValues for each sPath
		 * @private
		 */
        Controller.prototype._createSearchFilterObject = function (aFilterIds, aFilterValues) {
            var aFilters = [],
                iCount;

            for (iCount = 0; iCount < aFilterIds.length; iCount = iCount + 1) {
                aFilters.push(new Filter(aFilterIds[iCount], FilterOperator.EQ, aFilterValues[iCount], ""));
            }
            return aFilters;
        };
        /**
		 * Clicked on Submit
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onSubmit = function (oEvent) {
            var oModel = this.getOwnerComponent().getModel('comp-feeAdjs'),
                mParameters = {
                    method : "POST",
                    urlParameters : {"Amount" : "",
                                             "CA" : "",
                                            "DocNum" : "",
                                            "Reason" : "",
                                            "Text" : ""},
                    success : function (oData) {
                    }.bind(this),
                    error: function (oError) {

                    }.bind(this)
                };
            oModel.callFunction("/RemoveFee", mParameters); // callback function for error
        };
        /**
		 * Clicked on Disconnect Notice Fee
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onDiscNoticeFee = function (oEvent) {
            var oViewModel = this.getView().getModel("view-feeAdj");
            oViewModel.setProperty("/discNoticefee", false);
            oViewModel.setProperty("/discRecovfee", true);
            oViewModel.setProperty("/Latefee", true);
            oViewModel.setProperty("/Reconnectfee", true);
        };
        /**
		 * Clicked on Disconnect Recovery Fee
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onDiscRecovFee = function (oEvent) {
            var oViewModel = this.getView().getModel("view-feeAdj");
            oViewModel.setProperty("/discNoticefee", true);
            oViewModel.setProperty("/discRecovfee", false);
            oViewModel.setProperty("/Latefee", true);
            oViewModel.setProperty("/Reconnectfee", true);
        };
        /**
		 * Clicked on Late Fee
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onLateFee = function (oEvent) {
            var oViewModel = this.getView().getModel("view-feeAdj");
            oViewModel.setProperty("/discNoticefee", true);
            oViewModel.setProperty("/discRecovfee", true);
            oViewModel.setProperty("/Latefee", false);
            oViewModel.setProperty("/Reconnectfee", true);
        };
        /**
		 * Clicked on Reconnect Fee
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onReconnectFee = function (oEvent) {
            var oViewModel = this.getView().getModel("view-feeAdj");
            oViewModel.setProperty("/discNoticefee", true);
            oViewModel.setProperty("/discRecovfee", true);
            oViewModel.setProperty("/Latefee", true);
            oViewModel.setProperty("/Reconnectfee", false);
        };
        return Controller;
    }

);
