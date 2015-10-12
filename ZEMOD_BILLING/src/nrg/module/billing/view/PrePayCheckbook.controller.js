sap.ui.define(
    [
        'jquery.sap.global',
        'nrg/base/view/BaseController',
        'nrg/base/type/Price'
    ],

    function (jQuery, Controller, Type_Price) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.billing.view.PrePayCheckbook');

        CustomController.prototype.onInit = function () {
        };

        CustomController.prototype.onBeforeRendering = function () {
        };

        return CustomController;
    }
);
