/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'sap/ui/core/routing/HashChanger'
    ],

    function (Controller, HashChanger) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.Button');

        CustomController.prototype.onPressed = function (oControlEvent) {
            alert('onPressed');
        };

        CustomController.prototype.onBeforeRendering = function () {
            alert('onBeforeRendering');
        };

        CustomController.prototype.onAfterRendering = function () {
            alert('onAfterRendering');
        };

        return CustomController;
    }
);
