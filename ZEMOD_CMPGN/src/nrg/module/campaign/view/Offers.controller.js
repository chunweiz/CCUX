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

        var Controller = CoreController.extend('nrg.module.campaign.view.Offers');


		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */
        Controller.prototype.onInit = function () {
            this.getOwnerComponent().getRouter().getRoute("campaignoffers").attachPatternMatched(this._onObjectMatched, this);
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
		 * When the user choosed to select a Campaign for comparision
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event
         * @private
		 */
        Controller.prototype.onOfferSelected = function (oEvent) {
            var aChildren,
                sPath,
                i;
            aChildren = oEvent.getSource().getParent().findElements();
            for (i = 0; i < aChildren.length; i = i + 1) {
                if (aChildren[i].hasStyleClass("nrgCamOff-btn-selected")) {
                    aChildren[i].removeStyleClass("nrgCamOff-btn-selected");
                }
            }
            oEvent.getSource().addStyleClass("nrgCamOff-btn-selected");
        };

        /**
		 * Binds the view to the object path
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event
		 * @private
		 */
        Controller.prototype._onObjectMatched = function (oEvent) {
            var oModel,
                sCurrentPath,
                sEligibilityPath,
                mParameters,
                aFilters,
                oTileContainer,
                oTileTemplate,
                oViewModel,
                iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
                aFilterIds,
                aFilterValues;
            oViewModel = new JSONModel({
				busy : true,
				delay : 0
			});
            this.sContract = oEvent.getParameter("arguments").coNum;
            aFilterIds = ["Contract", "Type"];
            aFilterValues = [this.sContract, "P"];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            this.getView().setModel(oViewModel, "appView");
            sCurrentPath = this.getOwnerComponent().getModel("comp-i18n-campaign").getProperty("nrgCpgChangeOffSet");
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            oTileContainer = this.getView().byId("idnrgCamOffScroll");
            oTileTemplate = this.getView().byId("idnrgCamOffBt").clone();
            this.myTemplate = oTileTemplate;
            mParameters = {
                model : "comp-campaign",
                path : sCurrentPath,
                template : oTileTemplate,
                filters : aFilters
            };
            oTileContainer.bindAggregation("content", mParameters);
            this.getView().getModel("appView").setProperty("/busy", false);
        };

        /**
		 * Binds the view based on the Tier selected like Proactive, Reactive, Save and Final Save
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event
		 * @private
		 */
        Controller.prototype.toggleTier = function (oEvent) {
            var aChildren,
                sPath,
                i,
                sButtonText,
                aFilters,
                oTileContainer,
                oTileTemplate,
                mParameters,
                sCurrentPath,
                aContent,
                aFilterIds,
                aFilterValues;
            sButtonText = oEvent.getSource().getId();
            sButtonText = sButtonText.substring(sButtonText.length - 1, sButtonText.length);
            aFilterIds = ["Contract", "Type"];
            switch (sButtonText) {
            case "P":
                aFilterValues = [this.sContract, "P"];
                break;
            case "R":
                aFilterValues = [this.sContract, "R"];
                break;
            case "S":
                aFilterValues = [this.sContract, "S"];
                break;
            case "F":
                aFilterValues = [this.sContract, "F"];
                break;
            default:
                aFilterValues = [this.sContract, "F"];
            }
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            oTileContainer = this.getView().byId("idnrgCamOffScroll");
            aContent = oTileContainer.getContent();
            oTileTemplate = this.myTemplate;
            sCurrentPath = this.getOwnerComponent().getModel("comp-i18n-campaign").getProperty("nrgCpgChangeOffSet");
            mParameters = {
                model : "comp-campaign",
                path : sCurrentPath,
                template : oTileTemplate,
                filters : aFilters
            };
            oTileContainer.bindAggregation("content", mParameters);
        };

        /**
		 * Move to Campaign details view when the user selected a particular campaign
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 *
		 */
        Controller.prototype.selectCampaign = function (oEvent) {
            this.navTo("campaignchg", {coNum: this.sContract, offercodeNum: "50124832"});
        };

        /**
		 * Formats the Cancellation fee and Incentive values
		 *
		 * @function
		 * @param {sCancellationFee} CancellationFee value from the binding
         * @param {sIncentive} Incentive value from the binding
		 *
		 */
        Controller.prototype.formatCancelFee = function (sCancellationFee, sIncentive) {
            return "Canc: " + sCancellationFee + " / " + "Inc: " + sIncentive;
        };

        /**
		 * Formats the Promo Code binding value
		 *
		 * @function
		 * @param {sPromoCode} Promo Code value from the binding
         *
		 *
		 */
        Controller.prototype.formatPromo = function (sPromoCode) {
            return "Promo: " + sPromoCode;
        };

        /**
		 * Back to Overview page function
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.backToOverview = function (oEvent) {
            this.navTo("campaign", {coNum : this.sContract, typeV : "C"});
        };

        return Controller;
    }
);
