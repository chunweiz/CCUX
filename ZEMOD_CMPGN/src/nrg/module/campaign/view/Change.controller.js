/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController'
    ],

    function (CoreController) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.campaign.view.Change');
        Controller.prototype.onInit = function () {
            var oModel;
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            if (oModel) {
                oModel.read("/CampaignChangeDisplayLegalDoc('1121')");
            }
        };
            //TODO: Implementation required
        Controller.prototype.onBeforeRendering = function () {
        };
                    //TODO: Implementation required
        Controller.prototype.onAfterRendering = function () {
        };
        //TODO: Implementation required

        return Controller;
    }
);
