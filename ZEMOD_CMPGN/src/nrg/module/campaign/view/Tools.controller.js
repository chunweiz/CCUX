/*globals sap, ute*/
/*jslint nomen:true*/
sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'jquery.sap.global',
        'nrg/base/type/Price',
        "sap/ui/model/json/JSONModel"
    ],

    function (CoreController, Filter, FilterOperator, jQuery, price, JSONModel) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.campaign.view.Tools');
        /* =========================================================== */
		/* lifecycle method- Init                                     */
		/* =========================================================== */
        Controller.prototype.onInit = function () {
            this.getOwnerComponent().getRouter().attachRoutePatternMatched(this._onObjectMatched, this);
        };
		/**
		 * Binds the view to the object path
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event
		 * @private
		 */
        Controller.prototype._onObjectMatched = function (oEvent) {
            var oViewModel,
                iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay();
            oViewModel = new JSONModel({
				busy : true,
				delay : 0
			});
            this.getView().setModel(oViewModel, "appView");
            this.getView().getModel("appView").setProperty("/busy", false);
            Controller.sContract = oEvent.getParameter("arguments").coNum;
		};
       /**
		 * Assign the filter objects based on the input selection
		 *
		 * @function
		 * @param {oContractID} Contract to be used aa a filter
         * @param {oFlag} Filter flag to determine the Agent Requested and Customer Requested
		 * @private
		 */
        Controller.prototype.createSearchFilterObject = function (aFilterIds, aFilterValues) {
            var aFilters = [],
                oFilterTemplate,
                iCount;

            for (iCount = 0; iCount < aFilterIds.length; iCount = iCount + 1) {
                oFilterTemplate = new Filter();
                oFilterTemplate.sPath = aFilterIds[iCount];
                oFilterTemplate.sOperator = FilterOperator.EQ;
                oFilterTemplate.oValue1 = aFilterValues[iCount];

                aFilters.push(oFilterTemplate);

            }
            return aFilters;
        };

        /**
		 * Display History View when user clicked on Campaign History Button
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onHistoryPress = function (oEvent) {
            var oModel,
                sPath,
                mParameters,
                oHistoryView,
                oDialog,
                oScrollContainer,
                oScrollTemplate,
                aFilters,
                aFilterIds,
                aFilterValues;
            aFilterIds = ["ContractID", "Type"];
            aFilterValues = [Controller.sContract, "H"];
            aFilters = this.createSearchFilterObject(aFilterIds, aFilterValues);
            sPath = "/CpgHistS";
            jQuery.sap.require("ute.ui.commons.Dialog");
            oHistoryView = sap.ui.view({
                type: sap.ui.core.mvc.ViewType.XML,
                viewName: "nrg.module.campaign.view.History"
            });
            oScrollContainer = oHistoryView.byId("idnrgCamHisScroll");
            oScrollTemplate = oHistoryView.byId("idnrgCamHisBut").clone();

            mParameters = {
                model : "comp-campaign",
                path : sPath,
                template : oScrollTemplate,
                filters : aFilters
            };
            oScrollContainer.bindAggregation("content", mParameters);
            oDialog = new ute.ui.commons.Dialog({
                title: 'Campaign History',
                width: '750px',
                height: 'auto',
                modal: true,
                content: oHistoryView
            });
            oDialog.addStyleClass("nrgCamHis-dialog");
            //to get access to the global model
            this.getView().addDependent(oDialog);
            oDialog.open();

        };
        /**
		 * Display History View when user clicked on Campaign History Button
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onCancelPress = function (oEvent) {
            var oModel,
                sPath,
                mParameters,
                oHistoryView,
                oDialog,
                oPendingSwapsTable,
                oScrollTemplate,
                aFilters,
                aFilterIds,
                aFilterValues,
                oPendingSwapsTemplate;
            aFilterIds = ["Contract"];
            aFilterValues = [Controller.sContract];
            aFilters = this.createSearchFilterObject(aFilterIds, aFilterValues);
            sPath = "/PendSwapS";
            oPendingSwapsTable = this.getView().byId("idnrgCamTls-pendTable");
            oPendingSwapsTemplate = this.getView().byId("idnrgCamTls-pendRow");
            mParameters = {
                model : "comp-campaign",
                path : sPath,
                filters : aFilters,
                template : oPendingSwapsTemplate
            };
            //to get access to the global model
            //oPendingSwapsTable.bindRows(mParameters);
            oDialog = this.getView().byId("idnrgCamTlsDialog");
            oDialog.setWidth("750px");
            oDialog.setHeight("auto");
            oDialog.setTitle("PENDING SWAPS");
            oDialog.setModal(true);
            this.getView().addDependent(oDialog);
            oDialog.open();
        };
        return Controller;
    }

);
