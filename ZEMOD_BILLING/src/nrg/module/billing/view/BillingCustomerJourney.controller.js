/*globals sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/model/json/JSONModel',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'jquery.sap.global',
        'sap/ui/core/format/DateFormat'
    ],

    function (CoreController, JSONModel, Filter, FilterOperator, jQuery, DateFormat) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.billing.view.BillingCustomerJourney');
        //TODO: Implementation required
        Controller.prototype.onInit = function () {

        };
        //TODO: Implementation required
        Controller.prototype.onAfterRendering = function () {
            this.getOwnerComponent().getCcuxApp().setLayout('FullWidthTool');

        };
        Controller.prototype.onBeforeRendering = function () {

            var oBindingInfo,
                oModel = this.getOwnerComponent().getModel('comp-cj'),
                sPath = "/CJFrequencySet",
                aFilterIds,
                aFilterValues,
                aFilters,
                oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo(),
                oPieChart = this.getView().byId('idnrgCJPieChart'),
                oPieChartModel;
            this._sContract = oRouteInfo.parameters.coNum;
            this._sBP = oRouteInfo.parameters.bpNum;
            this._sCA = oRouteInfo.parameters.caNum;
            this._oFormatYyyymmdd = DateFormat.getInstance({
                pattern: 'MM/dd/yyyy'
            });
            oPieChartModel = new sap.ui.model.json.JSONModel();
            this.getView().setModel(oPieChartModel, 'Cj-PieChart');
            oPieChart.setDataModel(oPieChartModel);
/*            this.getView().byId('idnrgCJPieChart').setDataModel(new JSONModel({
                data: [
                    { channel: 'Website', frequency: 3 },
                    { channel: 'Mobile', frequency: 3 },
                    { channel: 'IVR', frequency: 1 },
                    { channel: 'Webchat', frequency: 5 },
                    { channel: 'Phone', frequency: 2 },
                    { channel: 'Survey', frequency: 6 }
                ]
            }));*/
            this.getView().setModel(new JSONModel({
                data: [
                    { recordIndex: '0', channelIcon: 'sap-icon://nrg-icon/website', topLabel: '08/31/2014', description: 'sarath', channel: 'website'},
                    { recordIndex: '1', channelIcon: 'sap-icon://nrg-icon/webchat', description: 'sarath', channel: 'webchat'},
                    { recordIndex: '2', channelIcon: 'sap-icon://nrg-icon/survey', topLabel: '09/21/2014', rightDivider: true, description: 'sarath', channel: 'survey'},
                    { recordIndex: '3', channelIcon: 'sap-icon://nrg-icon/agent', description: 'sarath', channel: 'Agent'},
                    { recordIndex: '4', channelIcon: 'sap-icon://nrg-icon/not-verified', description: 'sarath', channel: 'ivr'},
                    { recordIndex: '5', channelIcon: 'sap-icon://nrg-icon/call-center', description: 'sarath', channel: 'phone'},
                    { recordIndex: '6', channelIcon: 'sap-icon://email', description: 'sarath', channel: 'letter'},
                    { recordIndex: '7', channelIcon: 'sap-icon://iphone', description: 'sarath', channel: 'mobile'}
                ]
            }), 'timeline');
            aFilterIds = ["BP", "CA"];
            aFilterValues = ["64041", this._sCA];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            oBindingInfo = {
                filters : aFilters,
                success : function (oData) {
                    oPieChartModel.setData(oData);
                    jQuery.sap.log.info("Odata Read Successfully:::");
                    oPieChart.refreshChart();
                }.bind(this),
                error: function (oError) {
                    jQuery.sap.log.info("Odata Read Error occured");
                }.bind(this)
            };
            if (oModel) {
                oModel.read(sPath, oBindingInfo);
            }
