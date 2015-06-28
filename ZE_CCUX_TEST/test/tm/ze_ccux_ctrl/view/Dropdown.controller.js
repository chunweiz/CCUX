/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel'
    ],

    function (jQuery, Controller, JSONModel) {
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
                    { key: 'key004', value: 'value004', selected: false },
                    { key: 'key005', value: 'value004', selected: false },
                    { key: 'key006', value: 'value004', selected: false },
                    { key: 'key007', value: 'value004', selected: false },
                    { key: 'key008', value: 'value004', selected: false },
                    { key: 'key009', value: 'value004', selected: false },
                    { key: 'key010', value: 'value004', selected: false },
                    { key: 'key011', value: 'value004', selected: false },
                    { key: 'key012', value: 'value004', selected: false },
                    { key: 'key013', value: 'value004', selected: false },
                    { key: 'key014', value: 'value004', selected: false },
                    { key: 'key015', value: 'value004', selected: false },
                    { key: 'key016', value: 'value004', selected: false },
                    { key: 'key017', value: 'value004', selected: false },
                    { key: 'key018', value: 'value004', selected: false },
                    { key: 'key019', value: 'value004', selected: false },
                    { key: 'key020', value: 'value004', selected: false },
                    { key: 'key021', value: 'value004', selected: false },
                    { key: 'key022', value: 'value004', selected: false },
                    { key: 'key023', value: 'value004', selected: false },
                    { key: 'key024', value: 'value004', selected: false },
                    { key: 'key025', value: 'value004', selected: false },
                    { key: 'key026', value: 'value004', selected: false },
                    { key: 'key027', value: 'value004', selected: false },
                    { key: 'key028', value: 'value004', selected: false },
                    { key: 'key029', value: 'value004', selected: false }
                ]
            });

            this.getView().setModel(oModel, 'data');
        };

        CustomController.prototype.onSelected = function (oControlEvent) {
            jQuery.sap.log.info(oControlEvent.getParameter('selectedKey'));
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


