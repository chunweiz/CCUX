/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'nrg/base/view/BaseController',
        'sap/ui/model/json/JSONModel',
        'sap/ui/core/routing/HashChanger'
    ],

    function (jQuery, Controller, JSONModel, HashChanger) {
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

            this.getView().setModel(this.getOwnerComponent().getModel('comp-dashboard'), 'oODataSvc');

            //Model to hold BuagAddrDetail
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDataBuagAddrDetails');


        };

        CustomController.prototype.onBeforeRendering = function () {
            this._initCaInfoConfigModel();
            this._initDataModel();
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
            oModel.setProperty('/mailAddrEditable', false);

            oModel.setProperty('/tempAddrAddnewVisible', true);
            oModel.setProperty('/tempAddrSaveVisible', false);
        };

        CustomController.prototype.onMailAddrUpdate = function () {
            var oModel = this.getView().getModel('oCaInfoConfig');
            oModel.setProperty('/mailAddrUpdateVisible', false);
            oModel.setProperty('/mailAddrAddnewVisible', false);
            oModel.setProperty('/mailAddrSaveVisible', true);
            oModel.setProperty('/mailAddrEditable', true);
        };

        CustomController.prototype.onMailAddrAddnew = function () {
            var oModel = this.getView().getModel('oCaInfoConfig');
            oModel.setProperty('/mailAddrUpdateVisible', false);
            oModel.setProperty('/mailAddrAddnewVisible', false);
            oModel.setProperty('/mailAddrSaveVisible', true);
            oModel.setProperty('/mailAddrEditable', true);
        };

        CustomController.prototype.onMailAddrSave = function () {
            var oModel = this.getView().getModel('oCaInfoConfig');
            oModel.setProperty('/mailAddrUpdateVisible', true);
            oModel.setProperty('/mailAddrAddnewVisible', true);
            oModel.setProperty('/mailAddrSaveVisible', false);
            oModel.setProperty('/mailAddrEditable', false);
        };

        CustomController.prototype.onTempAddrUpdate = function () {
            var oModel = this.getView().getModel('oCaInfoConfig');
            oModel.setProperty('/tempAddrAddnewVisible', false);
            oModel.setProperty('/tempAddrSaveVisible', true);
            oModel.setProperty('/tempAddrEditable', true);
        };

        CustomController.prototype.onTempAddrSave = function () {
            var oModel = this.getView().getModel('oCaInfoConfig');
            oModel.setProperty('/tempAddrAddnewVisible', true);
            oModel.setProperty('/tempAddrSaveVisible', false);
            oModel.setProperty('/tempAddrEditable', false);
        };

        CustomController.prototype.onBackToDashboard = function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo('dashboard.Bp', {bpNum: this._bpNum});
        };

        Controller.prototype._retrUrlHash = function () {
            //Get the hash to retrieve bp #
            var oHashChanger = new HashChanger(),
                sUrlHash = oHashChanger.getHash();

            return sUrlHash;
        };

        CustomController.prototype._initDataModel = function () {
            var sPath, aSplitHash, iSplitHashL;

            aSplitHash = (this._retrUrlHash()).split('/');
            iSplitHashL = aSplitHash.length;
            if(!this._bpNum) {
                this._bpNum = aSplitHash[iSplitHashL - 3];
            }
            if(!this._caNum) {
                this._caNum = aSplitHash[iSplitHashL - 1];
            }

            this._initRetrAllData(this._caNum);
        };

        CustomController.prototype._initRetrAllData = function (caNum) {
            var oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters;

            sPath = '/Buags(ContractAccountID=' + '\'' + caNum + '\')/BuagAddrDetail/';
//            sPath = '/Buags(\'' + caNum + '\')';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        if (oData.PartnerID) {
                            this.getView().getModel('oDataBuagAddrDetails').setData(oData);
                            this.oDataBuagAddrDetailsBak = jQuery.extend(true, {}, oData);
                        }
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                    var t = 1.0;
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        return CustomController;
    }
);
