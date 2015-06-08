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

            sPath = this.getOwnerComponent().getModel("comp-i18n").getProperty("nrgCurrentPendingSet");
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            oParameters = {
                filters : aFilters,
                success : function (oData) {
                    this.getView().bindElement({
                        model : "comp-campaign",
                        path : this.getView().getModel("comp-i18n").getProperty("nrgCurrentView")
                    });
                    jQuery.sap.log.info("Odata Read Successfully");
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

        return Controller;
    }


);
