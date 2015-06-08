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
            var sPath = oEvent.getSource().getBindingContext("overview-campList").sPath;
            this.getView().bindElement({
                model : "overview-camp",
                path : sPath
            });
        };

        Controller.prototype.formatTileDate = function (startDate, endDate) {
            return startDate + "-" + endDate;
        };

        return Controller;
    }
);
