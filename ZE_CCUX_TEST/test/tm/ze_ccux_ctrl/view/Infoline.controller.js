/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller'
    ],

    function (Controller) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.Infoline');

        CustomController.prototype.onPressed = function (oControlEvent) {
            var oCheckbox = oControlEvent.getSource();

        };

        return CustomController;
    }
);
