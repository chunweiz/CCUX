/*globals sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'jquery.sap.global',
        'nrg/base/type/Price'
    ],

    function (CoreController, Filter, FilterOperator, jQuery, price) {
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
		 * @param {oContractID} Contract to be used aa a filter
         * @param {oFlag} Filter flag to determine the Agent Requested and Customer Requested
		 * @private
		 */
        Controller.prototype._createSearchFilterObject = function (sContractID, sFlag) {
            var aFilters = [],
                oFilterTemplate = new Filter();
            oFilterTemplate.sPath = 'ContractID';
            oFilterTemplate.sOperator = FilterOperator.EQ;
            oFilterTemplate.oValue1 = sContractID;
            aFilters.push(oFilterTemplate);

            oFilterTemplate.sPath = 'Type';
            oFilterTemplate.sOperator = FilterOperator.EQ;
            oFilterTemplate.oValue1 = sFlag;
            aFilters.push(oFilterTemplate);

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
                aFilters = this._createSearchFilterObject("1121", "P"),
                oTileContainer,
                oTileTemplate;

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
                aContent;
/*            aChildren = oEvent.getSource().getParent().findElements();
            for (i = 0; i < aChildren.length; i = i + 1) {
                if (aChildren[i].hasStyleClass("nrgCamOffBt-Selected")) {
                    aChildren[i].removeStyleClass("nrgCamOffBt-Selected");
                }
            }
            oEvent.getSource().addStyleClass("nrgCamOffBt-Selected");*/
            sButtonText = oEvent.getSource().getId();
            sButtonText = sButtonText.substring(sButtonText.length - 1, sButtonText.length);
            switch (sButtonText) {
            case "P":
                aFilters = this._createSearchFilterObject("1121", "P");
                break;
            case "R":
                aFilters = this._createSearchFilterObject("1121", "R");
                break;
            case "S":
                aFilters = this._createSearchFilterObject("1121", "S");
                break;
            case "F":
                aFilters = this._createSearchFilterObject("1121", "F");
                break;
            default:
                aFilters = this._createSearchFilterObject("1121", "F");
            }
            oTileContainer = this.getView().byId("idnrgCamOffScroll");
            aContent = oTileContainer.getContent();
            //oTileTemplate = aContent[0].clone();
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
		 * Displays and renders comparision view based on the user selection of Invoice and Consumption
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event
		 *
		 */
        Controller.prototype.toggleComparision = function (oEvent) {
            var oDisplay1 = this.getView().byId("idnrgCmpOffDisplay-1"),
                oDisplay2 = this.getView().byId("idnrgCmpOffDisplay-2"),
                oFragment1 = sap.ui.xmlfragment("nrg.module.campaign.view.Cons"),
                oFragment2 = sap.ui.xmlfragment("nrg.module.campaign.view.Cons");
            oDisplay1.removeAllContent();
            oDisplay2.removeAllContent();
            oDisplay1.addContent(oFragment1);
            oDisplay2.addContent(oFragment2);
        };

        /**
		 * Move to Campaign details view when the user selected a particular campaign
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 *
		 */
        Controller.prototype.selectCampaign = function (oEvent) {
            this.navTo("campaignchg", {coNum: "123", offercode: "50124832"});

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

        return Controller;
    }
);
