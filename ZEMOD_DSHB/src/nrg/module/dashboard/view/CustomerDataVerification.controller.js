/*global sap*/
/*globals ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'sap/ui/core/routing/HashChanger'
    ],

    function (CoreController, Filter, FilterOperator, HashChanger) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.dashboard.view.CustomerDataVerification');

        Controller.prototype.onInit = function () {
            this.getView().setModel(this.getOwnerComponent().getModel('comp-dashboard'), 'oODataSvc');

            //Model to hold BP info
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDtaVrfyBP');

            //Model to hold Buags (avoid too long of bindings
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDtaVrfyBuags');

            //Model to hold Contract
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDtaVrfyContracts');

            //Model to hold all Buags
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oAllBuags');

            //Model to hold all Contracts of selected Buag
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oAllContractsofBuag');

            //Model to hold mailing/temp address
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDtaVrfyMailingTempAddr');
            //Model for Edit Popup Screen (Use the model to show on edit screen)
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDtaAddrEdit');

            //Model to track "Confirm" or not status
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oCfrmStatus');

            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oCoPageModel');

            //For Phone Type
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDayPhoneType');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oEvnPhoneType');

            //For EditEmail Popup
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oEditEmailNNP');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oEditEmailValidate');

            //Siebel Customer Indicator
            this.bSiebelCustomer = false;


            this._initDtaVrfRetr();
            this._initCfrmStatus();
            this._initPhnTypes();
            this._initMailAddrModels();
            //this._initCoPageModel();

        };

        Controller.prototype._initPhnTypes = function () {
            var oDayPhnType = this.getView().getModel('oDayPhoneType'),
                oEvnPhnType = this.getView().getModel('oEvnPhoneType'),
                oTypes = [],
                oEvnTypes = [];


            oTypes = [ {Key: "WORK", Type: "LANDLINE"}, {Key: "CELL", Type: "CELL"}];
            oEvnTypes = [ {Key: "HOME", Type: "LANDLINE"}, {Key: "CELL", Type: "CELL"}];

            oDayPhnType.setProperty('/', oTypes);
            oEvnPhnType.setProperty('/', oEvnTypes);
        };

        Controller.prototype._initCoPageModel = function () {
            var oModel = this.getView().getModel('oCoPageModel'),
                page = [],
                oTemp,
                i;

            for (i = 0; i < 3; i = i + 1) {
                oTemp = {exist: false, con_ind: 0, index: i};
                page.push(oTemp);
            }
            oModel.setProperty('/threeLarger', false);
            oModel.setProperty('/paging', page);
        };

        Controller.prototype._initCfrmStatus = function () {
            this.getView().getModel('oCfrmStatus').setProperty('/bEditable', true);
        };

        Controller.prototype._onBuagChange = function (iNewBuagIndex) {
            var eventBus = sap.ui.getCore().getEventBus(),
                oPayload = {iIndex: iNewBuagIndex};


            eventBus.publish("nrg.module.dashoard", "eBuagChanged", oPayload);
        };

        Controller.prototype._retrUrlHash = function () {
            //Get the hash to retrieve bp #
            var oHashChanger = new HashChanger(),
                sUrlHash = oHashChanger.getHash();

            return sUrlHash;
        };

        Controller.prototype._initDtaVrfRetr = function () {        //Only called once when entering the verification page
            var sPath, aSplitHash, iSplitHashL;

            aSplitHash = (this._retrUrlHash()).split('/');
            iSplitHashL = aSplitHash.length;
            sPath = '/Partners' + '(\'' + aSplitHash[iSplitHashL - 1] + '\')';

            this._retrDataVrf(sPath);

        };

        Controller.prototype._retrDataVrf = function (sPath) {
            var oModel = this.getView().getModel('oODataSvc'),
                oParameters;

            oParameters = {
                /*urlParameters: {"$expand": "Buags"},*/
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oDtaVrfyBP').setData(oData);
                        if (oData.PartnerID) {
                            this._retrBuag(oData.PartnerID);
                        }
                        if (oData.SiebelCustomer === 'X' || oData.SiebelCustomer === 'x') {
                            this.bSiebelCustomer = true;
                            if (this.getView().getModel('oCfrmStatus').getProperty('/bEditable')) {
                                this.getView().getModel('oCfrmStatus').setProperty('/bEditable', false);
                            }
                            this.getView().byId('id_confmBtn').setVisible(false);
                            this.getView().byId('id_updtBtn').setVisible(false);

                            this._oSiebelAlertPopup = ute.ui.main.Popup.create({
                                content: this.getView().byId("idSiebelAccAlert"),
                                title: 'Siebel Contracted Account'
                            });
                            //this._onToggleButtonPress();
                            this.getView().byId("idSiebelAccAlert").setVisible(true);
                            this._oSiebelAlertPopup.open();
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

        Controller.prototype._retrBuag = function (sBpNum, iSelectedCA) {      //will be called whenever a different Buag is selected
            var oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters,
                i,
                iPreSelCA;

            if (iSelectedCA) {
                iPreSelCA = iSelectedCA;
            } else {
                iPreSelCA = 0;
            }


            sPath = '/Partners' + '(\'' + sBpNum + '\')/Buags/';
            oParameters = {
                success : function (oData) {
                    if (oData) {
                        if (oData.results[iPreSelCA]) {
                            //If there's first record of Buags, load as default to display
                            this.getView().getModel('oDtaVrfyBuags').setData(oData.results[iPreSelCA]);
                            this._retrContracts(oData.results[iPreSelCA].ContractAccountID);
                            this._retrBuagMailingAddr(sBpNum, oData.results[iPreSelCA].ContractAccountID, oData.results[iPreSelCA].FixedAddressID);
                        }
                        for (i = 0; i < oData.results.length; i = i + 1) {
                            oData.results[i].iIndex = i.toString();
                        }
                        this.getView().getModel('oAllBuags').setData(oData.results);
                        this.getView().getModel('oAllBuags').setProperty('/selectedKey', iPreSelCA);
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

        Controller.prototype._retrContracts = function (sBuagNum) {
            var oModel = this.getView().getModel('oODataSvc'),
                oPageModel = this.getView().getModel('oCoPageModel'),
                oPage,
                sPath,
                oParameters,
                i;

            sPath = '/Buags' + '(\'' + sBuagNum + '\')/Contracts/';
            oParameters = {
                success : function (oData) {
                    if (oData) {
                        if (oData.results[0]) {
                            //Again if there's first record of Contracts, load as default to display
                            this.getView().getModel('oDtaVrfyContracts').setData(oData.results[0]);
                            //oData.results.selectedKey = '0';
                        }

                        this._initCoPageModel();
                        oPage = oPageModel.getProperty('/paging');
                        for (i = 0; i < oData.results.length; i = i + 1) {
                            oData.results[i].iIndex = i.toString();
                            if (i < 3) {
                                oPage[i].exist = true;
                                oPage[i].co_ind = i + 1;
                                oPageModel.setProperty('/threeLarger', false);
                            } else {
                                oPageModel.setProperty('/threeLarger', true);
                            }
                        }
                        oPageModel.setProperty('/paging', oPage);
                        this.getView().getModel('oAllContractsofBuag').setData(oData.results);
                        this.getView().getModel('oAllContractsofBuag').setProperty('/selectedKey', '0');
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
        Controller.prototype._retrBuagMailingAddr = function (sBpNum, sBuagNum, sFixedAddressID) {
            var oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters,
                i;

            sPath = '/BuagMailingAddrs' + '(' + 'PartnerID=\'' + sBpNum + '\'' + ',ContractAccountID=\'' + sBuagNum + '\'' + ',FixedAddressID=\'' + sFixedAddressID + '\')';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oDtaVrfyMailingTempAddr').setData(oData);
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

        Controller.prototype._onContractSelect = function (oEvent) {
            var sSelectedKey = oEvent.getParameters().selectedKey,
                iSelectedIndex;

            if (sSelectedKey) {
                iSelectedIndex = parseInt(sSelectedKey, 10);
                this.getView().getModel('oDtaVrfyContracts').setData(this.getView().getModel('oAllContractsofBuag').oData[iSelectedIndex]);
                //delete this.getView().getModel('oDtaVrfyContracts').oData.iIndex;
                this._refreshPaging();
            }
        };

        Controller.prototype._onBuagSelect = function (oEvent) {
            var sSelectedKey = oEvent.getParameters().selectedKey,
                iSelectedIndex = parseInt(sSelectedKey, 10);

            //Trigger Buag Change event
            //this._onBuagChange(this.getView().getModel('oAllBuags').oData[iSelectedIndex].ContractAccountID);

            this.getView().getModel('oDtaVrfyBuags').setData(this.getView().getModel('oAllBuags').oData[iSelectedIndex]);
            //delete this.getView().getModel('oDtaVrfyContracts').oData.iIndex;

            //Trigger Buag Change event
            this._onBuagChange(iSelectedIndex);

            //Trigger contracts refresh
            this._retrContracts(this.getView().getModel('oDtaVrfyBuags').getProperty('/ContractAccountID'));
            this._retrBuagMailingAddr(this.getView().getModel('oDtaVrfyBuags').getProperty('/PartnerID'), this.getView().getModel('oDtaVrfyBuags').getProperty('/ContractAccountID'), this.getView().getModel('oDtaVrfyBuags').getProperty('/FixedAddressID'));
        };

        /*Controller.prototype._onBuagChange = function (oEvent) {
            var sNewSelectedBuagIndex;

            sNewSelectedBuagIndex = oEvent.getSource().getSelectedKey();
            this._retrBuag(sNewSelectedBuagIndex);
        };*/

        Controller.prototype._onToggleButtonPress = function (oEvent) {
            var l_selected = this.getView().byId('id_DshbTglBtn').getLeftSelected();
            if (this.getView().byId('mailadd_area').getVisible()) {
                this.getView().byId('mailadd_area').setVisible(false);
                this.getView().byId('serviceadd_area').setVisible(true);
                this.getView().byId('idContractDropdown').setVisible(true);
            } else {
                this.getView().byId('serviceadd_area').setVisible(false);
                this.getView().byId('mailadd_area').setVisible(true);
                this.getView().byId('idContractDropdown').setVisible(false);
            }

        };

        Controller.prototype._handleConfirm = function () {
            var oStatusModel = this.getView().getModel('oCfrmStatus'),
                oComponentContextModel = this.getOwnerComponent().getCcuxContextManager().getContext(),
                sCurrentCa = this.getView().getModel('oDtaVrfyBuags').getProperty('/ContractAccountID');

            //Set Confirmed CaNum to Component level
            oComponentContextModel.setProperty('/dashboard/caNum', sCurrentCa);

            this.getView().byId('id_confmBtn').setVisible(false);
            this.getView().byId('id_unConfmBtn').setVisible(true);
            this.getView().byId('id_updtBtn').setEnabled(false);

            //Set the 'Editable' for all input to false to prevent changing after "Confirmed"
            if (oStatusModel.getProperty('/bEditable')) {
                oStatusModel.setProperty('/bEditable', false);
            }
        };

        Controller.prototype._handleUnConfirm = function () {
            var oStatusModel = this.getView().getModel('oCfrmStatus');
            this.getView().byId('id_confmBtn').setVisible(true);
            this.getView().byId('id_unConfmBtn').setVisible(false);
            this.getView().byId('id_updtBtn').setEnabled(true);

            if (!oStatusModel.getProperty('/bEditable')) {
                oStatusModel.setProperty('/bEditable', true);
            }
        };

        Controller.prototype._handleUpdate = function () {
            var oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters;

            sPath = '/Partners' + '(\'' + this.getView().getModel('oDtaVrfyBP').getProperty('/PartnerID') + '\')';
            oParameters = {
                merge: false,
                success : function (oData) {
                    sap.ui.commons.MessageBox.alert("Update Success");
                    this._initDtaVrfRetr();
                }.bind(this),
                error: function (oError) {
                    sap.ui.commons.MessageBox.alert("Update Failed");
                }.bind(this)
            };

            if (oModel) {
                oModel.update(sPath, this.getView().getModel('oDtaVrfyBP').oData, oParameters);
            }


        };

        Controller.prototype._formatEmailMkt = function (sIndicator) {
            if (sIndicator === 'y' || sIndicator === 'Y') {
                return true;
            } else {
                return false;
            }
        };

        Controller.prototype._formatPositiveX = function (sIndicator) {
            if (sIndicator === 'x' || sIndicator === 'X') {
                return true;
            } else {
                return false;
            }
        };

        Controller.prototype._formatNegativeX = function (sIndicator) {
            if (sIndicator === 'x' || sIndicator === 'X') {
                return false;
            } else {
                return true;
            }
        };

        Controller.prototype._formatChecked = function (sIndicator) {
            if (sIndicator === 'x' || sIndicator === 'X') {
                return true;
            } else {
                return false;
            }
        };

        Controller.prototype._formatSMSBtn = function (sIndicator) {
            if (sIndicator === 'x' || sIndicator === 'X') {
                return false;
            } else {
                return true;
            }
        };

        Controller.prototype._formatDate = function (sDateString) {
            // 20120620
            var sYear,
                sMonth,
                sDay;

            if (sDateString) {
                sYear = sDateString.substring(0, 4);
                sMonth = sDateString.substring(4, 6);
                sDay = sDateString.substring(6, 8);
                return sMonth + '/' + sDay + '/' + sYear;
            } else {
                return " ";
            }
        };

        /********************************************************************************************/
        /*Contract Page Handlers*/
        Controller.prototype._onConFirst = function () {
            var oContracts = this.getView().getModel('oAllContractsofBuag'),
                iSelectedIndex = 0;

            this.getView().getModel('oDtaVrfyContracts').setData(this.getView().getModel('oAllContractsofBuag').oData[iSelectedIndex]);
            //delete this.getView().getModel('oDtaVrfyContracts').oData.iIndex;

            oContracts.setProperty('/selectedKey', iSelectedIndex.toString());
            this._refreshPaging();
        };
        Controller.prototype._onConLeft = function () {
            var oPage = this.getView().getModel('oCoPageModel').getProperty('/paging'),
                oContracts = this.getView().getModel('oAllContractsofBuag'),
                iSel_Ind = parseInt(oContracts.getProperty('/selectedKey'), 10) - 1;  //Selected is the new selected index

            if (iSel_Ind > -1) {
                this.getView().getModel('oDtaVrfyContracts').setData(oContracts.oData[iSel_Ind]);
                //delete this.getView().getModel('oDtaVrfyContracts').oData.iIndex;

                oContracts.setProperty('/selectedKey', iSel_Ind.toString());
                this._refreshPaging();
            } else {
                return; //do nothing if it's invalid
            }
        };
        Controller.prototype._onConPone = function () {
            var oPage = this.getView().getModel('oCoPageModel').getProperty('/paging'),
                oContracts = this.getView().getModel('oAllContractsofBuag'),
                iSelectedIndex = oPage[0].co_ind - 1;

            this.getView().getModel('oDtaVrfyContracts').setData(oContracts.oData[iSelectedIndex]);
            //delete this.getView().getModel('oDtaVrfyContracts').oData.iIndex;

            oContracts.setProperty('/selectedKey', iSelectedIndex.toString());
            this._refreshPaging();
        };
        Controller.prototype._onConPtwo = function () {
            var oPage = this.getView().getModel('oCoPageModel').getProperty('/paging'),
                oContracts = this.getView().getModel('oAllContractsofBuag'),
                iSelectedIndex = oPage[1].co_ind - 1,
                i;

            this.getView().getModel('oDtaVrfyContracts').setData(oContracts.oData[iSelectedIndex]);
            //delete this.getView().getModel('oDtaVrfyContracts').oData.iIndex;

            oContracts.setProperty('/selectedKey', iSelectedIndex.toString());
            this._refreshPaging();
        };
        Controller.prototype._onConPthree = function () {
            var oPage = this.getView().getModel('oCoPageModel').getProperty('/paging'),
                oContracts = this.getView().getModel('oAllContractsofBuag'),
                iSelectedIndex = oPage[2].co_ind - 1;

            this.getView().getModel('oDtaVrfyContracts').setData(oContracts.oData[iSelectedIndex]);
            //delete this.getView().getModel('oDtaVrfyContracts').oData.iIndex;

            oContracts.setProperty('/selectedKey', iSelectedIndex.toString());
            this._refreshPaging();
        };
        Controller.prototype._onConRite = function () {
            var oPage = this.getView().getModel('oCoPageModel').getProperty('/paging'),
                oContracts = this.getView().getModel('oAllContractsofBuag'),
                iSel_Ind = parseInt(oContracts.getProperty('/selectedKey'), 10) + 1;  //Selected is the new selected index


            if (iSel_Ind < oContracts.oData.length) {
                this.getView().getModel('oDtaVrfyContracts').setData(oContracts.oData[iSel_Ind]);
                //delete this.getView().getModel('oDtaVrfyContracts').oData.iIndex;

                oContracts.setProperty('/selectedKey', iSel_Ind.toString());
                this._refreshPaging();
            } else {
                return; //do nothing if it's invalid
            }
        };
        Controller.prototype._onConLast = function () {
            var oContracts = this.getView().getModel('oAllContractsofBuag'),
                iSelectedIndex = oContracts.oData.length - 1;

            this.getView().getModel('oDtaVrfyContracts').setData(this.getView().getModel('oAllContractsofBuag').oData[iSelectedIndex]);
            //delete this.getView().getModel('oDtaVrfyContracts').oData.iIndex;

            oContracts.setProperty('/selectedKey', iSelectedIndex.toString());
            this._refreshPaging();
        };

        Controller.prototype._refreshPaging = function () {
            var oPage = this.getView().getModel('oCoPageModel').getProperty('/paging'),
                oContracts = this.getView().getModel('oAllContractsofBuag'),
                iSel_Ind = parseInt(oContracts.getProperty('/selectedKey'), 10),
                i;

            if (iSel_Ind === 0 || oContracts.oData.length === 2) {
                for (i = 0; i < 3; i = i + 1) {
                    oPage[i].co_ind = i + 1;
                }
            } else if (iSel_Ind === (oContracts.oData.length - 1)) {
                for (i = 0; i < 3; i = i + 1) {
                    oPage[i].co_ind = iSel_Ind + 1 - 2 + i;
                }
            } else {
                for (i = 0; i < 3; i = i + 1) {
                    oPage[i].co_ind = iSel_Ind + i;
                }
            }

            this.getView().getModel('oCoPageModel').setProperty('/paging', oPage);
        };
        /*Ends Here*/
        /********************************************************************************************/

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

        Controller.prototype._handleMailingAddrUpdate = function (oEvent) {
            //Validate the address input first
            this._validateInputAddr();
        };

        Controller.prototype._handleMailingAcceptBtn = function (oEvent) {
            var oMailEdit = this.getView().getModel('oDtaAddrEdit'),
                oMailTempModel = this.getView().getModel('oDtaVrfyMailingTempAddr'),
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
                oMailTempModel = this.getView().getModel('oDtaVrfyMailingTempAddr'),
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
                sBpNum = this.getView().getModel('oDtaVrfyMailingTempAddr').getProperty('/PartnerID'),
                sBuagNum = this.getView().getModel('oDtaVrfyMailingTempAddr').getProperty('/ContractAccountID'),
                sFixedAddressID = this.getView().getModel('oDtaVrfyMailingTempAddr').getProperty('/FixedAddressID');


            sPath = '/BuagMailingAddrs' + '(' + 'PartnerID=\'' + sBpNum + '\'' + ',ContractAccountID=\'' + sBuagNum + '\'' + ',FixedAddressID=\'' + sFixedAddressID + '\')';

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
                oModel.update(sPath, this.getView().getModel('oDtaVrfyMailingTempAddr').oData, oParameters);
            }
        };

        Controller.prototype._validateInputAddr = function () {
            //this._showSuggestedAddr();
            var oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters,
                aFilters = this._createAddrValidateFilters(),
                oMailEdit = this.getView().getModel('oDtaAddrEdit');

            sPath = '/BuagMailingAddrs';

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

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        Controller.prototype._createAddrValidateFilters = function () {
            var aFilters = [],
                oFilterTemplate,
                sBpNum = this.getView().getModel('oDtaVrfyMailingTempAddr').getProperty('/PartnerID'),
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
            /*this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDtaVrfyMailingTempAddr');
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

            this._oMailEditPopup = ute.ui.main.Popup.create({
                close: this._handleEditMailPopupClose,
                content: this.getView().byId("idAddrUpdatePopup"),
                title: 'Edit Mailing Address'
            });

            oEditMail.setProperty('/AddrInfo', this.getView().getModel('oDtaVrfyMailingTempAddr').getProperty('/FixAddrInfo'));

            //Control what to or not to display
            this.getView().byId("idAddrUpdatePopup").setVisible(true);
            this.getView().getModel('oDtaAddrEdit').setProperty('/updateSent', false);
            this.getView().getModel('oDtaAddrEdit').setProperty('/showVldBtns', false);
            this.getView().getModel('oDtaAddrEdit').setProperty('/updateNotSent', true);
            this.getView().getModel('oDtaAddrEdit').setProperty('/bFixAddr', true);
            this.getView().byId('idEditMailAddr_UpdtBtn').setVisible(true);
            this.getView().byId('idSuggCompareCheck').setChecked(false);
            this._oMailEditPopup.open();
        };


        Controller.prototype._onEditTempAddrClick = function (oEvent) {
            var oEditMail = this.getView().getModel('oDtaAddrEdit');

            this._oMailEditPopup = ute.ui.main.Popup.create({
                close: this._handleEditMailPopupClose,
                content: this.getView().byId("idAddrUpdatePopup"),
                title: 'Edit Temp Mailing Address'
            });

            oEditMail.setProperty('/AddrInfo', this.getView().getModel('oDtaVrfyMailingTempAddr').getProperty('/TempAddrInfo'));

            //this._onToggleButtonPress();
            this.getView().byId("idTempAddrUpdatePopup").setVisible(true);
            this.getView().getModel('oDtaAddrEdit').setProperty('/updateSent', false);
            this.getView().getModel('oDtaAddrEdit').setProperty('/showVldBtns', false);
            this.getView().getModel('oDtaAddrEdit').setProperty('/updateNotSent', true);
            this.getView().getModel('oDtaAddrEdit').setProperty('/bFixAddr', false);
            this.getView().byId('idEditMailAddr_UpdtBtn').setVisible(true);
            this._oMailEditPopup.open();
        };

        Controller.prototype._handleTempAddrUpdate = function (oEvent) {
            var oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters,
                sBpNum = this.getView().getModel('oDtaVrfyMailingTempAddr').getProperty('/PartnerID'),
                sBuagNum = this.getView().getModel('oDtaVrfyMailingTempAddr').getProperty('/ContractAccountID'),
                sFixedAddressID = this.getView().getModel('oDtaVrfyMailingTempAddr').getProperty('/TemporaryAddrID');



            sPath = '/BuagMailingAddrs' + '(' + 'PartnerID=\'' + sBpNum + '\'' + ',ContractAccountID=\'' + sBuagNum + '\'' + ',FixedAddressID=\'' + sFixedAddressID + '\')';

            oParameters = {
                merge: false,
                success : function (oData) {
                    sap.ui.commons.MessageBox.alert("Update Success");
                    this._oTempMailEditPopup.close();
                }.bind(this),
                error: function (oError) {
                    sap.ui.commons.MessageBox.alert("Update Failed");
                }.bind(this)
            };

            if (oModel) {
                oModel.update(sPath, this.getView().getModel('oDtaVrfyMailingTempAddr').oData, oParameters);
            }
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


        /*************************************************************************************/
        //Edit Email
        Controller.prototype._handleEmailEdit = function (oEvent) {
            var oModel = this.getView().getModel('oODataSvc'),
                oParameters,
                sBpNum = this.getView().getModel('oDtaVrfyBP').getProperty('/PartnerID'),
                sBpEmail = this.getView().getModel('oDtaVrfyBP').getProperty('/Email'),
                sBpEmailConsum = this.getView().getModel('oDtaVrfyBP').getProperty('/EmailConsum'),
                sPath,
                oNNP = this.getView().getModel('oEditEmailNNP');

            //Preapre Popup for Email Edit to show
            this.getView().byId("idEmailEditPopup").setVisible(true);
            this._oEmailEditPopup = ute.ui.main.Popup.create({
                //close: this._handleEditMailPopupClose,
                content: this.getView().byId("idEmailEditPopup"),
                title: 'Email Address and Preferences'
            });
            this._oEmailEditPopup.setShowCloseButton(false);

            //Start loading NNP logics and settings
            sPath = '/EmailNNPs' + '(' + 'PartnerID=\'' + sBpNum + '\'' + ',Email=\'' + sBpEmail + '\'' + ',EmailConsum=\'' + sBpEmailConsum + '\')';
            oParameters = {
                /*urlParameters: {"$expand": "Buags"},*/
                success : function (oData) {
                    if (oData) {
                        this._oEmailEditPopup.open();
                        oNNP.setData(oData);
                    }
                }.bind(this),
                error: function (oError) {
                    sap.ui.commons.MessageBox.alert("NNP Entity Service Error");
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        Controller.prototype._onValidateEmailAddress = function (oEvent) {
            var oEmailValidate = this.getView().getModel('oEditEmailValidate'),
                oModel = this.getView().getModel('oODataSvc'),
                oParameters,
                sPath,
                sEmailAddr = this.getView().getModel('oEditEmailNNP').getProperty('/Email');

            sPath = '/EmailVerifys' + '(\'' + sEmailAddr + '\')';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        oEmailValidate.setData(oData);
                    }
                }.bind(this),
                error: function (oError) {
                    sap.ui.commons.MessageBox.alert("Email Validate Service Error");
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }

        };

        Controller.prototype._onEditEmailSave = function (oEvent) {
            var oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters,
                sBpNum = this.getView().getModel('oEditEmailNNP').getProperty('/PartnerID'),
                sBpEmail = this.getView().getModel('oEditEmailNNP').getProperty('/Email'),
                sBpEmailConsum = this.getView().getModel('oEditEmailNNP').getProperty('/EmailConsum'),
                oNNP = this.getView().getModel('oEditEmailNNP'),
                bEmailChanged = true;

            if (sBpEmail === this.getView().getModel('oDtaVrfyBP').getProperty('/Email')) {
                bEmailChanged = false;
            } else {
                bEmailChanged = true;
            }


            if (sBpEmailConsum === '000') {   //If it is 'CREATE'
                sPath = '/EmailNNPs' + '(' + 'PartnerID=\'' + sBpNum + '\'' + ',Email=\'' + sBpEmail + '\'' + ',EmailConsum=\'\')';
                oNNP.setProperty('/EmailConsum', '');
            } else {    //If it is 'UPDATE'
                sPath = '/EmailNNPs' + '(' + 'PartnerID=\'' + sBpNum + '\'' + ',Email=\'' + sBpEmail + '\'' + ',EmailConsum=\'' + sBpEmailConsum + '\')';
            }


            oParameters = {
                merge: false,
                success : function (oData) {
                    if (bEmailChanged) {
                        sap.ui.commons.MessageBox.alert(oNNP.getProperty('/LdapMessage'));
                    } else {
                        sap.ui.commons.MessageBox.alert('Marketing Preference Updated Successfully');
                    }
                    this._oEmailEditPopup.close();
                    this._initDtaVrfRetr();
                }.bind(this),
                error: function (oError) {
                    sap.ui.commons.MessageBox.alert("Update Failed");
                }.bind(this)
            };

            if (oModel) {
                oModel.update(sPath, oNNP.oData, oParameters);
            }
        };

        Controller.prototype._onEditEmailDelete = function (oEvent) {
            var oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters,
                sBpNum = this.getView().getModel('oEditEmailNNP').getProperty('/PartnerID'),
                //sBpEmailConsum = this.getView().getModel('oDtaVrfyBP').getProperty('/EmailConsum');
                oNNP = this.getView().getModel('oEditEmailNNP');


            //oNNP.setProperty('/Email', '');
            sPath = '/EmailNNPs' + '(' + 'PartnerID=\'' + sBpNum + '\'' + ',Email=\'\'' + ',EmailConsum=\'\')';


            oParameters = {
                success : function (oData) {
                    sap.ui.commons.MessageBox.alert('Email Successfully Removed');
                    this._oEmailEditPopup.close();
                    this._initDtaVrfRetr();
                }.bind(this),
                error: function (oError) {
                    sap.ui.commons.MessageBox.alert("Update Failed");
                    this._oEmailEditPopup.close();
                }.bind(this)
            };

            if ((oNNP.getProperty('/Ecd') === 'Y') || (oNNP.getProperty('/Mkt') === 'Y') || (oNNP.getProperty('/Offer') === 'Y') || (oNNP.getProperty('/Ee') === 'Y')) {
                sap.ui.commons.MessageBox.alert("Set all marketing values to false first");
                return;
            } else {
                if (oModel) {
                    oModel.remove(sPath, oParameters);
                }
            }
        };

        Controller.prototype._onMktPrefTogg = function (oEvent) {
            var oNNP = this.getView().getModel('oEditEmailNNP');

            if (oEvent.mParameters.id.indexOf('ctaddr') > 0) {
                if (oEvent.getSource().getLeftSelected()) {
                    oNNP.setProperty('/Ecd', 'Y');
                } else {
                    oNNP.setProperty('/Ecd', 'N');
                }
            } else if (oEvent.mParameters.id.indexOf('rpdsrv') > 0) {
                if (oEvent.getSource().getLeftSelected()) {
                    oNNP.setProperty('/Mkt', 'Y');
                } else {
                    oNNP.setProperty('/Mkt', 'N');
                }
            } else if (oEvent.mParameters.id.indexOf('thrdpty') > 0) {
                if (oEvent.getSource().getLeftSelected()) {
                    oNNP.setProperty('/Offer', 'Y');
                } else {
                    oNNP.setProperty('/Offer', 'N');
                }
            } else { //('engeff')
                if (oEvent.getSource().getLeftSelected()) {
                    oNNP.setProperty('/Ee', 'Y');
                } else {
                    oNNP.setProperty('/Ee', 'N');
                }
            }
        };
        /*************************************************************************************/

        return Controller;
    }
);
