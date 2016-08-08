/*global sap*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel'
    ],

    function (jQuery, Controller, JSONModel) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.UsageDetails');

        CustomController.prototype.onInit = function () {
            var sUrl = jQuery.sap.getModulePath('test.tm.ze_ccux_ctrl.view.control.UsageDetailsGauge', '.css');
            jQuery.sap.includeStyleSheet(sUrl);
        };

        return CustomController;
    }
);
