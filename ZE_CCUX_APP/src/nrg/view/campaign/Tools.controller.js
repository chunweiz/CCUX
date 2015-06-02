/*globals sap*/

sap.ui.define(
    [
        'nrg/util/view/BaseController',
        'jquery.sap.global'
    ],

    function (CoreController, jQuery) {
        'use strict';

        var Controller = CoreController.extend('nrg.view.campaign.Tools');
        Controller.prototype.onHistoryPress = function (oEvent) {
            jQuery.sap.require("ute.ui.commons.Dialog");
            var aHistoryView = sap.ui.view({
                type: sap.ui.core.mvc.ViewType.XML,
                viewName: "nrg.view.campaign.History"
            }),
                dialog = new ute.ui.commons.Dialog({
                    title: '{comp-i18n>nrgCmpHisTtl}',
                    width: '750px',
                    height: 'auto',
                    modal: true,
                    content: aHistoryView,
                    beginButton: new sap.m.Button({
                        text: 'Close',
                        press: function () {
                            dialog.close();
                        }
                    }),
                    afterClose: function () {
                        dialog.destroy();
                    }
                });
            //to get access to the global model
            this.getView().addDependent(dialog);
            dialog.open();
        };
        return Controller;
    }
);
