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
                    { key: 'key005', value: 'value005', selected: false },
                    { key: 'key006', value: 'value006', selected: false },
                    { key: 'key007', value: 'value007', selected: false },
                    { key: 'key008', value: 'value008', selected: false },
                    { key: 'key009', value: 'value009', selected: false },
                    { key: 'key010', value: 'value010', selected: false },
                    { key: 'key011', value: 'value011', selected: false },
                    { key: 'key012', value: 'value012', selected: false },
                    { key: 'key013', value: 'value013', selected: false },
                    { key: 'key014', value: 'value014', selected: false },
                    { key: 'key015', value: 'value015', selected: false },
                    { key: 'key016', value: 'value016', selected: false },
                    { key: 'key017', value: 'value017', selected: false },
                    { key: 'key018', value: 'value018', selected: false },
                    { key: 'key019', value: 'value019', selected: false },
                    { key: 'key020', value: 'value020', selected: false },
                    { key: 'key021', value: 'value021', selected: false },
                    { key: 'key022', value: 'value022', selected: false },
                    { key: 'key023', value: 'value023', selected: false },
                    { key: 'key024', value: 'value024', selected: false },
                    { key: 'key025', value: 'value025', selected: false },
                    { key: 'key026', value: 'value026', selected: false },
                    { key: 'key027', value: 'value027', selected: false },
                    { key: 'key028', value: 'value028', selected: false },
                    { key: 'key029', value: 'value029', selected: false }
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