/*            sPath = "/CJIconsSet";
            aFilterIds = ["BP", "CA"];
            aFilterValues = ["64041", this._sCA];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            oBindingInfo = {
                filters : aFilters,
                success : function (oData) {

                }.bind(this),
                error: function (oError) {
                    jQuery.sap.log.info("Odata Read Error occured");
                }.bind(this)
            };
            if (oModel) {
                oModel.read(sPath, oBindingInfo);
            }*/
            this._dateHandler(true, 14);
        };
        /**
		 * Central handler for dates
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype._dateHandler = function (binitial, iNumberDays) {
            var oFromDate = this.getView().byId('idnrgBllCJ-fromDate'),
                oToDate = this.getView().byId('idnrgBllCJ-toDate'),
                oNewDate = new Date(),
                oLast14DaysButton = this.getView().byId('idnrgBllCJ-l14Days'),
                oLast30DaysButton = this.getView().byId('idnrgBllCJ-l30Days');
            if (binitial) {
                oToDate.setMinDate(new Date(1, 0, 1));
                oFromDate.setMinDate(new Date(1, 0, 1));
            }
            if (iNumberDays === 14) {
                oNewDate.setDate(oNewDate.getDate() - 14);
                oLast14DaysButton.addStyleClass("nrgBllCJ-timeline-btns-sel");
                oLast30DaysButton.removeStyleClass("nrgBllCJ-timeline-btns-sel");
            } else {
                oNewDate.setDate(oNewDate.getDate() - 30);
                oLast30DaysButton.addStyleClass("nrgBllCJ-timeline-btns-sel");
                oLast14DaysButton.removeStyleClass("nrgBllCJ-timeline-btns-sel");
            }
            oToDate.setDefaultDate(this._oFormatYyyymmdd.format(new Date(), true));
            oFromDate.setDefaultDate(this._oFormatYyyymmdd.format(oNewDate, true));
        };
        /**
		 * Handler for Channel single press action
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.on14Days = function (oEvent) {
            this._dateHandler(true, 14);
        };
        /**
		 * Handler for Channel single press action
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.on30Days = function (oEvent) {
            this._dateHandler(true, 30);
        };
        /**
		 * Handler for Channel single press action
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype._onChannelPress = function (oEvent) {
            oEvent.getSource().setSelected(!oEvent.getSource().getSelected());
        };
        /**
		 * Handler for Channel Double press action
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype._onChannelDPress = function (oEvent) {
            //console.log(oEvent);
        };
        /**
		 * Handler for Pie-Chart Total press action
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype._onTotalPress = function (oEvent) {
            //console.log(oEvent);
        };
        /**
		 * Handler for Pie-Chart individual totals press action
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype._onSlicePress = function (oEvent) {
            //console.log(oEvent.getParameters());
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
            if (aFilterIds !== undefined) {
                for (iCount = 0; iCount < aFilterIds.length; iCount = iCount + 1) {
                    aFilters.push(new Filter(aFilterIds[iCount], FilterOperator.EQ, aFilterValues[iCount], ""));
                }
            }
            return aFilters;
        };

        /**
		 * Display Customer Journey module when user navigated
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onCustomerJourneyModule = function (oEvent) {
            var sPath,
                mParameters,
                oCJTable,
                oScrollTemplate,
                aFilters,
                aFilterIds,
                aFilterValues,
                oCJTemplate,
                fnRecievedHandler,
                that = this;
            this.getOwnerComponent().getCcuxApp().setOccupied(true);
            aFilterIds = ["BP", "CA"];
            aFilterValues = ["0000083248", "000003619065"];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            if (!this._oDialogFragment) {
                this._oDialogFragment = sap.ui.xmlfragment("CustomerJourney", "nrg.module.billing.view.CJModule", this);
            }
            if (this._oCJDialog === undefined) {
                this._oCJDialog = new ute.ui.main.Popup.create({
                    title: 'CUSTOMER JOURNEY MODULE',
                    close: this._handleDialogClosed,
                    content: this._oDialogFragment
                });
            }
            sPath = "/CJModuleSet";
            oCJTable = sap.ui.core.Fragment.byId("CustomerJourney", "idnrgCJModule-table");
            oCJTemplate = sap.ui.core.Fragment.byId("CustomerJourney", "idnrgCJModule-RowTempl");
            // Function received handler is used to update the view with first History campaign.---start
            fnRecievedHandler = function () {
                that.getOwnerComponent().getCcuxApp().setOccupied(false);
            };
            mParameters = {
                model : "comp-cj",
                path : sPath,
                filters : aFilters,
                template : oCJTemplate,
                events: {dataReceived : fnRecievedHandler}
            };
            this.getView().addDependent(this._oCJDialog);
            //to get access to the global model
            this._oCJDialog.addStyleClass("nrgCJModule-dialog");
            oCJTable.bindRows(mParameters);
            this._oCJDialog.open();
        };
        /**
		 * Handler for Customer Referral Transaction launcher
		 *
		 * @function
		 * @param {Event} Type Event object
         *
		 *
		 */
        Controller.prototype.onCustomerReferral = function (oControlEvent) {
            var oWebUiManager = this.getOwnerComponent().getCcuxWebUiManager();

            oWebUiManager.notifyWebUi('openIndex', {
                LINK_ID: "Z_CUST_REF"
            });
        };
        /**
		 * Mapping Icons with backend Data
		 *
		 * @function
         * @param {string} sChanneltype from backend
         * @return {string} sChannelIcon for backend sChanneltype
		 */
        Controller.prototype._onSlicePress = function (sChanneltype) {
            var sChannelIcon;
            switch (sChanneltype) {
            case "website":
                sChannelIcon = 'sap-icon://nrg-icon/website';
                break;
            case "webchat":
                sChannelIcon = 'sap-icon://nrg-icon/webchat';
                break;
            case "survey":
                sChannelIcon = 'sap-icon://nrg-icon/survey';
                break;
            case "agent":
                sChannelIcon = 'sap-icon://nrg-icon/agent';
                break;
            case "ivr":
                sChannelIcon = 'sap-icon://nrg-icon/not-verified';
                break;
            case "phone":
                sChannelIcon = 'sap-icon://nrg-icon/call-center';
                break;
            case "email":
                sChannelIcon = 'sap-icon://email';
                break;
            case "mobile":
                sChannelIcon = 'sap-icon://iphone';
                break;
            }
            return sChannelIcon;
        };
        return Controller;
    }
);
