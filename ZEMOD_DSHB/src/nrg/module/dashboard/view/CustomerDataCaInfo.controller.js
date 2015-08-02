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

            this.getView().setModel(this.getOwnerComponent().getModel('comp-dashboard'), 'oODataSvc');

            //Model to track page edit/save status
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oCaInfoConfig');

            //Model to hold BuagAddrDetail
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDataBuagAddrDetails');

            //Model to hold CA accounts and mailing address short form
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDataCAs');

            //Model to hold all Buags
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oAllBuags');


            this._initCaInfoConfigModel();
            this._initDataModel();
        };

        CustomController.prototype.onBeforeRendering = function () {

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
            configModel.setProperty('/tempAddrEditable', false);

            configModel.setProperty('/bAllBuagSelected', false);
        };

        CustomController.prototype._initDataModel = function () {
            var sPath, aSplitHash, iSplitHashL;

            aSplitHash = (this._retrUrlHash()).split('/');
            iSplitHashL = aSplitHash.length;
            if (!this._bpNum) {
                this._bpNum = aSplitHash[iSplitHashL - 3];
            }
            if (!this._caNum) {
                this._caNum = aSplitHash[iSplitHashL - 1];
            }


            this._retrAllBuags(this._bpNum);
            this._retrBuagAddrDetail(this._caNum);
        };

        Controller.prototype._retrAllBuags = function (sBpNum) {
            var oModel = this.getView().getModel('oODataSvc'),
                oCaModel = this.getView().getModel('oAllBuags'),
                sPath,
                oParameters,
                sCurrentCa = this._caNum;

            sPath = '/Partners' + '(\'' + sBpNum + '\')/Buags/';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        oCaModel.setData(oData.results);
                        oCaModel.setProperty('/selectedKey', sCurrentCa);
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

        CustomController.prototype._retrBuagAddrDetail = function (caNum) {
            var oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters;

            sPath = '/Buags(ContractAccountID=' + '\'' + caNum + '\')/BuagAddrDetail/';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        if (oData.results.length !== 0) {
                            if (!this._fixedAddrID) {
                                this._fixedAddrID = oData.results[0].FixedAddressID;
                            }
                            this.getView().getModel('oDataBuagAddrDetails').setData(oData);
                            this.oDataBuagAddrDetailsBak = jQuery.extend(true, {}, oData);
                            //this._buildUpCas(this.oDataBuagAddrDetailsBak, caNum);
                        }
                    }
                }.bind(this),
                error: function (oError) {
                    sap.ui.commons.MessageBox.alert("Error loading /Buags{caNum}/BuagAddrDetail");
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        CustomController.prototype._onCaSelected = function (oEvent) {
            var sSelectedKey = oEvent.getParameters().selectedKey;

            if (sSelectedKey) {
                this._caNum = sSelectedKey;
                this._retrBuagAddrDetail(this._caNum);
            }

            return;
        };

        CustomController.prototype._onAllBuagsSelected = function (oEvent) {
            //var bAllBuagsSelected = oEvent.mParameters.checked;

            //this.getView().getModel('oCaInfoConfig').setProperty('/bAllBuagSelected', bAllBuagsSelected);
        };

        Controller.prototype._formatDate = function (dob) {
            if (dob) {
                var oDateFormat = DateFormat.getInstance({pattern: "MM/dd/yyyy"});
                return oDateFormat.format(dob);
            }
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
                addrModel = this.getView().getModel('oDataBuagAddrDetails');
            configModel.setProperty('/mailAddrUpdateVisible', false);
            configModel.setProperty('/mailAddrAddnewVisible', false);
            configModel.setProperty('/mailAddrSaveVisible', true);
            configModel.setProperty('/mailAddrEditable', true);

            addrModel.setProperty('/results/0/MailingAddress/Street', '');
            addrModel.setProperty('/results/0/MailingAddress/HouseNo', '');
            addrModel.setProperty('/results/0/MailingAddress/UnitNo', '');
            addrModel.setProperty('/results/0/MailingAddress/City', '');
            addrModel.setProperty('/results/0/MailingAddress/State', '');
            addrModel.setProperty('/results/0/MailingAddress/ZipCode', '');
            addrModel.setProperty('/results/0/MailingAddress/ValidFrom', '');
            addrModel.setProperty('/results/0/MailingAddress/ValidTo', '');
        };

        CustomController.prototype.onMailAddrCancel = function () {
            var configModel = this.getView().getModel('oCaInfoConfig'),
                addrModel = this.getView().getModel('oDataBuagAddrDetails');
            configModel.setProperty('/mailAddrUpdateVisible', true);
            configModel.setProperty('/mailAddrAddnewVisible', true);
            configModel.setProperty('/mailAddrSaveVisible', false);
            configModel.setProperty('/mailAddrEditable', false);

            addrModel.setData(jQuery.extend(true, {}, this.oDataBuagAddrDetailsBak));
        };

        CustomController.prototype.onMailAddrSave = function () {
            var configModel = this.getView().getModel('oCaInfoConfig'),
                oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters;

            configModel.setProperty('/mailAddrUpdateVisible', true);
            configModel.setProperty('/mailAddrAddnewVisible', true);
            configModel.setProperty('/mailAddrSaveVisible', false);
            configModel.setProperty('/mailAddrEditable', false);

            if (JSON.stringify(this.getView().getModel('oDataBuagAddrDetails').oData.results[0].MailingAddress) === JSON.stringify(this.oDataBuagAddrDetailsBak.results[0].MailingAddress)) {
                sap.ui.commons.MessageBox.alert("There is no change for Mailing Address.");
                return;
            }

            sPath = '/BuagAddrDetails(PartnerID=\'' + this._bpNum + '\',ContractAccountID=\'' + this._caNum + '\',FixedAddressID=\'' + this._fixedAddrID + '\')/';
            oParameters = {
                merge: false,
                success : function (oData) {
                    sap.ui.commons.MessageBox.alert("Mailing Address Update Success");
                    this.oDataBuagAddrDetailsBak = jQuery.extend(true, {}, this.getView().getModel('oDataBuagAddrDetails').getData());
                }.bind(this),
                error: function (oError) {
                    sap.ui.commons.MessageBox.alert("Mailing Address Update Failed");
                    this.getView().getModel('oDataBuagAddrDetails').setData(jQuery.extend(true, {}, this.oDataBuagAddrDetailsBak));
                }.bind(this)
            };

            if (oModel) {
                oModel.update(sPath, this.getView().getModel('oDataBuagAddrDetails').oData.results[0], oParameters);
            }
        };

        CustomController.prototype.onTempAddrUpdate = function () {
            var configModel = this.getView().getModel('oCaInfoConfig');
            configModel.setProperty('/tempAddrAddnewVisible', false);
            configModel.setProperty('/tempAddrSaveVisible', true);
            configModel.setProperty('/tempAddrEditable', true);
        };

        CustomController.prototype.onTempAddrCancel = function () {
            var configModel = this.getView().getModel('oCaInfoConfig'),
                addrModel = this.getView().getModel('oDataBuagAddrDetails');
            configModel.setProperty('/tempAddrAddnewVisible', true);
            configModel.setProperty('/tempAddrSaveVisible', false);
            configModel.setProperty('/tempAddrEditable', false);

            addrModel.setData(jQuery.extend(true, {}, this.oDataBuagAddrDetailsBak));
        };

        CustomController.prototype.onTempAddrSave = function () {
            var configModel = this.getView().getModel('oCaInfoConfig'),
                oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters;

            configModel.setProperty('/tempAddrAddnewVisible', true);
            configModel.setProperty('/tempAddrSaveVisible', false);
            configModel.setProperty('/tempAddrEditable', false);

            if (JSON.stringify(this.getView().getModel('oDataBuagAddrDetails').oData.results[0].TemporaryAddress) === JSON.stringify(this.oDataBuagAddrDetailsBak.results[0].TemporaryAddress)) {
                sap.ui.commons.MessageBox.alert("There is no change for Temporary Address.");
                return;
            }

            sPath = '/BuagAddrDetails(PartnerID=\'' + this._bpNum + '\',ContractAccountID=\'' + this._caNum + '\',FixedAddressID=\'' + this._fixedAddrID + '\')/';
            oParameters = {
                merge: false,
                success : function (oData) {
                    sap.ui.commons.MessageBox.alert("Temporary Address Update Success");
                    this.oDataBuagAddrDetailsBak = jQuery.extend(true, {}, this.getView().getModel('oDataBuagAddrDetails').getData());
                }.bind(this),
                error: function (oError) {
                    sap.ui.commons.MessageBox.alert("Temporary Address Update Failed");
                    this.getView().getModel('oDataBuagAddrDetails').setData(jQuery.extend(true, {}, this.oDataBuagAddrDetailsBak));
                }.bind(this)
            };

            if (oModel) {
                oModel.update(sPath, this.getView().getModel('oDataBuagAddrDetails').oData.results[0], oParameters);
            }
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

        /*
        CustomController.prototype._buildUpCas = function (oData, caNum) {
            var oModel = this.getView().getModel('oDataCAs'),
                caArr = [],
                i,
                o;
            for (i = 0; i < oData.results.length; i = i + 1) {
                //var o = {};
                o = {};
                o.key = i;
                o.value = oData.results[i].ContractAccountID;
                caArr.push(o);
            }

            oModel.setProperty('/selectedKey', i);
            oModel.setProperty('/dropdown', caArr);
        };*/

         /*
        CustomController.prototype._initRetrAllData = function (caNum) {
            var oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters;

            sPath = '/Buags(ContractAccountID=' + '\'' + caNum + '\')/BuagAddrDetail/';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        if (oData.results.length !== 0) {
                            if (!this._fixedAddrID) {
                                this._fixedAddrID = oData.results[0].FixedAddressID;
                            }
                            this.getView().getModel('oDataBuagAddrDetails').setData(oData);
                            this.oDataBuagAddrDetailsBak = jQuery.extend(true, {}, oData);
                            //this._buildUpCas(this.oDataBuagAddrDetailsBak, caNum);
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

        CustomController.prototype.onCaSelected = function (oEvent) {
            var sSelectedKey = oEvent.getParameters().selectedKey,
                iSelectedIndex;

            if (sSelectedKey) {
                iSelectedIndex = parseInt(sSelectedKey, 10);
                this._caNum = this.getView().getModel('oDataCAs').oData[iSelectedIndex];
                this._initRetrAllData(this._caNum); //switch content to new CA selected
            }
        };

        */

        return CustomController;
    }
);
