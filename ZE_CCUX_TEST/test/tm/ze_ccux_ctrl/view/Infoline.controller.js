/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel'
    ],

    function (Controller, JSONModel) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.Infoline');

        CustomController.prototype.onInit = function () {
            var oModel = new JSONModel({
                employees: [
                    { firstName: 'tau ming', lastName: 'hew' },
                    { firstName: 'tau ming', lastName: 'hew' },
                    { firstName: 'tau ming', lastName: 'hew' }
                ]
            });

            this.getView().setModel(oModel, 'bp');
        };

        CustomController.prototype.onPressed = function (oControlEvent) {
            alert(oControlEvent.getParameter('expanded'));
        };

        return CustomController;
    }
);
