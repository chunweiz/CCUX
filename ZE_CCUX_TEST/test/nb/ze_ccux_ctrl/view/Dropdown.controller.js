/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller'
    ],

    function (Controller) {
        'use strict';

        var CustomController = Controller.extend('test.nb.ze_ccux_ctrl.view.Dropdown');

 CustomController.prototype.onPressed = function (oControlEvent) {
            alert(oControlEvent.getParameter('expanded'));
        };

        return CustomController;
    }
);
