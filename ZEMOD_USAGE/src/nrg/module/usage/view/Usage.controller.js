/*globals sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'jquery.sap.global',
        'sap/ui/model/json/JSONModel'
    ],

    function (CoreController, Filter, FilterOperator, jQuery, JSONModel) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.usage.view.Usage');


		/* =========================================================== */
		/* lifecycle method- Init                                     */
		/* =========================================================== */
        Controller.prototype.onInit = function () {

        };
        /* =========================================================== */
		/* lifecycle method- Before Rendering                          */
		/* =========================================================== */
        Controller.prototype.onBeforeRendering = function () {
            var oBindingInfo,
                oServiceAddressDropDown = this.getView().byId("idnrgUsgServiceAdd-DropDown"),
                oServiceAddressTemplate = this.getView().byId("idnrgUsgServiceAdd-DropDownItem"),
                sPath,
                aFilterIds,
                aFilterValues,
                aFilters,
                fnRecievedHandler,
                oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo();
            this._sContract = oRouteInfo.parameters.coNum;
            this._sBP = oRouteInfo.parameters.bpNum;
            this._sCA = oRouteInfo.parameters.caNum;
            aFilterIds = ["Contract", "CA"];
            aFilterValues = [this._sContract, this._sCA];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            // Handler function for Tab Bar Item.
            fnRecievedHandler = function (oEvent) {
            };
            sPath = "/SrvAddrS";
            oBindingInfo = {
                model : "comp-usage",
                path : sPath,
                template : oServiceAddressTemplate,
                filters : aFilters,
                events: {dataReceived : fnRecievedHandler}
            };
            oServiceAddressDropDown.bindAggregation("content", oBindingInfo);
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
        /* =========================================================== */
		/* lifecycle method- Before Rendering                          */
		/* =========================================================== */
        Controller.prototype.expandInfoline = function (oEvent) {
            var oCurrentInfoLine = oEvent.getSource().getParent();
            oCurrentInfoLine.setExpanded(!(oCurrentInfoLine.getExpanded()));
        };

        return Controller;
    }


);
