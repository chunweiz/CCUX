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

    function (CoreController, Filter, FilterOperator, Jquery, JSONModel) {
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
                oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo(),
                that = this,
                oUsageTable = this.getView().byId("idnrgUsgTable-Rows"),
                oUsageTableRowTemplate = this.getView().byId("idnrgUsgRow-Infoline");
            this._sContract = oRouteInfo.parameters.coNum;
            this._sBP = oRouteInfo.parameters.bpNum;
            this._sCA = oRouteInfo.parameters.caNum;
            aFilterIds = ["Contract", "CA"];
            aFilterValues = [this._sContract, this._sCA];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            fnRecievedHandler = function (oEvent, oData) {
                var aContent = oServiceAddressDropDown.getContent(),
                    oBindingContext,
                    sContentPath,
                    aFilterIds,
                    aFilterValues,
                    aFilters,
                    sPath = "/UsageS";
                if ((aContent) && (aContent.length > 0)) {
                    oServiceAddressDropDown.setSelectedKey(aContent[0].getKey());
                    oBindingContext = aContent[0].getBindingContext("comp-usage");
                }
                if (oBindingContext) {
                    aFilterIds = ["Contract"];
                    aFilterValues = [oBindingContext.getProperty("Contract")];
                    aFilters = that._createSearchFilterObject(aFilterIds, aFilterValues);
                    oBindingInfo = {
                        model : "comp-usage",
                        path : sPath,
                        template : oUsageTableRowTemplate,
                        filters : aFilters
                    };
                    oUsageTable.bindAggregation("content", oBindingInfo);
                }
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
            var oCurrentInfoLine = oEvent.getSource().getParent(),
                oInsideTableTag,
                oBindingInfo,
                sPath,
                oInsideTableTemplate = this.getView().byId("idnrgUsgTable-insideTmpl"),
                aFilterIds,
                aFilterValues,
                aFilters,
                oBindingContext,
                oRadioWeekly = this.getView().byId("idnrgUsgRadioweekly"),
                fnRecievedHandler,
                oNoDataTag = this.getView().byId("idnrgUsgNoData");
            if ((oRadioWeekly) && (oRadioWeekly.getChecked())) {
                sPath = "/WeeklyUsageS";
            } else {
                sPath = "/DailyUsageS";
            }
            oCurrentInfoLine.setExpanded(!(oCurrentInfoLine.getExpanded()));
            if (oCurrentInfoLine.getExpanded()) {
                fnRecievedHandler = function (oEvent, oData) {
                    var aContent = oInsideTableTag.getContent();
                    if ((aContent) && (aContent.length === 0)) {
                        oInsideTableTag.addContent(oNoDataTag);
                    }
                };
                oBindingContext = oEvent.getSource().getBindingContext("comp-usage");
                aFilterIds = ["Contract", "PeriodBegin", "PeriodEnd"];
                aFilterValues = [oBindingContext.getProperty("Contract"), oBindingContext.getProperty("PeriodBegin"), oBindingContext.getProperty("PeriodEnd")];
                aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
                oInsideTableTag = oCurrentInfoLine.getContent().pop();
                oBindingInfo = {
                    model : "comp-usage",
                    path : sPath,
                    template : oInsideTableTemplate,
                    filters : aFilters,
                    events: {dataReceived : fnRecievedHandler}
                };
                oInsideTableTag.bindAggregation("content", oBindingInfo);
            }
        };

        return Controller;
    }


);
