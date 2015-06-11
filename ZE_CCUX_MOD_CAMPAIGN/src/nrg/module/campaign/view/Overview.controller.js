/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'jquery.sap.global'
    ],

    function (CoreController, Filter, FilterOperator, jQuery) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.campaign.view.Overview');

        Controller.prototype.onInit = function () {
            var oModel,
                oContext,
                sCurrentPath,
                sEligibilityPath,
                oParameters,
                sEligibilityModel,
                aFilters = this._createSearchFilterObject("1121", "Y");

            sCurrentPath = this.getOwnerComponent().getModel("comp-i18n-campaign").getProperty("nrgCurrentPendingSet");
            sEligibilityPath = this.getOwnerComponent().getModel("comp-i18n-campaign").getProperty("nrgEligibilitySet");
            oModel = this.getOwnerComponent().getModel('comp-campaign');

            oParameters = {
                filters : aFilters,
                success : function (oData) {
                    this.getView().bindElement({
                        model : "comp-campaign",
                        path : this.getView().getModel("comp-i18n-campaign").getProperty("nrgCurrentView")
                    });

                    jQuery.sap.log.info("Odata Read Successfully:::");
                }.bind(this),
                error: function (oError) {
                    jQuery.sap.log.info("Some Error");
                }.bind(this)
            };
            if (oModel) {
                oModel.read(sCurrentPath, oParameters);
            }
            oParameters = {
                filters : aFilters,
                success : function (oData) {
                    this.getView().byId("idCamCustReqOfferBtn").bindElement({
                        model : "Overview-elig",
                        path : "/CpgEligS('1121')"
                    });
                    this.getView().byId("idCamAgtReqOfferBtn").bindElement({
                        model : "Overview-elig",
                        path : "/CpgEligS('1121')"
                    });
                    jQuery.sap.log.info("Odata Read Successfully:::");
                }.bind(this),
                error: function (oError) {
                    jQuery.sap.log.info("Some Error");
                }.bind(this)
            };
            if (oModel) {
                oModel.read(sEligibilityPath, oParameters);
            }
            this.getView().setModel(oModel, "Overview-elig");
        };
        Controller.prototype._createSearchFilterObject = function (oContractID, oCurrentFlag) {
            var aFilters = [],
                oFilterTemplate = new Filter();
            oFilterTemplate.sPath = 'ContractID';
            oFilterTemplate.sOperator = FilterOperator.EQ;
            oFilterTemplate.oValue1 = oContractID;
            aFilters.push(oFilterTemplate);
            return aFilters;
        };
            //TODO: Implementation required
        Controller.prototype.onBeforeRendering = function () {
        };
        //TODO: Implementation required
        Controller.prototype.onAfterRendering = function () {
        };
        Controller.prototype.toggleCampaign = function () {
            this.getView().bindObject({
                model : "comp-campaign",
                path : "/CpgCurPndS('P')"
            });
        };
        Controller.prototype.onOffers = function (oEvent) {
            var oParameters = {

            };
            this.navTo("campaignoffers", {bpNum: "123", caNum: "1234"});
        };
        return Controller;
    }


);
