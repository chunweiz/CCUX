/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/mvc/Controller'
    ],

    function (jQuery, Controller) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.ICAppHeader');

        CustomController.prototype.onHdrMenuItemPressed = function (oControlEvent) {
            oControlEvent.getSource().deSelectOthers();
        };

        return CustomController;
    }
);

