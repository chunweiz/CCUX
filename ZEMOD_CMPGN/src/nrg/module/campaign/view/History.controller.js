/*globals sap, ute*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'jquery.sap.global'
    ],

    function (CoreController, jQuery) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.campaign.view.History');

        Controller.prototype.onPressed = function (oEvent) {
            var aChildren,
                sPath,
                i,
                aContent,
                aScrollContainer = this.getView().byId("idnrgCamHisScroll");
            aContent = aScrollContainer.getContent();
            aChildren = oEvent.getSource().getParent().findElements();
            for (i = 0; i < aChildren.length; i = i + 1) {
                if (aChildren[i].hasStyleClass("nrgCamHisBut-Selected")) {
                    aChildren[i].removeStyleClass("nrgCamHisBut-Selected");
                }
            }
            oEvent.getSource().addStyleClass("nrgCamHisBut-Selected");
            sPath = oEvent.getSource().getBindingContext("comp-campaign").getPath();
            this.getView().bindElement({
                model : "comp-campaign",
                path : sPath
            });
        };
        Controller.prototype.formatTileDate = function (startDate, endDate) {
            return startDate + " - " + endDate;
        };
        Controller.prototype.onAfterRendering = function () {
            var aContent, abinding, sPath, that = this,
                aScrollContainer = this.getView().byId("idnrgCamHisScroll"),
                handler = function () {
                    aContent = aScrollContainer.getContent();
                    if ((aContent !== undefined) && (aContent.length > 0)) {
                        sPath = aContent[0].getBindingContext("comp-campaign").getPath();
                        aContent[0].addStyleClass("nrgCamHisBut-Selected");
                        that.getView().bindElement({
                            model : "comp-campaign",
                            path : sPath
                        });
                    }
                    abinding.detachDataReceived(handler);
                };
            abinding = aScrollContainer.getBinding("content");
            abinding.attachDataReceived(handler);
        };

        return Controller;
    }
);
