/*globals sap, ute*/

sap.ui.define(
    [
        'nrg/util/view/BaseController',
        'jquery.sap.global'
    ],

    function (CoreController, jQuery) {
        'use strict';

        var Controller = CoreController.extend('nrg.view.campaign.Tools');
        Controller.prototype.onHistoryPress = function (oEvent) {
            var oModel, aHistoryView, aDialog;
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            if (oModel) {
                oModel.read("/CampaignHistory('1121')");
            }
            jQuery.sap.require("ute.ui.commons.Dialog");
            aHistoryView = sap.ui.view({
                type: sap.ui.core.mvc.ViewType.XML,
                viewName: "nrg.view.campaign.History"
            });
            aDialog = new ute.ui.commons.Dialog({
                title: '{comp-i18n>nrgCmpHisTtl}',
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
