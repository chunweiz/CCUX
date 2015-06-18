/*global sap, ute*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/mvc/Controller',
        'ute/ui/main/Label',
        'ute/ui/main/TabBarItem'
    ],

    function (jQuery, Controller, Label, TabBarItem) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.TabBar');

        CustomController.prototype.onInit = function () {

        };

        CustomController.prototype.onPressed = function (oControlEvent) {
            console.log("onPressed ... " + oControlEvent.getSource().getSelected());
        };

        CustomController.prototype.onSelected = function (oControlEvent) {
            console.log(oControlEvent.getParameter('selectedItem').getKey());
        };

        return CustomController;
    }
);
