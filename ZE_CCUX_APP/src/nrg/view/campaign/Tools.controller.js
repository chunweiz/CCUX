/*globals sap, ute*/

sap.ui.define(
    [
        'nrg/util/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'jquery.sap.global'
    ],

    function (CoreController, Filter, FilterOperator, jQuery) {
        'use strict';

        var Controller = CoreController.extend('nrg.view.campaign.Tools');
        Controller.prototype.createSearchFilterObject = function (oContractID) {
            var aFilters = [],
                oFilterTemplate = new Filter();
            oFilterTemplate.sPath = 'ContractID';
            oFilterTemplate.sOperator = FilterOperator.EQ;
            oFilterTemplate.oValue1 = oContractID;
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
                aFilters = this.createSearchFilterObject("1121");
            sPath = "/CpgHistS";
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            oParameters = {
                filters : aFilters,
                success : function (oData) {
                    this.getView().bindElement({
                        model : "comp-campaign",
                        path : "/CpgHistS('H')"
                    });
/*                    var id = sap.ui.getCore().byId("idCamHisPrcTbl2");
                    id.bindRows("/CpgHistS", {
                        model : "comp-campaign",
                        path : "/CpgHistS"
                    });*/
                    jQuery.sap.log.info("Odata Read Successfully");
                }.bind(this),
                error: function (oError) {
                    jQuery.sap.log.info("Some Error");
                }.bind(this)
            };
            if (oModel) {
                oModel.read(sPath, oParameters);
            }

            jQuery.sap.require("ute.ui.commons.Dialog");
            aHistoryView = sap.ui.view({
                type: sap.ui.core.mvc.ViewType.XML,
                viewName: "nrg.view.campaign.History"
            });
            aDialog = new ute.ui.commons.Dialog({
                title: 'Campaign History',
                width: '750px',
                height: 'auto',
                modal: true,
                content: aHistoryView,
                beginButton: new sap.m.Button({
                    text: 'Close',
                    press: function () {
                        aDialog.close();
                    }
                }),
                afterClose: function () {
                    aDialog.destroy();
                }
            });
            //to get access to the global model
            this.getView().addDependent(aDialog);
            aDialog.open();
        };
        return Controller;
    }
);
