/*global sap*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/mvc/Controller'
    ],

    function (jQuery, Controller) {
        'use strict';

        var CustomController = Controller.extend('test.nb.ze_ccux_ctrl.view.RadioButton');

        CustomController.prototype.onSelected = function (oControlEvent) {
            jQuery.sap.log(oControlEvent.parameters('checked'));
        };

        return CustomController;
    }
);
