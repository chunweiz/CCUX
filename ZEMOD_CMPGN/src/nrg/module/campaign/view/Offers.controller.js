/*globals sap, ute*/

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

        //TODO: Implementation required
        Controller.prototype.onInit = function () {
            var oModel,
                oContext,
                sCurrentPath,
                sEligibilityPath,
                oParameters,
                sEligibilityModel,
                aFilters = this.createSearchFilterObject("1121", "P"),
                aTileContainer,
                aTileTemplate,
                json;

            sCurrentPath = this.getOwnerComponent().getModel("comp-i18n-campaign").getProperty("nrgCpgChangeOffSet");
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            aTileContainer = this.getView().byId("idnrgCamOffScroll");

            aTileTemplate = this.getView().byId("idnrgCamOffBt").clone();
            this.myTemplate = aTileTemplate;
            oParameters = {
                model : "comp-campaign",
                path : sCurrentPath,
                template : aTileTemplate,
                filters : aFilters
            };
            aTileContainer.bindAggregation("content", oParameters);
        };
        Controller.prototype.createSearchFilterObject = function (oContractID, oFlag) {
            var aFilters = [],
                oFilterTemplate = new Filter();
            oFilterTemplate.sPath = 'ContractID';
            oFilterTemplate.sOperator = FilterOperator.EQ;
            oFilterTemplate.oValue1 = oContractID;
            aFilters.push(oFilterTemplate);

            oFilterTemplate.sPath = 'Type';
            oFilterTemplate.sOperator = FilterOperator.EQ;
            oFilterTemplate.oValue1 = oFlag;
            aFilters.push(oFilterTemplate);

            return aFilters;
        };
        Controller.prototype.onPressed = function (oEvent) {
            var aChildren,
                sPath,
                i;
            aChildren = oEvent.getSource().getParent().findElements();
            for (i = 0; i < aChildren.length; i = i + 1) {
                if (aChildren[i].hasStyleClass("nrgCamOffBt-Selected")) {
                    aChildren[i].removeStyleClass("nrgCamOffBt-Selected");
                }
            }
            oEvent.getSource().addStyleClass("nrgCamOffBt-Selected");
        };
        Controller.prototype.toggleTier = function (oEvent) {
            var aChildren,
                sPath,
                i,
                aButtonText,
                aFilters,
                aTileContainer,
                aTileTemplate,
                oParameters,
                sCurrentPath,
                aContent;
/*            aChildren = oEvent.getSource().getParent().findElements();
            for (i = 0; i < aChildren.length; i = i + 1) {
                if (aChildren[i].hasStyleClass("nrgCamOffBt-Selected")) {
                    aChildren[i].removeStyleClass("nrgCamOffBt-Selected");
                }
            }
            oEvent.getSource().addStyleClass("nrgCamOffBt-Selected");*/
            aButtonText = oEvent.getSource().getId();
            aButtonText = aButtonText.substring(aButtonText.length - 1, aButtonText.length);
            switch (aButtonText) {
            case "P":
                aFilters = this.createSearchFilterObject("1121", "P");
                break;
            case "R":
                aFilters = this.createSearchFilterObject("1121", "R");
                break;
            case "S":
                aFilters = this.createSearchFilterObject("1121", "S");
                break;
            case "F":
                aFilters = this.createSearchFilterObject("1121", "F");
                break;
            default:
                aFilters = this.createSearchFilterObject("1121", "F");
            }
            aTileContainer = this.getView().byId("idnrgCamOffScroll");
            aContent = aTileContainer.getContent();
            //aTileTemplate = aContent[0].clone();
            aTileTemplate = this.myTemplate;
            sCurrentPath = this.getOwnerComponent().getModel("comp-i18n-campaign").getProperty("nrgCpgChangeOffSet");
            oParameters = {
                model : "comp-campaign",
                path : sCurrentPath,
                template : aTileTemplate,
                filters : aFilters
            };
            aTileContainer.bindAggregation("content", oParameters);
        };

        Controller.prototype.toggleComparision = function (oEvent) {
            var aDisplay1 = this.getView().byId("idnrgCmpOffDisplay-1"),
                aDisplay2 = this.getView().byId("idnrgCmpOffDisplay-2"),
                aFragment = sap.ui.xmlfragment("nrg.module.campaign.view.Cons");
            aDisplay1.addContent(aFragment);
            aDisplay2.addContent(aFragment);


        };
        Controller.prototype.formatCancelFee = function (aCancellationFee, aIncentive) {

            return "Canc: " + aCancellationFee + " / " + "Inc: " + aIncentive;

        };
        Controller.prototype.formatPromo = function (aPromoCode) {
            return "Promo: " + aPromoCode;
        };

        return Controller;
    }
);
