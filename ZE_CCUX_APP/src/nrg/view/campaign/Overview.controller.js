/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/util/view/BaseController'
    ],

    function (CoreController) {
        'use strict';

        var Controller = CoreController.extend('nrg.view.campaign.Overview');

        Controller.prototype.onInit = function () {
            var oModel;
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            if (oModel) {
                oModel.read("/CampaignCurrent('1121')");
            }
        };

            //TODO: Implementation required
        Controller.prototype.onBeforeRendering = function () {
        };
                    //TODO: Implementation required
        Controller.prototype.onAfterRendering = function () {
        };


        return Controller;
    }


);
