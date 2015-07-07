/*global sap*/
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

            //Model to track "Confirm" or not status
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oCfrmStatus');

            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oCoPageModel');

            this._initDtaVrfRetr();
            this._initCfrmStatus();
            //this._initCoPageModel();

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

        Controller.prototype._onBuagChange = function () {
            var eventBus = sap.ui.getCore().getEventBus(),
                newBuagNum = "1234";
            eventBus.publish("nrg.module.dashoard", "eBuagChanged", newBuagNum);
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

        Controller.prototype._retrBuag = function (sBpNum) {      //will be called whenever a different Buag is selected
            var oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters,
                i;

            sPath = '/Partners' + '(\'' + sBpNum + '\')/Buags/';
            oParameters = {
                success : function (oData) {
                    if (oData) {
                        if (oData.results[0]) {
                            //If there's first record of Buags, load as default to display
                            this.getView().getModel('oDtaVrfyBuags').setData(oData.results[0]);
                            this._retrContracts(oData.results[0].ContractAccountID);
                            this._retrBuagMailingAddr(sBpNum, oData.results[0].ContractAccountID, oData.results[0].FixedAddressID);
                        }
                        for (i = 0; i < oData.results.length; i = i + 1) {
                            oData.results[i].iIndex = i.toString();
                        }
                        this.getView().getModel('oAllBuags').setData(oData.results);
                        this.getView().getModel('oAllBuags').setProperty('/selectedKey', '0');
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

            this.getView().getModel('oDtaVrfyBuags').setData(this.getView().getModel('oAllBuags').oData[iSelectedIndex]);
            //delete this.getView().getModel('oDtaVrfyContracts').oData.iIndex;

            this._retrContracts(this.getView().getModel('oDtaVrfyBuags').getProperty('/ContractAccountID'));
        };

        Controller.prototype._onBuagChange = function (oEvent) {
            var sNewSelectedBuagIndex;

            sNewSelectedBuagIndex = oEvent.getSource().getSelectedKey();
            this._retrBuag(sNewSelectedBuagIndex);
        };

        Controller.prototype._onToggleButtonPress = function (oEvent) {
            if (this.getView().byId('mailadd_area').getVisible()) {
                this.getView().byId('mailadd_area').setVisible(false);
                this.getView().byId('serviceadd_area').setVisible(true);
            } else {
                this.getView().byId('serviceadd_area').setVisible(false);
                this.getView().byId('mailadd_area').setVisible(true);
            }

        };

        Controller.prototype._handleConfirm = function () {
            var oStatusModel = this.getView().getModel('oCfrmStatus');
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
                urlParameters: {},
                success : function (oData) {
                    sap.ui.commons.MessageBox.alert("Update Success");
                }.bind(this),
                error: function (oError) {
                    sap.ui.commons.MessageBox.alert("Update Failed");
                }.bind(this)
            };

            if (oModel) {
                oModel.update(sPath, this.getView().getModel('oDtaVrfyBP').oData, oParameters);
            }


        };

        Controller.prototype._formatChecked = function (sIndicator) {
            if (sIndicator === 'x' || sIndicator === 'X') {
                return true;
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

            if (iSel_Ind === 0) {
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
    }
);
