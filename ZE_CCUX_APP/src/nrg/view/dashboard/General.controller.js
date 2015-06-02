/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller'
    ],

    function (CoreController) {
        'use strict';

        var Controller = CoreController.extend('nrg.view.dashboard.General');

        Controller.prototype.onInit = function () {
            var oModel;

            oModel = this.getOwnerComponent().getModel('comp-dashboard');
            if (oModel) {
                oModel.read('/BpSearchs');
            }
        };

        return Controller;
    }
);
