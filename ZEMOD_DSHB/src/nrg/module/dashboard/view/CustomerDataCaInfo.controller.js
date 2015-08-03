/*globals sap*/
/*globals ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'jquery.sap.global',
        'nrg/base/view/BaseController',
        'sap/ui/model/json/JSONModel',
        'sap/ui/core/routing/HashChanger',
        'sap/ui/core/format/DateFormat'
    ],

    function (Filter, FilterOperator, jQuery, Controller, JSONModel, HashChanger, DateFormat) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.dashboard.view.CustomerDataCaInfo');

        Controller.prototype.onBeforeRendering = function () {
            var oModel;

            this.getOwnerComponent().getCcuxApp().setTitle('BUSINESS PARTNER');

            this.getView().setModel(this.getOwnerComponent().getModel('comp-dashboard'), 'oODataSvc');

            //Model to track page edit/save status
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oCaInfoConfig');

            //Model to hold BuagAddrDetail
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDataBuagAddrDetails');

            //Model to hold CA accounts and mailing address short form
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDataCAs');

            //Model to hold all Buags
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oAllBuags');

            //Model for Edit Popup Screen (Use the model to show on edit screen)
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDtaAddrEdit');


            this._initCaInfoConfigModel();
            this._initDataModel();
            this._initMailAddrModels();
        };

        CustomController.prototype.onAfterRendering = function () {

        };

        CustomController.prototype.onExit = function () {

        };

        CustomController.prototype._initCaInfoConfigModel = function () {
            var configModel = this.getView().getModel('oCaInfoConfig');
            configModel.setProperty('/mailAddrUpdateVisible', true);
            configModel.setProperty('/mailAddrAddnewVisible', false);
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
                oParameters,
                configModel = this.getView().getModel('oCaInfoConfig');

            sPath = '/Buags(ContractAccountID=' + '\'' + caNum + '\')/BuagAddrDetail/';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        if (oData.results.length !== 0) {
                            if (!this._fixedAddrID) {
                                this._fixedAddrID = oData.results[0].FixedAddressID;
                            }
                            this.getView().getModel('oDataBuagAddrDetails').setData(oData.results[0]);
                            this.oDataBuagAddrDetailsBak = jQuery.extend(true, {}, oData);
                        } else {
                            configModel.setProperty('/mailAddrUpdateVisible', false);
                            configModel.setProperty('/mailAddrAddnewVisible', true);
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

        /********************************************************************************/
        /**Edit Mailing Addr functions*/
        Controller.prototype._handleEditMailPopupClose = function (oEvent) {
            var oLeftInputArea = this.getContent()[0].getContent()[1].getContent(),
                oRightSuggArea = this.getContent()[0].getContent()[2].getContent(),
                i;


            this.getContent()[0].removeStyleClass('nrgDashboard-cusDataVerifyEditMail-vl');
            this.getContent()[0].getContent()[0].setVisible(false);
            this.getContent()[0].getContent()[1].removeStyleClass('nrgDashboard-cusDataVerifyEditMail-l-vl');
            this.getContent()[0].getContent()[2].setVisible(false);


            for (i = 1; i < 8; i = i + 1) {
                oLeftInputArea[i].getContent()[0].removeStyleClass('nrgDashboard-cusDataVerifyEditMail-lHighlight');
                oRightSuggArea[i].getContent()[0].removeStyleClass('nrgDashboard-cusDataVerifyEditMail-rHighlight');
            }
        };

        Controller.prototype._handleMailingAcceptBtn = function (oEvent) {
            var oMailEdit = this.getView().getModel('oDtaAddrEdit'),
                oMailTempModel = this.getView().getModel('oDataBuagAddrDetails'),
                tempObj,
                key;

            tempObj = oMailEdit.getProperty('/SuggAddrInfo');
            delete tempObj.HeaderText1;
            delete tempObj.HeaderText2;
            delete tempObj.FooterLine1;
            delete tempObj.FooterLine2;
            delete tempObj.FooterLine3;

            if (oMailEdit.getProperty('/bFixAddr')) {
                oMailTempModel.setProperty('/FixUpd', 'X');
                for (key in tempObj) {
                    if (tempObj.hasOwnProperty(key)) {
                        if (!(key === '__metadata' || key === 'StandardFlag' || key === 'Supplement')) {
                            oMailTempModel.setProperty('/FixAddrInfo/' + key, tempObj[key]);
                        }
                    }
                }
            } else {
                oMailTempModel.setProperty('/TempUpd', 'X');
                for (key in tempObj) {
                    if (tempObj.hasOwnProperty(key)) {
                        if (!(key === '__metadata' || key === 'StandardFlag' || key === 'Supplement')) {
                            oMailTempModel.setProperty('/TempAddrInfo/' + key, tempObj[key]);
                        }
                    }
                }
            }

            this._updateMailingAddr();
        };

        Controller.prototype._handleMailingDeclineBtn = function (oEvent) {
            var oMailEdit = this.getView().getModel('oDtaAddrEdit'),
                oMailTempModel = this.getView().getModel('oDataBuagAddrDetails'),
                tempObj;

            tempObj = oMailEdit.getProperty('/AddrInfo');

            if (oMailEdit.getProperty('/bFixAddr')) {
                oMailTempModel.setProperty('/FixAddrInfo', tempObj);
                oMailTempModel.setProperty('/FixUpd', 'X');
            } else {
                oMailTempModel.setProperty('/TempAddrInfo', tempObj);
                oMailTempModel.setProperty('/TempUpd', 'X');
            }

            this._updateMailingAddr();
        };

        Controller.prototype._handleMailingEditBtn = function (oEvent) {
            var oEditMail = this.getView().getModel('oDtaAddrEdit');

            //oEditMail.setProperty('/updateSent', false);
            oEditMail.setProperty('/showVldBtns', false);
            oEditMail.setProperty('/updateNotSent', true);
        };

        Controller.prototype._showSuggestedAddr = function () {
            //Address validation error there was. Show system suggested address values we need to.
            this.getView().byId('idAddrUpdatePopup').addStyleClass('nrgDashboard-cusDataVerifyEditMail-vl');
            this.getView().byId('idAddrUpdatePopup-l').addStyleClass('nrgDashboard-cusDataVerifyEditMail-l-vl');
            this.getView().getModel('oDtaAddrEdit').setProperty('/updateSent', true);
            this.getView().getModel('oDtaAddrEdit').setProperty('/showVldBtns', true);
            this.getView().getModel('oDtaAddrEdit').setProperty('/updateNotSent', false);
        };

        Controller.prototype._updateMailingAddr = function () {
            var oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters,
                sBpNum = this.getView().getModel('oDataBuagAddrDetails').getProperty('/PartnerID'),
                sBuagNum = this.getView().getModel('oDataBuagAddrDetails').getProperty('/ContractAccountID'),
                sFixedAddressID = this.getView().getModel('oDataBuagAddrDetails').getProperty('/FixedAddressID');

            if (this.getView().getModel('oCaInfoConfig').getProperty('/bAllBuagSelected')) {
                this.getView().getModel('oDataBuagAddrDetails').setProperty('/SaveToAllCa', 'X');
            }

            sPath = '/BuagAddrDetails' + '(' + 'PartnerID=\'' + sBpNum + '\'' + ',ContractAccountID=\'' + sBuagNum + '\'' + ',FixedAddressID=\'' + sFixedAddressID + '\')';

            oParameters = {
                urlParameters: {},
                success : function (oData) {
                    sap.ui.commons.MessageBox.alert("Update Success");
                    this._retrBuag(this.getView().getModel('oDtaVrfyBuags').getProperty('/PartnerID'),  this.getView().getModel('oAllBuags').getProperty('/selectedKey'));
                    this._oMailEditPopup.close();
                }.bind(this),
                error: function (oError) {
                    sap.ui.commons.MessageBox.alert("Update Failed");
                }.bind(this)
            };

            if (oModel) {
                oModel.update(sPath, this.getView().getModel('oDataBuagAddrDetails').oData, oParameters);
            }
        };

        Controller.prototype._validateInputAddr = function () {
            //this._showSuggestedAddr();
            var oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters,
                aFilters = this._createAddrValidateFilters(),
                oMailEdit = this.getView().getModel('oDtaAddrEdit');

            sPath = '/BuagAddrDetails';

            oParameters = {
                filters: aFilters,
                success: function (oData) {
                    if (oData.results[0].AddrChkValid === 'X') {
                        //Validate success, update the address directly
                        this._updateMailingAddr();
                    } else {
                        oMailEdit.setProperty('/SuggAddrInfo', oData.results[0].TriCheck);
                        this._showSuggestedAddr();
                    }
                }.bind(this),
                error: function (oError) {
                    sap.ui.commons.MessageBox.alert('Validatation Call Failed');
                }.bind(this)
            };
//this._showSuggestedAddr();
            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        Controller.prototype._createAddrValidateFilters = function () {
            var aFilters = [],
                oFilterTemplate,
                sBpNum = this.getView().getModel('oDataBuagAddrDetails').getProperty('/PartnerID'),
                oMailEdit = this.getView().getModel('oDtaAddrEdit'),
                oMailEditAddrInfo = oMailEdit.getProperty('/AddrInfo'),
                key,
                bFixAddr = oMailEdit.getProperty('/bFixAddr'),
                tempPath;

            if (bFixAddr) {
                oFilterTemplate = new Filter({ path: 'FixUpd', operator: FilterOperator.EQ, value1: 'X'});
                aFilters.push(oFilterTemplate);
            } else {
                oFilterTemplate = new Filter({ path: 'TempUpd', operator: FilterOperator.EQ, value1: 'X'});
                aFilters.push(oFilterTemplate);
            }

            oFilterTemplate = new Filter({ path: 'PartnerID', operator: FilterOperator.EQ, value1: sBpNum});
            aFilters.push(oFilterTemplate);

            oFilterTemplate = new Filter({ path: 'ChkAddr', operator: FilterOperator.EQ, value1: 'X'});
            aFilters.push(oFilterTemplate);

            for (key in oMailEditAddrInfo) {
                if (oMailEditAddrInfo.hasOwnProperty(key)) {
                    if (!(key === '__metadata' || key === 'StandardFlag' || key === 'ShortForm' || key === 'ValidFrom' || key === 'ValidTo' || key === 'Supplement')) {
                        if (bFixAddr) {
                            tempPath = 'FixAddrInfo/' + key;
                            oFilterTemplate = new Filter({ path: tempPath, operator: FilterOperator.EQ, value1: oMailEditAddrInfo[key]});
                            aFilters.push(oFilterTemplate);
                        } else {
                            tempPath = 'TempAddrInfo/' + key;
                            oFilterTemplate = new Filter({ path: tempPath, operator: FilterOperator.EQ, value1: oMailEditAddrInfo[key]});
                            aFilters.push(oFilterTemplate);
                        }
                    }
                }
            }

            return aFilters;
        };

        Controller.prototype._initMailAddrModels = function () {
            /*this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDataBuagAddrDetails');
              this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDtaAddrEdit');*/
            var oEditMail = this.getView().getModel('oDtaAddrEdit');

            oEditMail.setProperty('/updateSent', false);
            oEditMail.setProperty('/showVldBtns', false);
            oEditMail.setProperty('/updateNotSent', true);
        };

        Controller.prototype._onPoBoxEdit = function (oEvent) {
            //this.getView().byId('idEditHouseNum').setEnabled(false);
            //this.getView().byId('idEditStName').setEnabled(false);
            this.getView().byId('idEditHouseNum').setValue('');
            this.getView().byId('idEditStName').setValue('');
        };

        Controller.prototype._onRegAddrEdit = function (oEvent) {
            this.getView().byId('idEditPoBox').setValue('');
        };

        Controller.prototype._onEditMailAddrClick = function (oEvent) {
            var oEditMail = this.getView().getModel('oDtaAddrEdit');

            oEditMail.setProperty('/AddrInfo', this.getView().getModel('oDataBuagAddrDetails').getProperty('/FixAddrInfo'));

            //Control what to or not to display
            this.getView().byId("idAddrUpdatePopup").setVisible(true);
            this.getView().getModel('oDtaAddrEdit').setProperty('/updateSent', false);
            this.getView().getModel('oDtaAddrEdit').setProperty('/showVldBtns', false);
            this.getView().getModel('oDtaAddrEdit').setProperty('/updateNotSent', true);
            this.getView().getModel('oDtaAddrEdit').setProperty('/bFixAddr', true);
            this.getView().byId('idEditMailAddr_UpdtBtn').setVisible(true);
            this.getView().byId('idSuggCompareCheck').setChecked(false);

            this._oMailEditPopup = ute.ui.main.Popup.create({
                close: this._handleEditMailPopupClose,
                content: this.getView().byId("idAddrUpdatePopup"),
                title: 'Edit Mailing Address'
            });
            this._oMailEditPopup.open();

            this._validateInputAddr();
        };

        Controller.prototype._onEditTempAddrClick = function (oEvent) {
            var oEditMail = this.getView().getModel('oDtaAddrEdit');

            oEditMail.setProperty('/AddrInfo', this.getView().getModel('oDataBuagAddrDetails').getProperty('/TempAddrInfo'));

            //this._onToggleButtonPress();
            this.getView().byId("idTempAddrUpdatePopup").setVisible(true);
            this.getView().getModel('oDtaAddrEdit').setProperty('/updateSent', false);
            this.getView().getModel('oDtaAddrEdit').setProperty('/showVldBtns', false);
            this.getView().getModel('oDtaAddrEdit').setProperty('/updateNotSent', true);
            this.getView().getModel('oDtaAddrEdit').setProperty('/bFixAddr', false);
            this.getView().byId('idEditMailAddr_UpdtBtn').setVisible(true);

            this._oMailEditPopup = ute.ui.main.Popup.create({
                close: this._handleEditMailPopupClose,
                content: this.getView().byId("idAddrUpdatePopup"),
                title: 'Edit Temporary Mailing Address'
            });
            this._oMailEditPopup.open();

            this._validateInputAddr();
        };


        Controller.prototype._compareSuggChkClicked = function (oEvent) {
            //this.getView().byId('idAddrUpdatePopup-l').getContent()[2].getContent()[0].getValue()
            var oLeftInputArea = this.getView().byId('idAddrUpdatePopup-l').getContent(),
                oRightSuggArea = this.getView().byId('idAddrUpdatePopup-r').getContent(),
                i;

            if (oEvent.mParameters.checked) {
                for (i = 1; i < 8; i = i + 1) {
                    if (oLeftInputArea[i].getContent()[0].getValue() !== oRightSuggArea[i].getContent()[0].getValue()) {
                        oLeftInputArea[i].getContent()[0].addStyleClass('nrgDashboard-cusDataVerifyEditMail-lHighlight');
                        oRightSuggArea[i].getContent()[0].addStyleClass('nrgDashboard-cusDataVerifyEditMail-rHighlight');
                    }
                }
            } else {
                for (i = 1; i < 8; i = i + 1) {
                    if (oLeftInputArea[i].getContent()[0].getValue() !== oRightSuggArea[i].getContent()[0].getValue()) {
                        oLeftInputArea[i].getContent()[0].removeStyleClass('nrgDashboard-cusDataVerifyEditMail-lHighlight');
                        oRightSuggArea[i].getContent()[0].removeStyleClass('nrgDashboard-cusDataVerifyEditMail-rHighlight');
                    }
                }
            }
        };

        Controller.prototype._onSMSButtonClicked = function (oEvent) {
            var oCurBpModel = this.getView().getModel('oDtaVrfyBP'),
                oCurCaModel = this.getView().getModel('oDtaVrfyBuags'),
                sSmsUrl = oCurBpModel.getProperty('/SMSUrl'),
                iCAstringIndex = sSmsUrl.indexOf('contractAccount=');


            sSmsUrl = sSmsUrl.substr(0, iCAstringIndex + 16) + oCurCaModel.getProperty('/ContractAccountID') + sSmsUrl.substr(iCAstringIndex + 16);
            window.open(sSmsUrl);
        };

        /********************************************************************************/

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

            addrModel.setProperty('/MailingAddress/Street', '');
            addrModel.setProperty('/MailingAddress/HouseNo', '');
            addrModel.setProperty('/MailingAddress/UnitNo', '');
            addrModel.setProperty('/MailingAddress/City', '');
            addrModel.setProperty('/MailingAddress/State', '');
            addrModel.setProperty('/MailingAddress/ZipCode', '');
            addrModel.setProperty('/MailingAddress/ValidFrom', '');
            addrModel.setProperty('/MailingAddress/ValidTo', '');
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
