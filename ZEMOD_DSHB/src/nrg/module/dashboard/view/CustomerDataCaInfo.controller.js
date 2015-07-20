/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'nrg/base/view/BaseController',
        'sap/ui/model/json/JSONModel',
        'sap/ui/core/routing/HashChanger',
        'sap/ui/core/format/DateFormat'
    ],

    function (jQuery, Controller, JSONModel, HashChanger, DateFormat) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.dashboard.view.CustomerDataCaInfo');

        CustomController.prototype.onInit = function () {
            var oModel;

//            oModel = new JSONModel({
//                selectedKey: 'key001',
//                dropdown: [
//                    { key: 'key001', value: 'Shop Address Number One' },
//                    { key: 'key002', value: 'Shop Address Number Two' },
//                    { key: 'key003', value: 'Shop Address Number Three' },
//                    { key: 'key004', value: 'Shop Address Number Four' },
//                    { key: 'key005', value: 'Shop Address Number Five' }
//                ]
//            });
//
//            this.getView().setModel(oModel, 'data');

            //Model to track page edit/save status
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oCaInfoConfig');

            this.getView().setModel(this.getOwnerComponent().getModel('comp-dashboard'), 'oODataSvc');

            //Model to hold BuagAddrDetail
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDataBuagAddrDetails');

            //Model to hold CA accounts and mailing address short form
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDataCAs');

            //Model to hold mailing address
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oMailingAddress');

            //Model to hold temporary address
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oTempAddress');
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
            var configModel = this.getView().getModel('oCaInfoConfig');
            configModel.setProperty('/mailAddrUpdateVisible', true);
            configModel.setProperty('/mailAddrAddnewVisible', true);
            configModel.setProperty('/mailAddrSaveVisible', false);
            configModel.setProperty('/mailAddrEditable', false);

            configModel.setProperty('/tempAddrAddnewVisible', true);
            configModel.setProperty('/tempAddrSaveVisible', false);
        };

        CustomController.prototype.onMailAddrUpdate = function () {
            var configModel = this.getView().getModel('oCaInfoConfig');
            configModel.setProperty('/mailAddrUpdateVisible', false);
            configModel.setProperty('/mailAddrAddnewVisible', false);
            configModel.setProperty('/mailAddrSaveVisible', true);
            configModel.setProperty('/mailAddrEditable', true);
        };

        CustomController.prototype.onMailAddrAddnew = function () {
            var configModel = this.getView().getModel('oCaInfoConfig'),
                mailingAddrModel = this.getView().getModel('oMailingAddress');
            configModel.setProperty('/mailAddrUpdateVisible', false);
            configModel.setProperty('/mailAddrAddnewVisible', false);
            configModel.setProperty('/mailAddrSaveVisible', true);
            configModel.setProperty('/mailAddrEditable', true);

            mailingAddrModel.setProperty('/Street', '');
            mailingAddrModel.setProperty('/HouseNo', '');
            mailingAddrModel.setProperty('/UnitNo', '');
            mailingAddrModel.setProperty('/City', '');
            mailingAddrModel.setProperty('/State', '');
            mailingAddrModel.setProperty('/ZipCode', '');
            mailingAddrModel.setProperty('/ValidFrom', '');
            mailingAddrModel.setProperty('/ValidTo', '');
        };

        CustomController.prototype.onMailAddrCancel = function () {
            var configModel = this.getView().getModel('oCaInfoConfig'),
                mailingAddrModel = this.getView().getModel('oMailingAddress');
            configModel.setProperty('/mailAddrUpdateVisible', true);
            configModel.setProperty('/mailAddrAddnewVisible', true);
            configModel.setProperty('/mailAddrSaveVisible', false);
            configModel.setProperty('/mailAddrEditable', false);

            mailingAddrModel.setData(jQuery.extend(true, {}, this.MailingAddressBak));
        };

        CustomController.prototype.onMailAddrSave = function () {
            var configModel = this.getView().getModel('oCaInfoConfig');
            configModel.setProperty('/mailAddrUpdateVisible', true);
            configModel.setProperty('/mailAddrAddnewVisible', true);
            configModel.setProperty('/mailAddrSaveVisible', false);
            configModel.setProperty('/mailAddrEditable', false);
        };

        CustomController.prototype.onTempAddrUpdate = function () {
            var configModel = this.getView().getModel('oCaInfoConfig');
            configModel.setProperty('/tempAddrAddnewVisible', false);
            configModel.setProperty('/tempAddrSaveVisible', true);
            configModel.setProperty('/tempAddrEditable', true);
        };

        CustomController.prototype.onTempAddrCancel = function () {
            var configModel = this.getView().getModel('oCaInfoConfig'),
                tempAddrModel = this.getView().getModel('oTempAddress');
            configModel.setProperty('/tempAddrAddnewVisible', true);
            configModel.setProperty('/tempAddrSaveVisible', false);
            configModel.setProperty('/tempAddrEditable', false);

            tempAddrModel.setData(jQuery.extend(true, {}, this.TempAddrBak));
        };

        CustomController.prototype.onTempAddrSave = function () {
            var configModel = this.getView().getModel('oCaInfoConfig');
            configModel.setProperty('/tempAddrAddnewVisible', true);
            configModel.setProperty('/tempAddrSaveVisible', false);
            configModel.setProperty('/tempAddrEditable', false);
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

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        if (oData.results) {
                            this.getView().getModel('oDataBuagAddrDetails').setData(oData);
                            this.oDataBuagAddrDetailsBak = jQuery.extend(true, {}, oData);
                            this._buildUpCas(this.oDataBuagAddrDetailsBak, caNum);
                            this._buildUpMailingAddress(this.oDataBuagAddrDetailsBak, caNum);
                            this._buildUpTempAddress(this.oDataBuagAddrDetailsBak, caNum);
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

        CustomController.prototype._buildUpCas = function (oData, caNum) {
            var oModel = this.getView().getModel('oDataCAs'),
                caArr = [];
            for(var i=0; i<oData.results.length; i = i + 1 ) {
                var o = {};
                o.key = oData.results[i].ContractAccountID;
                o.value = oData.results[i].ContractAccountID;
                caArr.push(o);
            }

            oModel.setProperty('/selectedKey', caNum);
            oModel.setProperty('/dropdown', caArr);
        };

        CustomController.prototype._buildUpMailingAddress = function (oData, caNum) {
            for(var i=0; i<oData.results.length; i = i + 1 ) {
                if(oData.results[i].ContractAccountID === caNum) {
                    this.getView().getModel('oMailingAddress').setData(oData.results[i].MailingAddress);
                }
            }

            this.MailingAddressBak = jQuery.extend(true, {}, this.getView().getModel('oMailingAddress').getData());
        };

        CustomController.prototype._buildUpTempAddress = function (oData, caNum) {
            for(var i=0; i<oData.results.length; i = i + 1 ) {
                if(oData.results[i].ContractAccountID === caNum) {
                    this.getView().getModel('oTempAddress').setData(oData.results[i].TemporaryAddress);
                }
            }

            this.TempAddrBak = jQuery.extend(true, {}, this.getView().getModel('oTempAddress').getData());
        };

        Controller.prototype._formatDate = function (dob) {
            if (dob) {
                var oDateFormat = DateFormat.getInstance({pattern: "MM/dd/yyyy"});
                return oDateFormat.format(dob);
            }
        };

        return CustomController;
    }
);
