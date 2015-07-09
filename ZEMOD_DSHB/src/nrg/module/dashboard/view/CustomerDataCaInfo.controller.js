/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel'
    ],

    function (jQuery, Controller, JSONModel) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.dashboard.view.CustomerDataCaInfo');

        CustomController.prototype.onInit = function () {
            var oModel;

            oModel = new JSONModel({
                selectedKey: 'key001',
                dropdown: [
                    { key: 'key001', value: 'Shop Address Number One' },
                    { key: 'key002', value: 'Shop Address Number Two' },
                    { key: 'key003', value: 'Shop Address Number Three' },
                    { key: 'key004', value: 'Shop Address Number Four' },
                    { key: 'key005', value: 'Shop Address Number Five' }
                ]
            });

            this.getView().setModel(oModel, 'data');

            //Model to track page edit/save status
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oCaInfoConfig');
        };

        CustomController.prototype.onBeforeRendering = function () {
            this._initCaInfoConfigModel();
        };

        CustomController.prototype.onAfterRendering = function () {

        };

        CustomController.prototype.onExit = function () {

        };

        CustomController.prototype._initCaInfoConfigModel = function () {
            var oModel = this.getView().getModel('oCaInfoConfig');
            oModel.setProperty('/mailAddrUpdateVisible', true);
            oModel.setProperty('/mailAddrAddnewVisible', true);
            oModel.setProperty('/mailAddrSaveVisible', false);

            oModel.setProperty('/tempAddrAddnewVisible', true);
            oModel.setProperty('/tempAddrSaveVisible', false);
        };




        return CustomController;
    }
);
