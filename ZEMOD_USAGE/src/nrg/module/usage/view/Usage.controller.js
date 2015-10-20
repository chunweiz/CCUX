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
                oUsageTableRowTemplate = this.getView().byId("idnrgUsgRow-Infoline"),
                oGraph = this.getView().byId('idnrgUsg-Graph-chart'),
                oGraphNoData = this.getView().byId('idnrgUsg-Graph-NoData'),
                oNoDataTag = this.getView().byId("idnrgUsgNoData").clone();
            that._oGraphModel = new JSONModel();
            that.getOwnerComponent().getCcuxApp().setOccupied(true);
            this._sContract = oRouteInfo.parameters.coNum;
            this._sBP = oRouteInfo.parameters.bpNum;
            this._sCA = oRouteInfo.parameters.caNum;
            this._sType = oRouteInfo.parameters.typeV;
            aFilterIds = ["CA"];
            aFilterValues = [this._sCA];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            fnRecievedHandler = function (oEvent, oData) {
                var aContent = oServiceAddressDropDown.getContent(),
                    oBindingContext,
                    sContentPath,
                    aFilterIds,
                    aFilterValues,
                    aFilters,
                    sPath = "/UsageS",
                    fnTableDataRecdHandler;
                fnTableDataRecdHandler = function (oEvent) {
                    oGraphNoData.setVisible(false);
                    that._oGraphModel.setData(that.convertEFLJson(oEvent.mParameters.data.results));
                    oGraph.setDataModel(that._oGraphModel);
                };
                if ((aContent) && (aContent.length > 0)) {
                    oServiceAddressDropDown.setSelectedKey(aContent[0].getKey());
                    oBindingContext = aContent[0].getBindingContext("comp-usage");
                    if (oBindingContext) {
                        aFilterIds = ["Contract"];
                        aFilterValues = [oBindingContext.getProperty("Contract")];
                        aFilters = that._createSearchFilterObject(aFilterIds, aFilterValues);
                        oBindingInfo = {
                            model : "comp-usage",
                            path : sPath,
                            template : oUsageTableRowTemplate,
                            filters : aFilters,
                            events: {dataReceived : fnTableDataRecdHandler}
                        };
                        oUsageTable.bindAggregation("content", oBindingInfo);
                    }
                } else {
                    if (oUsageTable) {
                        oUsageTable.removeAllContent();
                        oUsageTable.addContent(oNoDataTag);
                    }
                }
                that.getOwnerComponent().getCcuxApp().setOccupied(false);
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
       /**
		 * Handler when user expanded Info line for each row
		 *
		 * @function
		 * @param {Event} oEvent object
         *
		 *
		 */
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
                oNoDataTag = this.getView().byId("idnrgUsgNoData").clone(),
                that = this;

            that.getOwnerComponent().getCcuxApp().setOccupied(true);
            if ((oRadioWeekly) && (oRadioWeekly.getChecked())) {
                sPath = "/WeeklyUsageS";
            } else {
                sPath = "/DailyUsageS";
            }
            oCurrentInfoLine.setExpanded(!(oCurrentInfoLine.getExpanded()));
            if (oCurrentInfoLine.getExpanded()) {
                oEvent.getSource().getParent().addStyleClass("nrgUsgTable-InfolineSelected");
                fnRecievedHandler = function (oEvent, oData) {
                    var aContent = oInsideTableTag.getContent();
                    if ((aContent) && (aContent.length === 0)) {
                        oInsideTableTag.addContent(oNoDataTag);
                    }
                    that.getOwnerComponent().getCcuxApp().setOccupied(false);
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
            } else {
                oEvent.getSource().getParent().removeStyleClass("nrgUsgTable-InfolineSelected");
                that.getOwnerComponent().getCcuxApp().setOccupied(false);
            }
        };
       /**
		 * Handler when user clicked on Back
		 *
		 * @function
		 * @param {Event} oEvent object
		 */
        Controller.prototype.backToPage = function (oEvent) {
            if (this._sType ===  "C") {
                this.navTo("campaign", {bpNum: this._sBP, caNum: this._sCA, coNum: this._sContract, typeV: "C"});
            } else if (this._sType ===  "H") {
                this.onRateHistory();
            }
        };
       /**
		 * Handler when user expanded Info line for each row
		 *
		 * @function
		 * @param {Event} oEvent object
		 */
        Controller.prototype.toggleTable = function (oEvent) {
        };
       /**
		 * Handler when user expanded Info line for each row
		 *
		 * @function
		 * @param {Event} oEvent object
		 */
        Controller.prototype.toggleGraph = function (oEvent) {
/*            this.getView().byId('chart').setDataModel(new JSONModel({
                data: [
                    { meterReadDate: '3/12/2015', kwhUsage: 120, avgHighTemp: 70 },
                    { meterReadDate: '2/11/2015', kwhUsage: 123, avgHighTemp: 70 },
                    { meterReadDate: '1/12/2015', kwhUsage: 121, avgHighTemp: 70 },
                    { meterReadDate: '12/11/2014', kwhUsage: 200, avgHighTemp: 70 }
                ]
            }));*/
        };
       /**
		 * Handler when user clicked on rate history
		 *
		 * @function
		 * @param {Event} oEvent object
		 */
        Controller.prototype.onRateHistory = function (oEvent) {
            this.navTo("campaignhistory", {bpNum: this._sBP, caNum: this._sCA, coNum: this._sContract});
        };
       /**
		 * Handler when user changed service address
		 *
		 * @function
		 * @param {Event} oEvent object
		 */
        Controller.prototype.onServiceAdd = function (oEvent) {
            var oBindingContext,
                aFilterIds,
                aFilterValues,
                aFilters,
                sPath = "/UsageS",
                fnTableDataRecdHandler,
                oUsageTable = this.getView().byId("idnrgUsgTable-Rows"),
                oUsageTableRowTemplate = this.getView().byId("idnrgUsgRow-Infoline"),
                that = this,
                oBindingInfo,
                oServiceAddressDropDown = this.getView().byId("idnrgUsgServiceAdd-DropDown"),
                aContent,
                sKey,
                oGraphNoData = this.getView().byId('idnrgUsg-Graph-NoData'),
                aDummyArray = [];
            aContent = oServiceAddressDropDown.getContent();
            sKey = oServiceAddressDropDown.getSelectedKey();
            aContent.forEach(function (oContent) {
                if (oContent.getKey() === sKey) {
                    oBindingContext = oContent.getBindingContext("comp-usage");
                }
            });
            that._oGraphModel.setData(aDummyArray);
            oGraphNoData.setVisible(true);
            if (oBindingContext) {
                aFilterIds = ["Contract"];
                aFilterValues = [oBindingContext.getProperty("Contract")];
                aFilters = that._createSearchFilterObject(aFilterIds, aFilterValues);
                fnTableDataRecdHandler = function (oEvent) {
                    that._oGraphModel.setData()(that.convertEFLJson(oEvent.mParameters.data.results));
                    oGraphNoData.setVisible(false);
                };
                oBindingInfo = {
                    model : "comp-usage",
                    path : sPath,
                    template : oUsageTableRowTemplate,
                    filters : aFilters,
                    events: {dataReceived : fnTableDataRecdHandler}
                };
                oUsageTable.bindAggregation("content", oBindingInfo);
            }
        };
        /**
		 * Converts in to EFL Json format required by Template view.
		 *
		 * @function
		 * @param {String} Type value from the binding
         *
		 *
		 */
        Controller.prototype.convertEFLJson = function (results) {
            var columns = [],
                temp,
                tempColumns = [],
                iCount1,
                aJsonDataNew,
                dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "MM/dd/yyyy" }),
                TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000,
                oformattedDate;
            for (iCount1 = 0; iCount1 < results.length; iCount1 = iCount1 + 1) {
                temp = results[iCount1];
                if ((temp !== undefined) && (temp.KwhUsage !== undefined)) {
                    oformattedDate = dateFormat.format(new Date(temp.PeriodBegin.getTime() + TZOffsetMs));
                    columns.push({
                        "kwhUsage": parseInt(temp.KwhUsage, 10),
                        "meterReadDate": oformattedDate,
                        "avgHighTemp": parseInt(temp.HighTemp, 10)
                    });
                }
            }
            aJsonDataNew = {};
            //aJsonDataNew.results = {};
            aJsonDataNew.data = columns;
            return aJsonDataNew;
        };
        /**
		 * Handler for Side links
		 *
		 * @function
		 * @param {String} Type value from the binding
         *
		 *
		 */
        Controller.prototype.toggleTier = function (oControlEvent) {
            var oWebUiManager = this.getOwnerComponent().getCcuxWebUiManager();

            //this._oApp.setHeaderMenuItemSelected(false, App.HMItemId.Index);

            oWebUiManager.notifyWebUi('openIndex', {
                LINK_ID: "Z_DUNH"
            });
        };
        /**
		 * Handler for Dunning History Transaction launcher
		 *
		 * @function
		 * @param {String} Type value from the binding
         *
		 *
		 */
        Controller.prototype.onDunningHistory = function (oControlEvent) {
            var oWebUiManager = this.getOwnerComponent().getCcuxWebUiManager();

            //this._oApp.setHeaderMenuItemSelected(false, App.HMItemId.Index);

            oWebUiManager.notifyWebUi('openIndex', {
                LINK_ID: "Z_DUNH"
            });
        };
        return Controller;
    }


);
