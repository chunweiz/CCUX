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
                    { key: 'key001', value: 'value001' },
                    { key: 'key002', value: 'value002' },
                    { key: 'key003', value: 'value003' },
                    { key: 'key004', value: 'value004' },
                    { key: 'key005', value: 'value005' }
                ]
            });

            this.getView().setModel(oModel, 'data');

            oModel = new JSONModel({
                selectedKey: 'amex',
                dropdown: [
                    { key: 'amex', value: 'American Express', icon: 'sap-icon://nrg-icon/cc-amex' },
                    { key: 'discover', value: 'Discover', icon: 'sap-icon://nrg-icon/cc-discover' },
                    { key: 'mastercard', value: 'Mastercard', icon: 'sap-icon://nrg-icon/cc-mastercard' },
                    { key: 'visa', value: 'Visa', icon: 'sap-icon://nrg-icon/cc-visa' }
                ]
            });

            this.getView().setModel(oModel, 'cc');
        };

        CustomController.prototype.onSelected = function (oControlEvent) {
            jQuery.sap.log.info(oControlEvent.getParameter('selectedKey'));
        };

        return CustomController;
    }
);


