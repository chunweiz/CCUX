/*globals sap, ute*/
/*jslint nomen:true*/
sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'jquery.sap.global',
        'nrg/base/type/Price',
        "sap/ui/model/json/JSONModel"
    ],

    function (CoreController, jQuery, price, JSONModel) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.billing.view.DefferedPmtPlan');

        Controller.prototype.onBeforeRendering = function () {
        };

        return Controller;
    }
);
