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
            this.getOwnerComponent().getModel('comp-dashboard').read('/ProductSet');
        };

        return Controller;
    }
);
