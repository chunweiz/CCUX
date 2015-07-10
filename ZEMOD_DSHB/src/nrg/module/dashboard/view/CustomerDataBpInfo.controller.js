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

        var CustomController = Controller.extend('nrg.module.dashboard.view.CustomerDataBpInfo');

        CustomController.prototype.onInit = function () {
            //Model to track page edit/save status
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oBpInfoConfig');

        };

        CustomController.prototype.onBeforeRendering = function () {
            this._initBpInfoConfigModel();
        };

        CustomController.prototype.onAfterRendering = function () {

        };

        CustomController.prototype.onExit = function () {

        };

        CustomController.prototype._initBpInfoConfigModel = function () {
            var oModel = this.getView().getModel('oBpInfoConfig');
            oModel.setProperty('/titleEditVisible', true);
            oModel.setProperty('/titleSaveVisible', false);
            oModel.setProperty('/titleEditable', false);

            oModel.setProperty('/addrEditVisible', true);
            oModel.setProperty('/addrSaveVisible', false);
            oModel.setProperty('/addrEditable', false);

            oModel.setProperty('/personalInfoEditVisible', true);
            oModel.setProperty('/personalInfoSaveVisible', false);
            oModel.setProperty('/personalInfoEditable', false);

            oModel.setProperty('/contactInfoEditVisible', true);
            oModel.setProperty('/contactInfoSaveVisible', false);
            oModel.setProperty('/contactInfoEditable', false);

            oModel.setProperty('/marketPrefEditVisible', true);
            oModel.setProperty('/marketPrefSaveVisible', false);
            oModel.setProperty('/mktPrfEditable', false);
        };

        CustomController.prototype.onTitleCancel = function () {
            var oModel = this.getView().getModel('oBpInfoConfig');
            oModel.setProperty('/titleEditVisible', true);
            oModel.setProperty('/titleSaveVisible', false);
            oModel.setProperty('/titleEditable', false);
        };

        CustomController.prototype.onTitleEdit = function () {
            var oModel = this.getView().getModel('oBpInfoConfig');
            oModel.setProperty('/titleEditVisible', false);
            oModel.setProperty('/titleSaveVisible', true);
            oModel.setProperty('/titleEditable', true);
        };

        CustomController.prototype.onTitleSave = function () {
            var oModel = this.getView().getModel('oBpInfoConfig');
            oModel.setProperty('/titleEditVisible', true);
            oModel.setProperty('/titleSaveVisible', false);
            oModel.setProperty('/titleEditable', false);
        };

        CustomController.prototype.onAddrCancel = function () {
            var oModel = this.getView().getModel('oBpInfoConfig');
            oModel.setProperty('/addrEditVisible', true);
            oModel.setProperty('/addrSaveVisible', false);
            oModel.setProperty('/addrEditable', false);
        };

        CustomController.prototype.onAddrEdit = function () {
            var oModel = this.getView().getModel('oBpInfoConfig');
            oModel.setProperty('/addrEditVisible', false);
            oModel.setProperty('/addrSaveVisible', true);
            oModel.setProperty('/addrEditable', true);
        };

        CustomController.prototype.onAddrSave = function () {
            var oModel = this.getView().getModel('oBpInfoConfig');
            oModel.setProperty('/addrEditVisible', true);
            oModel.setProperty('/addrSaveVisible', false);
            oModel.setProperty('/addrEditable', false);
        };

        CustomController.prototype.onPersonalInfoCancel = function () {
            var oModel = this.getView().getModel('oBpInfoConfig');
            oModel.setProperty('/personalInfoEditVisible', true);
            oModel.setProperty('/personalInfoSaveVisible', false);
            oModel.setProperty('/personalInfoEditable', false);
        };

        CustomController.prototype.onPersonalInfoEdit = function () {
            var oModel = this.getView().getModel('oBpInfoConfig');
            oModel.setProperty('/personalInfoEditVisible', false);
            oModel.setProperty('/personalInfoSaveVisible', true);
            oModel.setProperty('/personalInfoEditable', true);
        };

        CustomController.prototype.onPersonalInfoSave = function () {
            var oModel = this.getView().getModel('oBpInfoConfig');
            oModel.setProperty('/personalInfoEditVisible', true);
            oModel.setProperty('/personalInfoSaveVisible', false);
            oModel.setProperty('/personalInfoEditable', false);
        };

        CustomController.prototype.onContactInfoCancel = function () {
            var oModel = this.getView().getModel('oBpInfoConfig');
            oModel.setProperty('/contactInfoEditVisible', true);
            oModel.setProperty('/contactInfoSaveVisible', false);
            oModel.setProperty('/contactInfoEditable', false);
        };

        CustomController.prototype.onContactInfoEdit = function () {
            var oModel = this.getView().getModel('oBpInfoConfig');
            oModel.setProperty('/contactInfoEditVisible', false);
            oModel.setProperty('/contactInfoSaveVisible', true);
            oModel.setProperty('/contactInfoEditable', true);
        };

        CustomController.prototype.onContactInfoSave = function () {
            var oModel = this.getView().getModel('oBpInfoConfig');
            oModel.setProperty('/contactInfoEditVisible', true);
            oModel.setProperty('/contactInfoSaveVisible', false);
            oModel.setProperty('/contactInfoEditable', false);
        };

        CustomController.prototype.onMarketPrefCancel = function () {
            var oModel = this.getView().getModel('oBpInfoConfig');
            oModel.setProperty('/marketPrefEditVisible', true);
            oModel.setProperty('/marketPrefSaveVisible', false);
            oModel.setProperty('/mktPrfEditable', false);
        };

        CustomController.prototype.onMarketPrefEdit = function () {
            var oModel = this.getView().getModel('oBpInfoConfig');
            oModel.setProperty('/marketPrefEditVisible', false);
            oModel.setProperty('/marketPrefSaveVisible', true);
            oModel.setProperty('/mktPrfEditable', true);
        };

        CustomController.prototype.onMarketPrefSave = function () {
            var oModel = this.getView().getModel('oBpInfoConfig');
            oModel.setProperty('/marketPrefEditVisible', true);
            oModel.setProperty('/marketPrefSaveVisible', false);
            oModel.setProperty('/mktPrfEditable', false);
        };




        return CustomController;
    }
);
