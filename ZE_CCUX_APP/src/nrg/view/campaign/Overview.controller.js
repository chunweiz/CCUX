/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/util/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'jquery.sap.global'
    ],

    function (CoreController, Filter, FilterOperator, jQuery) {
        'use strict';

        var Controller = CoreController.extend('nrg.view.campaign.Overview');

        Controller.prototype.onInit = function () {
            var oModel,
                oContext,
                sPath,
                oParameters,
                aFilters = this._createSearchFilterObject("1121", "Y");

            sPath = "/CpgCurPndSet";
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            oParameters = {
                filters : aFilters,
                success : function (oData) {
                    if (oData.results) {
                        oContext = this.getView().getModel('comp-campaign').getContext("/CpgCurPndSet(CampaignID='CampaignID 1',PromoCode='PromoCode 1')");
                        this.getView().setBindingContext(oContext, "oCmpCP");
                        this.getView().bindElement("/CpgCurPndSet(CampaignID='CampaignID 1',PromoCode='PromoCode 1')");
                        this.getView().bindObject("/CpgCurPndSet(CampaignID='CampaignID 1',PromoCode='PromoCode 1')");
                        jQuery.sap.log.info("Odata Read Successfully");
                    }
                }.bind(this),
                error: function (oError) {
                    jQuery.sap.log.info("Some Error");
                }.bind(this)
            };
            if (oModel) {
                oModel.read(sPath, oParameters);
            }

        };
        Controller.prototype._createSearchFilterObject = function (oContractID, oCurrentFlag) {
            var aFilters = [],
                oFilterTemplate = new Filter();


            oFilterTemplate.sPath = 'ContractID';
            oFilterTemplate.sOperator = FilterOperator.EQ;
            oFilterTemplate.oValue1 = oContractID;
            aFilters.push(oFilterTemplate);

            oFilterTemplate.sPath = 'CurrentFlag';
            oFilterTemplate.sOperator = FilterOperator.EQ;
            oFilterTemplate.oValue1 = oCurrentFlag;
            aFilters.push(oFilterTemplate);

            return aFilters;
        };
            //TODO: Implementation required
        Controller.prototype.onBeforeRendering = function () {
        };
                    //TODO: Implementation required
        Controller.prototype.onAfterRendering = function () {
            var oModel;
            oModel = this.getView().getModel('OV-cmp');

        };
        Controller.prototype.toggleCampaign = function () {
            var oModel,
                sPath = "/CpgCurPndSet",
                oParameters,
                aFilters = this._createSearchFilterObject("1121", "N");
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            oParameters = {
                filters : aFilters,
                success : function (oData) {
                    if (oData.results) {
                        //this.getView().bindElement('/0');
                        jQuery.sap.log.info("Odata Read Successfully");
                    }
                }.bind(this),
                error: function (oError) {
                    jQuery.sap.log.info("Some Error");
                }.bind(this)
            };
            if (oModel) {
                oModel.read(sPath, oParameters);
            }

        };

        return Controller;
    }


);
