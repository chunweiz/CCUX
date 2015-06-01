/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller'
    ],

    function (Controller) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.Button');

        CustomController.prototype.onPressed = function (oControlEvent) {
            alert('button pressed');
        };

        return CustomController;
    }
);
