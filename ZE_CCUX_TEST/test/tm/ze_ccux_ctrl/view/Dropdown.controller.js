/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel'
    ],

    function (Controller, JSONModel) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.Dropdown');

        CustomController.prototype.onInit = function () {
            var oModel, oPicker;

            oModel = new JSONModel({
                selectedKey: 'key003',
                dropdown: [
                    { key: 'key001', value: 'value001', selected: false },
                    { key: 'key002', value: 'value002', selected: true },
                    { key: 'key003', value: 'value003', selected: false },
                    { key: 'key004', value: 'value004', selected: false }
                ]
            });

            this.getView().setModel(oModel, 'data');
        };

        CustomController.prototype.onBeforeRendering = function () {

        };

        CustomController.prototype.onAfterRendering = function () {

        };

        CustomController.onExit = function () {

        };

        return CustomController;
    }
);


