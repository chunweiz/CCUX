/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller'
    ],

    function (Controller) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.Checkbox');

        CustomController.prototype.onSelected = function (oControlEvent) {
            alert('checked: ' + oControlEvent.getSource().getChecked());
        };

        return CustomController;
    }
);
