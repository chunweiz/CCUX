/*global sap*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/mvc/Controller'
    ],

    function (jQuery, Controller) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.TabBar');

        CustomController.prototype.onPressed = function (oControlEvent) {
            console.log("onPressed");
            console.log(oControlEvent.getParameter('selectedKey'));
        };

        CustomController.prototype.onSelected = function (oControlEvent) {
            console.log("onSelected");
            console.log(oControlEvent.getParameter('selectedKey'));
        };

        return CustomController;
    }
);
