/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/util/view/BaseController'
    ],

    function (CoreController) {
        'use strict';

        var Controller = CoreController.extend('nrg.view.dashboard.CallerNoIDSearch');

        Controller.prototype.onInit = function () {
            var oModel;

            /*oModel = this.getOwnerComponent().getModel('comp-dashboard');
            if (oModel) {
                var aFilter = [];
                var oFilter= new sap.ui.model.Filter("PartnerID", sap.ui.model.FilterOperator.EQ, "PartnerID 1");
                aFilter.push(oFilter);
                var test = oModel.read('/BpSearchs', aFilter);
            }*/
        };

        return Controller;
    }
);
