/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'nrg/base/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'sap/ui/core/routing/HashChanger',
        'sap/ui/core/format/DateFormat'
    ],

    function (jQuery, Controller, Filter, FilterOperator, HashChanger, DateFormat) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.dashboard.view.CustomerDataBpInfo');

        CustomController.prototype.onInit = function () {
            this.getView().setModel(this.getOwnerComponent().getModel('comp-dashboard'), 'oODataSvc');

            //Model to track page edit/save status
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oBpInfoConfig');

            //Model to hold BP info
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDataBP');

            //Model to hold BpTitle
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDataBpTitle');

            //Model to hold BpAddress
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDataBpAddress');

            //Model to hold BpPersonal
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDataBpPersonal');

            //Model to hold BpContact
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDataBpContact');

            //Model to hold BpMarkPreferSet
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDataBpMarkPreferSet');
        };

        CustomController.prototype.onBeforeRendering = function () {
            this._initBpInfoConfigModel();

            this._initDataModel();
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
            oModel.setProperty('/personalInfoSSEditable', false);
            oModel.setProperty('/personalInfoDLEditable', false);

            oModel.setProperty('/contactInfoEditVisible', true);
            oModel.setProperty('/contactInfoSaveVisible', false);
            oModel.setProperty('/contactInfoEditable', false);

            oModel.setProperty('/marketPrefEditVisible', true);
            oModel.setProperty('/marketPrefSaveVisible', false);
            oModel.setProperty('/mktPrfEditable', false);
        };

        CustomController.prototype.onTitleCancel = function () {    //onTitleCancel
            var oConfigModel = this.getView().getModel('oBpInfoConfig'),
                bpTitleModel = this.getView().getModel('oDataBpTitle');
            oConfigModel.setProperty('/titleEditVisible', true);
            oConfigModel.setProperty('/titleSaveVisible', false);
            oConfigModel.setProperty('/titleEditable', false);

            bpTitleModel.setData(jQuery.extend(true, {}, this.oDataBpTitleBak));
        };

        CustomController.prototype.onTitleEdit = function () {
            var oConfigModel = this.getView().getModel('oBpInfoConfig');
            oConfigModel.setProperty('/titleEditVisible', false);
            oConfigModel.setProperty('/titleSaveVisible', true);
            oConfigModel.setProperty('/titleEditable', true);
        };

        CustomController.prototype.onTitleSave = function () {
            var oConfigModel = this.getView().getModel('oBpInfoConfig');
            oConfigModel.setProperty('/titleEditVisible', true);
            oConfigModel.setProperty('/titleSaveVisible', false);
            oConfigModel.setProperty('/titleEditable', false);
        };

        CustomController.prototype.onAddrCancel = function () {
            var oConfigModel = this.getView().getModel('oBpInfoConfig'),
                bpAddrModel = this.getView().getModel('oDataBpAddress');
            oConfigModel.setProperty('/addrEditVisible', true);
            oConfigModel.setProperty('/addrSaveVisible', false);
            oConfigModel.setProperty('/addrEditable', false);

            bpAddrModel.setData(jQuery.extend(true, {}, this.oDataBpAddressBak));
        };

        CustomController.prototype.onAddrEdit = function () {
            var oConfigModel = this.getView().getModel('oBpInfoConfig');
            oConfigModel.setProperty('/addrEditVisible', false);
            oConfigModel.setProperty('/addrSaveVisible', true);
            oConfigModel.setProperty('/addrEditable', true);
        };

        CustomController.prototype.onAddrSave = function () {
            var oConfigModel = this.getView().getModel('oBpInfoConfig');
            oConfigModel.setProperty('/addrEditVisible', true);
            oConfigModel.setProperty('/addrSaveVisible', false);
            oConfigModel.setProperty('/addrEditable', false);
        };

        CustomController.prototype.onPersonalInfoCancel = function () {
            var oConfigModel = this.getView().getModel('oBpInfoConfig'),
                bpPersonalModel = this.getView().getModel('oDataBpPersonal');
            oConfigModel.setProperty('/personalInfoEditVisible', true);
            oConfigModel.setProperty('/personalInfoSaveVisible', false);
            oConfigModel.setProperty('/personalInfoEditable', false);

            bpPersonalModel.setData(jQuery.extend(true, {}, this.oDataBpPersonalBak));
        };

        CustomController.prototype.onPersonalInfoEdit = function () {
            var oConfigModel = this.getView().getModel('oBpInfoConfig'),
                oBpPersonalInfoModel = this.getView().getModel('oDataBpPersonal');
            oConfigModel.setProperty('/personalInfoEditVisible', false);
            oConfigModel.setProperty('/personalInfoSaveVisible', true);

            if (oBpPersonalInfoModel.SSN === '') {
                oConfigModel.setProperty('/personalInfoSSEditable', true);
            }

            if (oBpPersonalInfoModel.DL === '') {
                oConfigModel.setProperty('/personalInfoDLEditable', true);
            }
        };

        CustomController.prototype.onPersonalInfoSave = function () {
            var oConfigModel = this.getView().getModel('oBpInfoConfig');
            oConfigModel.setProperty('/personalInfoEditVisible', true);
            oConfigModel.setProperty('/personalInfoSaveVisible', false);
            oConfigModel.setProperty('/personalInfoEditable', false);
        };

        CustomController.prototype.onContactInfoCancel = function () {
            var oConfigModel = this.getView().getModel('oBpInfoConfig'),
                bpContactModel = this.getView().getModel('oDataBpContact');
            oConfigModel.setProperty('/contactInfoEditVisible', true);
            oConfigModel.setProperty('/contactInfoSaveVisible', false);
            oConfigModel.setProperty('/contactInfoEditable', false);

            bpContactModel.setData(jQuery.extend(true, {}, this.oDataBpContactBak));
        };

        CustomController.prototype.onContactInfoEdit = function () {
            var oConfigModel = this.getView().getModel('oBpInfoConfig');
            oConfigModel.setProperty('/contactInfoEditVisible', false);
            oConfigModel.setProperty('/contactInfoSaveVisible', true);
            oConfigModel.setProperty('/contactInfoEditable', true);
        };

        CustomController.prototype.onContactInfoSave = function () {
            var oConfigModel = this.getView().getModel('oBpInfoConfig');
            oConfigModel.setProperty('/contactInfoEditVisible', true);
            oConfigModel.setProperty('/contactInfoSaveVisible', false);
            oConfigModel.setProperty('/contactInfoEditable', false);
        };

        CustomController.prototype.onMarketPrefCancel = function () {
            var oConfigModel = this.getView().getModel('oBpInfoConfig'),
                bpMarkPrefModel = this.getView().getModel('oDataBpMarkPreferSet');
            oConfigModel.setProperty('/marketPrefEditVisible', true);
            oConfigModel.setProperty('/marketPrefSaveVisible', false);
            oConfigModel.setProperty('/mktPrfEditable', false);

            bpMarkPrefModel.setData(jQuery.extend(true, {}, this.oDataBpMarkPreferSetBak));
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
            sPath = '/Partners' + '(\'' + aSplitHash[iSplitHashL - 1] + '\')';

            this._retrAllData(sPath);
        };

        Controller.prototype._retrAllData = function (sPath) {
            var oModel = this.getView().getModel('oODataSvc'),
                oParameters;

            oParameters = {
                /*urlParameters: {"$expand": "Buags"},*/
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oDataBP').setData(oData);
                        if (oData.PartnerID) {
                            this._retrBpTitle(oData.PartnerID);
                            this._retrBpAddress(oData.PartnerID);
                            this._retrBpPersonal(oData.PartnerID);
                            this._retrBpContact(oData.PartnerID);
                            this._retrBpMarkPrefSet(oData.PartnerID);
                        }
                    }
                }.bind(this),
                error: function (oError) {
                    var t = 1.0;
                    //Need to put error message
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        Controller.prototype._retrBpTitle = function (sBpNum) {
            var oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters;

            sPath = '/Partners' + '(\'' + sBpNum + '\')/BpName/';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        if (oData.PartnerID) {
                            this.getView().getModel('oDataBpTitle').setData(oData);
                            this.oDataBpTitleBak = jQuery.extend(true, {}, oData);
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

        Controller.prototype._retrBpAddress = function (sBpNum) {
            var oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters;

            sPath = '/Partners' + '(\'' + sBpNum + '\')/BpAddress/';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        if (oData.results[0]) {
                            this.getView().getModel('oDataBpAddress').setData(oData.results[0].AddressInfo);
                            this.oDataBpAddressBak = jQuery.extend(true, {}, oData.results[0].AddressInfo);
                        }
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        Controller.prototype._retrBpPersonal = function (sBpNum) {
            var oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters;

            sPath = '/Partners' + '(\'' + sBpNum + '\')/BpPersonal/';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        if (oData.PartnerID) {
                            this.getView().getModel('oDataBpPersonal').setData(oData);
                            this.oDataBpPersonalBak = jQuery.extend(true, {}, oData);
                        }
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        Controller.prototype._retrBpContact = function (sBpNum) {
            var oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters;

            sPath = '/Partners' + '(\'' + sBpNum + '\')/BpContact/';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        if (oData.PartnerID) {
                            this.getView().getModel('oDataBpContact').setData(oData);
                            this.oDataBpContactBak = jQuery.extend(true, {}, oData);
                        }
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        Controller.prototype._retrBpMarkPrefSet = function (sBpNum) {
            var oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters;

            sPath = '/Partners' + '(\'' + sBpNum + '\')/BpMarkPreferSet/';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        if (oData.results) {
                            this.getView().getModel('oDataBpMarkPreferSet').setData(oData);
                            this.oDataBpMarkPreferSetBak = jQuery.extend(true, {}, oData);
                        }
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        Controller.prototype.onYesSelected = function (oEvent) {
            var sPath, index, oMarkPrefModel, data;
            sPath = oEvent.getSource().oPropagatedProperties.oBindingContexts.oDataBpMarkPreferSet.sPath;
            index = parseInt(sPath.split('/')[2], 10);
            oMarkPrefModel = this.getView().getModel('oDataBpMarkPreferSet');
            data = oMarkPrefModel.getData();
            if (data.results[index].Value === 'Y') {
                data.results[index].Value = '';
            } else {
                data.results[index].Value = 'Y';
            }
            oMarkPrefModel.setData(data);
        };

        Controller.prototype.onNoSelected = function (oEvent) {
            var sPath, index, oMarkPrefModel, data;
            sPath = oEvent.getSource().oPropagatedProperties.oBindingContexts.oDataBpMarkPreferSet.sPath;
            index = parseInt(sPath.split('/')[2], 10);
            oMarkPrefModel = this.getView().getModel('oDataBpMarkPreferSet');
            data = oMarkPrefModel.getData();
            if (data.results[index].Value === 'N') {
                data.results[index].Value = '';
            } else {
                data.results[index].Value = 'N';
            }
            oMarkPrefModel.setData(data);
        };

        Controller.prototype._formatDate = function (dob) {
            if (dob) {
                var oDateFormat = DateFormat.getInstance({pattern: "MM/dd/yyyy"});
                return oDateFormat.format(dob);
            }
        };

        Controller.prototype._formatBooleanY = function (bPref) {
            if (bPref === 'Y') {
                return true;
            } else {
                return false;
            }

        };

        Controller.prototype._formatBooleanN = function (bPref) {
            if (bPref === 'N') {
                return true;
            } else {
                return false;
            }

        };

        Controller.prototype._formatVrfyMark = function (sIndicator) {
            if (sIndicator === 'x' || sIndicator === 'X') {
                return true;
            } else {
                return false;
            }
        };

        Controller.prototype._formatVrfyMarkRedX = function (sIndicator, sDLSSN) {
            if (sDLSSN) {
                if (sIndicator === 'x' || sIndicator === 'X') {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        };


        return CustomController;
    }
);
