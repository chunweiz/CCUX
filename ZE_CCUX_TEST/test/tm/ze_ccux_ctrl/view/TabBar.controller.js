/*global sap, ute*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/mvc/Controller'
    ],

    function (jQuery, Controller) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.TabBar');

        CustomController.prototype.onPressed = function (oControlEvent) {
            console.log("onPressed ... " + oControlEvent.getSource().getSelected());
        };

        CustomController.prototype.onSelected = function (oControlEvent) {
            var aContent = oControlEvent.getSource().getContent();

            aContent.forEach(function (oContent) {
                if (oContent instanceof ute.ui.main.TabBarItem) {
                    console.log(oContent.getId() + ' ... ' + oContent.getSelected());
                }
            });
        };

        return CustomController;
    }
);
