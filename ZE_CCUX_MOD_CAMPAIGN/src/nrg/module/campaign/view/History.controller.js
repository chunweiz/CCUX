/*globals sap, ute*/

sap.ui.define(
    [
        'nrg/util/view/BaseController',
        'jquery.sap.global'
    ],

    function (CoreController, jQuery) {
        'use strict';

        var Controller = CoreController.extend('nrg.view.campaign.History');

        Controller.prototype.onPressed = function (oEvent) {
            var aChildren,
                sPath,
                i;

            aChildren = oEvent.getSource().getParent().findElements();
            for (i = 0; i < aChildren.length; i = i + 1) {
                if (aChildren[i].hasStyleClass("nrgCamHisBut-Selected")) {
                    aChildren[i].removeStyleClass("nrgCamHisBut-Selected");
                }
            }
            oEvent.getSource().addStyleClass("nrgCamHisBut-Selected");
            sPath = oEvent.getSource().getBindingContext("overview-campList").sPath;
            this.getView().bindElement({
                model : "overview-camp",
                path : sPath
            });
        };

        Controller.prototype.formatTileDate = function (startDate, endDate) {
            return startDate + " - " + endDate;
        };

        return Controller;
    }
);
