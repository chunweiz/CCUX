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

        };
        /* =========================================================== */
		/* lifecycle method- Before Rendering                          */
		/* =========================================================== */
        Controller.prototype.onBeforeRendering = function () {
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
                aFilterValues,
                fnRecievedHandler,
                that = this,
                oProactiveButton = this.getView().byId("idCamToggleBtn-P"),
                oNoDataTag,
                oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo();
            this._i18NModel = this.getOwnerComponent().getModel("comp-i18n-campaign");
            this.getOwnerComponent().getCcuxApp().setOccupied(true);
            this._sContract = oRouteInfo.parameters.coNum;
            oNoDataTag = this.getView().byId("idnrgCamHisNoData");
            //this._sContract = "32253375";
            aFilterIds = ["Contract", "Type"];
            aFilterValues = [this._sContract, "P"];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            sCurrentPath = this._i18NModel.getProperty("nrgCpgChangeOffSet");
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            oTileContainer = this.getView().byId("idnrgCamOffScroll");
            oTileTemplate = this.getView().byId("idnrgCamOffBt").clone();
            this._oTileTemplate = oTileTemplate;
            // Handler function for tile container
            fnRecievedHandler = function (oEvent) {
                var aContent = oTileContainer.getContent();
                if ((aContent !== undefined) && (aContent.length > 0)) {
                    oNoDataTag.addStyleClass("nrgCamOff-hide");
                    oTileContainer.removeStyleClass("nrgCamOff-hide");
                } else {
                    oNoDataTag.removeStyleClass("nrgCamOff-hide");
                    oTileContainer.addStyleClass("nrgCamOff-hide");
                }
                that.getOwnerComponent().getCcuxApp().setOccupied(false);
                oProactiveButton.addStyleClass("nrgCamOff-btn-selected");
            };
            mParameters = {
                model : "comp-campaign",
                path : sCurrentPath,
                template : oTileTemplate,
                filters : aFilters,
                parameters : {expand: "EFLs"},
                events: {dataReceived : fnRecievedHandler}
            };
            oTileContainer.bindAggregation("content", mParameters);
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
                iCount,
                oContext,
                sOfferCode;
            sPath = oEvent.getSource().getBindingContext("comp-campaign").getPath();
            oContext = this.getView().getModel("comp-campaign").getContext(sPath);
            sOfferCode = oContext.getProperty("OfferCode");
/*            aChildren = oEvent.getSource().getParent().findElements();
            for (iCount = 0; iCount < aChildren.length; iCount = iCount + 1) {
                if (aChildren[iCount].hasStyleClass("nrgCamOff-btn-selected")) {
                    aChildren[iCount].removeStyleClass("nrgCamOff-btn-selected");
                }
            }
            oEvent.getSource().addStyleClass("nrgCamOff-btn-selected");*/
            this.navTo("campaignchg", {coNum: this._sContract, offercodeNum: sOfferCode});
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
                aFilterValues,
                fnRecievedHandler,
                that = this,
                oProactiveButton = this.getView().byId("idCamToggleBtn-P"),
                oReactiveButton = this.getView().byId("idCamToggleBtn-R"),
                oSaveButton = this.getView().byId("idCamToggleBtn-S"),
                oFinalSaveButton = this.getView().byId("idCamToggleBtn-F"),
                oNoDataTag = this.getView().byId("idnrgCamHisNoData");
            oProactiveButton.removeStyleClass("nrgCamOff-btn-selected");
            oReactiveButton.removeStyleClass("nrgCamOff-btn-selected");
            oSaveButton.removeStyleClass("nrgCamOff-btn-selected");
            oFinalSaveButton.removeStyleClass("nrgCamOff-btn-selected");
            sButtonText = oEvent.getSource().getId();
            sButtonText = sButtonText.substring(sButtonText.length - 1, sButtonText.length);
            this.getOwnerComponent().getCcuxApp().setOccupied(true);
            aFilterIds = ["Contract", "Type"];
            switch (sButtonText) {
            case "P":
                aFilterValues = [this._sContract, "P"];
                break;
            case "R":
                aFilterValues = [this._sContract, "R"];
                break;
            case "S":
                aFilterValues = [this._sContract, "S"];
                break;
            case "F":
                aFilterValues = [this._sContract, "F"];
                break;
            default:
                aFilterValues = [this._sContract, "F"];
            }
            oEvent.getSource().addStyleClass("nrgCamOff-btn-selected");
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            oTileContainer = this.getView().byId("idnrgCamOffScroll");
            aContent = oTileContainer.getContent();
            oTileTemplate = this._oTileTemplate;
            sCurrentPath = this._i18NModel.getProperty("nrgCpgChangeOffSet");
            // Handler function for tile container
            fnRecievedHandler = function (oEvent) {
                var aContent = oTileContainer.getContent();
                if ((aContent !== undefined) && (aContent.length > 0)) {
                    oNoDataTag.addStyleClass("nrgCamOff-hide");
                    oTileContainer.removeStyleClass("nrgCamOff-hide");
                } else {
                    oNoDataTag.removeStyleClass("nrgCamOff-hide");
                    oTileContainer.addStyleClass("nrgCamOff-hide");
                }
                that.getOwnerComponent().getCcuxApp().setOccupied(false);
            };
            mParameters = {
                model : "comp-campaign",
                path : sCurrentPath,
                template : oTileTemplate,
                filters : aFilters,
                parameters : {expand: "EFLs"},
                events: {dataReceived : fnRecievedHandler}
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
            //this.navTo("campaignchg", {coNum: this._sContract, offercodeNum: "50124832"});
            sap.ui.commons.MessageBox.alert("Comparision work is still in progress, please click on any of the offer tiles for SWAP process");
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
            this.navTo("campaign", {coNum : this._sContract, typeV : "C"});
        };

        return Controller;
    }
);
