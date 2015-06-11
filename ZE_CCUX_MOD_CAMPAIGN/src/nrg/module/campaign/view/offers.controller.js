/*globals sap, ute*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'jquery.sap.global',
        'nrg/util/type/Price'
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
                aFilters = this.createSearchFilterObject("1121");

            sCurrentPath = this.getOwnerComponent().getModel("comp-i18n-campaign").getProperty("nrgCpgChangeOffSet");
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'offers-cpg');
            oParameters = {
                filters : aFilters,
                success : function (oData) {
                    this.getView().getModel('offers-cpg').setData(oData.results);
                    jQuery.sap.log.info("Odata Read Successfully:::");
                }.bind(this),
                error: function (oError) {
                    jQuery.sap.log.info("Some Error");
                }.bind(this)
            };
            if (oModel) {
                oModel.read(sCurrentPath, oParameters);
            }
        };
        Controller.prototype.createSearchFilterObject = function (oContractID, oCurrentFlag) {
            var aFilters = [],
                oFilterTemplate = new Filter();
            oFilterTemplate.sPath = 'ContractID';
            oFilterTemplate.sOperator = FilterOperator.EQ;
            oFilterTemplate.oValue1 = oContractID;
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
            sPath = oEvent.getSource().getBindingContext("offers-cpg").sPath;
            this.getView().bindElement({
                model : "overview-camp",
                path : sPath
            });
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
