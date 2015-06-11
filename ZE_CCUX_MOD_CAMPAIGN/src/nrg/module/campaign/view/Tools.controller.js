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

        var Controller = CoreController.extend('nrg.module.campaign.view.Tools');
        Controller.prototype.createSearchFilterObject = function (oContractID) {
            var aFilters = [],
                oFilterTemplate = new Filter();
            oFilterTemplate.sPath = 'ContractID';
            oFilterTemplate.sOperator = FilterOperator.EQ;
            oFilterTemplate.oValue1 = oContractID;
            aFilters.push(oFilterTemplate);

            oFilterTemplate.sPath = 'Type';
            oFilterTemplate.sOperator = FilterOperator.EQ;
            oFilterTemplate.oValue1 = 'H';
            aFilters.push(oFilterTemplate);
            return aFilters;
        };
        Controller.prototype.onHistoryPress = function (oEvent) {
            var oModel,
                oContext,
                sPath,
                oParameters,
                aHistoryView,
                aDialog,
                aScrollContainer,
                oScrollTemplate,
                aFilters = this.createSearchFilterObject("1121");
            sPath = "/CpgHistS";
            jQuery.sap.require("ute.ui.commons.Dialog");
            aHistoryView = sap.ui.view({
                type: sap.ui.core.mvc.ViewType.XML,
                viewName: "nrg.module.campaign.view.History"
            });
            aScrollContainer = aHistoryView.byId("idnrgCamHisScroll");
            oScrollTemplate = aHistoryView.byId("idnrgCamHisBut").clone();

            oParameters = {
                model : "comp-campaign",
                path : sPath,
                template : oScrollTemplate,
                filters : aFilters
            };
            aScrollContainer.bindAggregation("content", oParameters);
            aDialog = new ute.ui.commons.Dialog({
                title: 'Campaign History',
                width: '750px',
                height: 'auto',
                modal: true,
                content: aHistoryView
            });
            aDialog.addStyleClass("nrgCamHisTDialog");
            //to get access to the global model
            this.getView().addDependent(aDialog);
            aDialog.open();

        };
        Controller.prototype.onAfterRendering = function () {

        };
        return Controller;
    }

);
