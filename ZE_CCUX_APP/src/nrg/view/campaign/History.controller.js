/*globals sap, ute*/

sap.ui.define(
    [
        'nrg/util/view/BaseController',
        'jquery.sap.global'
    ],

    function (CoreController, jQuery) {
        'use strict';

        var Controller = CoreController.extend('nrg.view.campaign.History');

        Controller.prototype.onInit = function () {

        };
        //TODO: Implementation required
        Controller.prototype.onBeforeRendering = function () {
        };
                    //TODO: Implementation required
        Controller.prototype.onAfterRendering = function () {
/*            var CamHisPrcTbl = this.getView().byId("idCamHisPrcTbl2");
            CamHisPrcTbl.bindElement({
                model : "overview-campList",
                path : "/"
            });*/
        };
        //TODO: Implementation required
        Controller.prototype.onPressed = function (oEvent) {
            var sPath = oEvent.getSource().getParent().getBindingContextPath();
            this.getView().bindElement({
                model : "overview-camp",
                path : sPath
            });
            jQuery.sap.log.info("Odata Read Successfully" + oEvent.getSource().getParent().getBindingContextPath());
        };
        return Controller;
    }
);
