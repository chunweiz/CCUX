/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'nrg/base/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'sap/ui/core/routing/HashChanger',
        'sap/ui/core/format/DateFormat',
        'sap/ui/core/message/Message',
        'sap/ui/core/message/ControlMessageProcessor',
        'nrg/base/type/CellPhoneNumber',
        'nrg/base/type/EmailAddress',
        'nrg/base/type/SocialSecurityNumber',
        'nrg/base/type/DrivingLicenseNumber',
        'nrg/base/type/ZipCode'
    ],

    function (jQuery, Controller, Filter, FilterOperator, HashChanger, DateFormat, CoreMessage, CoreControlMessageProcessor) {
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

            this.getView().attachParseError(function (oEvent) {
                this._addMessage(oEvent, 'attachParseError: ' + oEvent.getParameter('message'), sap.ui.core.MessageType.Error);
            }.bind(this));

            this.getView().attachFormatError(function (oEvent) {
                this._addMessage(oEvent, 'attachFormatError: ' + oEvent.getParameter('message'), sap.ui.core.MessageType.Error);
            }.bind(this));

            this.getView().attachValidationError(function (oEvent) {
                this._addMessage(oEvent, 'attachValidationError: ' + oEvent.getParameter('message'), sap.ui.core.MessageType.Error);
            }.bind(this));

            this.getView().attachValidationSuccess(function (oEvent) {
                var oMessageManager, aMessage;

                oMessageManager = sap.ui.getCore().getMessageManager();
                aMessage = oMessageManager.getMessageModel().getData();
                if (aMessage && !$.isEmptyObject(aMessage)) {
                    aMessage.forEach(function (oMessage) {
                        if (oMessage.target === [oEvent.getParameter('id'), oEvent.getParameter('property')].join('/')) {
                            oMessageManager.removeMessages(oMessage);
                        }
                    }.bind(this));
                }
            });
        };

        CustomController.prototype.onBeforeRendering = function () {
            this._initBpInfoConfigModel();

            this._initDataModel();
        };

        CustomController.prototype.onAfterRendering = function () {

        };

        CustomController.prototype.onExit = function () {

        };

        CustomController.prototype._getMessageProcessor = function () {
            if (!this._oControlMessageProcessor) {
                this._oControlMessageProcessor = new CoreControlMessageProcessor();
            }

            return this._oControlMessageProcessor;
        };

        CustomController.prototype._addMessage = function (oEvent, sMsg, sType) {
            var oMsg = new CoreMessage({
                message: sMsg,
                type: sType,
                target: [oEvent.getParameter('id'), oEvent.getParameter('property')].join('/'),
                processor: this._getMessageProcessor()
            });

            sap.ui.getCore().getMessageManager().addMessages(oMsg);
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

        CustomController.prototype.onBackToDashboard = function () {
            var oRouter = this.getOwnerComponent().getRouter(),
                bp = this.getView().getModel('oDataBP').getProperty('/PartnerID');

            oRouter.navTo('dashboard.Bp', {bpNum: bp});
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
            var oConfigModel = this.getView().getModel('oBpInfoConfig'),
                oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters,
                bpNumber = this.getView().getModel('oDataBpTitle').getProperty('/PartnerID');

            oConfigModel.setProperty('/titleEditVisible', true);
            oConfigModel.setProperty('/titleSaveVisible', false);
            oConfigModel.setProperty('/titleEditable', false);

            if (JSON.stringify(this.getView().getModel('oDataBpTitle').oData) === JSON.stringify(this.oDataBpTitleBak)) {
                sap.ui.commons.MessageBox.alert("There is no change for Title/Name.");
                return;
            }

            sPath = '/BpNames' + '(\'' + bpNumber + '\')';
            oParameters = {
                urlParameters: {},
                success : function (oData) {
                    sap.ui.commons.MessageBox.alert("Title/Name Update Success");
                    this._retrBpTitle(bpNumber);
                }.bind(this),
                error: function (oError) {
                    sap.ui.commons.MessageBox.alert("Title/Name Update Failed");
                }.bind(this)
            };

            if (oModel) {
                oModel.update(sPath, this.getView().getModel('oDataBpTitle').oData, oParameters);
            }
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
            var oConfigModel = this.getView().getModel('oBpInfoConfig'),
                oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters,
                bpNumber = this.getView().getModel('oDataBpAddress').getProperty('/results/0/PartnerID'),
                addressId = this.getView().getModel('oDataBpAddress').getProperty('/results/0/AddressID');

            oConfigModel.setProperty('/addrEditVisible', true);
            oConfigModel.setProperty('/addrSaveVisible', false);
            oConfigModel.setProperty('/addrEditable', false);

            if (JSON.stringify(this.getView().getModel('oDataBpAddress').oData.results[0]) === JSON.stringify(this.oDataBpAddressBak.results[0])) {
                sap.ui.commons.MessageBox.alert("There is no change for Address.");
                return;
            }

            sPath = '/BpAddresses' + '(PartnerID=\'' + bpNumber + '\',AddressID=\'' + addressId + '\')';
            oParameters = {
                urlParameters: {},
                success : function (oData) {
                    sap.ui.commons.MessageBox.alert("Address Update Success");
                    this._retrBpAddress(bpNumber);
                }.bind(this),
                error: function (oError) {
                    sap.ui.commons.MessageBox.alert("Address Update Failed");
                }.bind(this)
            };

            if (oModel) {
                oModel.update(sPath, this.getView().getModel('oDataBpAddress').oData.results[0], oParameters);
            }
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
            var oConfigModel = this.getView().getModel('oBpInfoConfig'),
                oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters,
                bpNumber = this.getView().getModel('oDataBpPersonal').getProperty('/PartnerID');

            oConfigModel.setProperty('/personalInfoEditVisible', true);
            oConfigModel.setProperty('/personalInfoSaveVisible', false);
            oConfigModel.setProperty('/personalInfoEditable', false);

            if (JSON.stringify(this.getView().getModel('oDataBpPersonal').oData) === JSON.stringify(this.oDataBpPersonalBak)) {
                sap.ui.commons.MessageBox.alert("There is no change for Personal Info.");
                return;
            }

            sPath = '/BpPersonals' + '(\'' + bpNumber + '\')';
            oParameters = {
                urlParameters: {},
                success : function (oData) {
                    sap.ui.commons.MessageBox.alert("Personal Info Update Success");
                    this._retrBpPersonal(bpNumber);
                }.bind(this),
                error: function (oError) {
                    sap.ui.commons.MessageBox.alert("Personal Info Update Failed");
                }.bind(this)
            };

            if (oModel) {
                oModel.update(sPath, this.getView().getModel('oDataBpPersonal').oData, oParameters);
            }
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
            var oConfigModel = this.getView().getModel('oBpInfoConfig'),
                oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters,
                bpNumber = this.getView().getModel('oDataBpContact').getProperty('/PartnerID');

            oConfigModel.setProperty('/contactInfoEditVisible', true);
            oConfigModel.setProperty('/contactInfoSaveVisible', false);
            oConfigModel.setProperty('/contactInfoEditable', false);

            if (JSON.stringify(this.getView().getModel('oDataBpContact').oData) === JSON.stringify(this.oDataBpContactBak)) {
                sap.ui.commons.MessageBox.alert("There is no change for Contact Info.");
                return;
            }

            sPath = '/BpContacts' + '(\'' + bpNumber + '\')';
            oParameters = {
                urlParameters: {},
                success : function (oData) {
                    sap.ui.commons.MessageBox.alert("Contact Info Update Success");
                    this._retrBpContact(bpNumber);
                }.bind(this),
                error: function (oError) {
                    sap.ui.commons.MessageBox.alert("Contact Info Update Failed");
                }.bind(this)
            };

            if (oModel) {
                oModel.update(sPath, this.getView().getModel('oDataBpContact').oData, oParameters);
            }
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
            var oConfigModel = this.getView().getModel('oBpInfoConfig');
            oConfigModel.setProperty('/marketPrefEditVisible', false);
            oConfigModel.setProperty('/marketPrefSaveVisible', true);
            oConfigModel.setProperty('/mktPrfEditable', true);
        };

        CustomController.prototype.onMarketPrefSave = function () {
            var oConfigModel = this.getView().getModel('oBpInfoConfig'),
                oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters,
                bpNumber = this.getView().getModel('oDataBpMarkPreferSet').getProperty('/results/0/PartnerID'),
                attibuteSet,
                attribute,
                i;

            oConfigModel.setProperty('/marketPrefEditVisible', true);
            oConfigModel.setProperty('/marketPrefSaveVisible', false);
            oConfigModel.setProperty('/mktPrfEditable', false);

            oParameters = {
                urlParameters: {},
                success : function (oData) {
                    sap.ui.commons.MessageBox.alert("Market Preference Update Success");
                    this._retrBpMarkPrefSet(bpNumber);
                }.bind(this),
                error: function (oError) {
                    sap.ui.commons.MessageBox.alert("Market Preference Update Failed");
                }.bind(this)
            };
            for (i = 0; i < this.getView().getModel('oDataBpMarkPreferSet').oData.results.length; i = i + 1) {
                if (JSON.stringify(this.getView().getModel('oDataBpMarkPreferSet').oData.results[i]) === JSON.stringify(this.oDataBpMarkPreferSetBak.results[i])) {
                    sap.ui.commons.MessageBox.alert("There is no change for Market Perference index: " + i.toString());
                } else {
                    attibuteSet = this.getView().getModel('oDataBpMarkPreferSet').getProperty('/results/' + i.toString() + '/AttributeSet');
                    attribute = this.getView().getModel('oDataBpMarkPreferSet').getProperty('/results/' + i.toString() + '/Attribute');

                    sPath = '/BpMarkPrefers' + '(PartnerID=\'' + bpNumber + '\',AttributeSet=\'' + attibuteSet + '\',Attribute=\'' + attribute + '\')';

                    if (oModel) {
                        oModel.update(sPath, this.getView().getModel('oDataBpMarkPreferSet').oData.results[i], oParameters);
                    }
                }
            }
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
                this._bpNum = aSplitHash[iSplitHashL - 1];
            }

            this._retrAllData(this._bpNum);
        };

        Controller.prototype._retrAllData = function (bpNum) {
            this._retrBpTitle(bpNum);
            this._retrBpAddress(bpNum);
            this._retrBpPersonal(bpNum);
            this._retrBpContact(bpNum);
            this._retrBpMarkPrefSet(bpNum);
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
                            this.getView().getModel('oDataBpAddress').setData(oData);
                            this.oDataBpAddressBak = jQuery.extend(true, {}, oData);
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
