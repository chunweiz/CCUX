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

            this._initDtaVrfRetr();
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
                urlParameters: {"$expand": "Buags"},
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oDtaVrfyBP').setData(oData);
                        if (oData.Buags.results[0]) {
                            //Set the first Contract Account info to load to to verification screen first
                            this.getView().getModel('oDtaVrfyBuags').setData(oData.Buags.results[0]);
                            this._retrBuag(oData.Buags.results[0].ContractAccountID);
                            this._retrBuagMailingAddr(oData.Buags.results[0].PartnerID, oData.Buags.results[0].ContractAccountID, oData.Buags.results[0].FixedAddressID);
                        }
                        this.getView().getModel('oAllBuags').setData(oData.Buags.results);

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

        Controller.prototype._retrBuag = function (sBuagNum) {      //will be called whenever a different Buag is selected
            var oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters,
                i;

            sPath = '/Buags' + '(\'' + sBuagNum + '\')';
            oParameters = {
                urlParameters: {"$expand": "Contracts"},
                success : function (oData) {
                    if (oData) {
                        if (oData.Contracts.results[0]) {
                            //Again if there's first record of Contracts, load as default to display
                            this.getView().getModel('oDtaVrfyContracts').setData(oData.Contracts.results[0]);
                        }
                        for (i = 0; i < oData.Contracts.results.length; i = i + 1) {
                            oData.Contracts.results[0].iIndex = i;
                        }
                        this.getView().getModel('oAllContractsofBuag').setData(oData.Contracts.results);
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

            sPath = '/BuagMailingAddr' + '('
                  + 'PartnerID=\'' + sBpNum + '\''
                  + ',ContractAccountID=\'' + sBuagNum + '\''
                  + ',FixedAddressID=\'' + sFixedAddressID + '\')';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        var test = oData;
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


        Controller.prototype._onContractChange = function (oEvent) {
            var sNewSelectedContractIndex;

            sNewSelectedContractIndex = oEvent.getSource().getSelectedKey();
            this.getView().getModel('oDtaVrfyContracts').setData(this.getView().getModel('oAllContractsofBuag').oData[sNewSelectedContractIndex]);
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
    }
);
