/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller'
    ],

    function (CoreController) {
        'use strict';

        var Controller = CoreController.extend('nrg.view.campaign.Overview');

        //TODO: Implementation required

        Controller.prototype.testFunc = function (evt) {
            alert("clicked");
        };
        return Controller;
    }


);
