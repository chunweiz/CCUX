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

        CustomController.prototype.onItemSelected = function (oControlEvent) {
            console.log("onItemSelected ... " + oControlEvent.getSource().getKey() + ' ... ' + oControlEvent.getSource().getSelected());

            if (oControlEvent.getSource().getKey() === 'tb004') {
                oControlEvent.getSource().setGroup('thisIsANewGroup');
            }
        };

        CustomController.prototype.onSelected = function (oControlEvent) {
            console.log("onSelected ... " + oControlEvent.getParameter('selectedItem').getKey());
        };

        return CustomController;
    }
);
