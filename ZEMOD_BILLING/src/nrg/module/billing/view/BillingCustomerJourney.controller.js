/*globals sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator'
    ],

    function (CoreController, JSONModel, Filter, FilterOperator) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.billing.view.BillingCustomerJourney');

        //TODO: Implementation required
        Controller.prototype.onAfterRendering = function () {
            this.getOwnerComponent().getCcuxApp().setLayout('FullWidthTool');
        };
        Controller.prototype.onBeforeRendering = function () {

            this.getView().byId('chart').setDataModel(new JSONModel({
                data: [
                    { channel: 'Website', frequency: 3 },
                    { channel: 'Mobile', frequency: 3 },
                    { channel: 'IVR', frequency: 1 },
                    { channel: 'Webchat', frequency: 5 },
                    { channel: 'Phone', frequency: 2 },
                    { channel: 'Survey', frequency: 6 }
                ]
            }));
            this.getView().setModel(new JSONModel({
                data: [
                    { recordIndex: '0', channelIcon: 'sap-icon://nrg-icon/website', topLabel: '08/31/2014' },
                    { recordIndex: '1', channelIcon: 'sap-icon://ipad' },
                    { recordIndex: '2', channelIcon: 'sap-icon://nrg-icon/not-verified', topLabel: '09/21/2014', rightDivider: true },
                    { recordIndex: '3', channelIcon: 'sap-icon://nrg-icon/webchat' },
                    { recordIndex: '4', channelIcon: 'sap-icon://nrg-icon/agent' },
                    { recordIndex: '5', channelIcon: 'sap-icon://nrg-icon/survey' },
                    { recordIndex: '6', channelIcon: 'sap-icon://letter' },
                    { recordIndex: '7', channelIcon: 'sap-icon://nrg-icon/website' },
                    { recordIndex: '8', channelIcon: 'sap-icon://ipad' },
                    { recordIndex: '9', channelIcon: 'sap-icon://nrg-icon/not-verified' },
                    { recordIndex: '10', channelIcon: 'sap-icon://nrg-icon/webchat' },
                    { recordIndex: '11', channelIcon: 'sap-icon://nrg-icon/agent' },
                    { recordIndex: '12', channelIcon: 'sap-icon://nrg-icon/survey' },
                    { recordIndex: '13', channelIcon: 'sap-icon://letter' },
                    { recordIndex: '14', channelIcon: 'sap-icon://nrg-icon/website', selected: true },
                    { recordIndex: '15', channelIcon: 'sap-icon://ipad' },
                    { recordIndex: '16', channelIcon: 'sap-icon://nrg-icon/not-verified' },
                    { recordIndex: '17', channelIcon: 'sap-icon://nrg-icon/webchat' },
                    { recordIndex: '18', channelIcon: 'sap-icon://nrg-icon/agent' },
                    { recordIndex: '19', channelIcon: 'sap-icon://nrg-icon/survey' },
                    { recordIndex: '20', channelIcon: 'sap-icon://letter', topLabel: '09/21/2015' }
                ]
            }), 'timeline');

        };

        Controller.prototype._onTotalPress = function (oEvent) {
            //console.log(oEvent);
        };

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
        return Controller;
    }
);
