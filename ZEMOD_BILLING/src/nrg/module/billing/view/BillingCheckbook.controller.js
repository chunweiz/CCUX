// temporarily added by Jerry

/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/mvc/Controller'
    ],

    function (jQuery, Controller) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.billing.view.BillingCheckbook');

        CustomController.prototype.onInit = function () {

        };

        CustomController.prototype.onBeforeRendering = function () {
            this.getOwnerComponent().getCcuxApp().setTitle('BILLING');
        };

        CustomController.prototype.onAfterRendering = function () {

        };

        CustomController.prototype.onExit = function () {

        };

        return CustomController;
    }
);
