/*globals sap, ute*/
/*jslint nomen:true*/
sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'jquery.sap.global',
        'nrg/base/type/Price',
        'sap/ui/core/routing/HashChanger',
        "sap/ui/model/json/JSONModel"
    ],

    function (CoreController, jQuery, price, HashChanger, JSONModel) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.billing.view.DefferedPmtPlan');

        Controller.prototype.onInit = function () {
        };


        Controller.prototype.onBeforeRendering = function () {
            var oRouteInfo = this.getOwnerComponent().getCcuxContextManager().getContext().oData;
            this._bpNum = oRouteInfo.bpNum;
            this._caNum = oRouteInfo.caNum;
            this._coNum = oRouteInfo.coNum;
            this._isExt = oRouteInfo.isExt;

            this.getView().setModel(this.getOwnerComponent().getModel('comp-dppext'), 'oDataSvc');

            //Model for screen control
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDppScrnControl');

            //Model for DPP eligibility/reason
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDppEligible');

            //Model for DPP denied reasons
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDppDeniedReason');

            //Model for SetUp (DPP Step I)
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDppReasons');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDppSetUps');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDppStepOnePost');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDppStepOneSelectedData');


            this._initScrnControl();
            this._startScrnControl();
        };

        /****************************************************************************************************************/
        //Init Functions
        /****************************************************************************************************************/
        Controller.prototype._initScrnControl = function () {
            var oScrnControl = this.getView().getModel('oDppScrnControl');

            oScrnControl.setProperty('/StepOne', false);
            oScrnControl.setProperty('/StepTwo', false);
            oScrnControl.setProperty('/StepThree', false);
            oScrnControl.setProperty('/DPPDenied', false);
            oScrnControl.setProperty('/EXTGrant', false);
            oScrnControl.setProperty('/EXTDenied', false);
        };

        Controller.prototype._startScrnControl = function () {
            var oScrnControl = this.getView().getModel('oDppScrnControl'),
                oHashChanger = new HashChanger(),
				sUrlHash = oHashChanger.getHash(),
                aSplitHash = sUrlHash.split('/');

            if (aSplitHash[1] === 'defferedpaymentplan') {
                this._isDppElgble();
            } else if (aSplitHash[1] === 'defferedpaymentext') {
                this._selectScrn('EXTGrant');
            }

            //oScrnControl.setProperty('/StepOne', true);
        };

        Controller.prototype._selectScrn = function (sSelectedScrn) {
            var oScrnControl = this.getView().getModel('oDppScrnControl');

            oScrnControl.setProperty('/StepOne', false);
            oScrnControl.setProperty('/StepTwo', false);
            oScrnControl.setProperty('/StepThree', false);
            oScrnControl.setProperty('/DPPDenied', false);
            oScrnControl.setProperty('/EXTGrant', false);
            oScrnControl.setProperty('/EXTDenied', false);
            oScrnControl.setProperty('/' + sSelectedScrn, true);

            if (sSelectedScrn === 'StepOne') {
                this._retrDppSetUp();
                this._retrDppReason();
            } else if (sSelectedScrn === 'StepTwo') {

            } else if (sSelectedScrn === 'StepThree') {

            } else if (sSelectedScrn === 'DPPDenied') {
                this._retrDppDeniedReason();
            }
        };

        /****************************************************************************************************************/
        //Formatter
        /****************************************************************************************************************/
        Controller.prototype._postiveXFormatter = function (cIndicator) {
            if (cIndicator === 'X' || cIndicator === 'x') {
                return true;
            } else {
                return false;
            }
        };

        Controller.prototype._isOdd = function (iIndex) {
            if (iIndex % 2 === 0) {
                return false;
            } else {
                return true;
            }
        };

        Controller.prototype._isEven = function (iIndex) {
            if (iIndex % 2 === 0) {
                return true;
            } else {
                return false;
            }
        };

        Controller.prototype._formatDate = function (oDate) {
            var sFormattedDate;

            if (!oDate) {
                return null;
            } else {
                sFormattedDate = (oDate.getMonth() + 1).toString() + '/' + oDate.getDate().toString() + '/' + oDate.getFullYear().toString().substring(2, 4);
                return sFormattedDate;
            }
        };

        /****************************************************************************************************************/
        //Handler
        /****************************************************************************************************************/
        Controller.prototype._onDppDeniedOkClick = function () {    //Navigate to DPP setup if 'OK' is clicked
            var oScrnControl = this.getView().getModel('oDppScrnControl');

            //Go to Setup STEP I
            this._selectScrn('StepOne');
        };

        Controller.prototype._onReasonSelect = function () {
            //this.getView().getModel('oDppReasons').setData(oData);
        };

        Controller.prototype._onSelectAllCheck = function (oEvent) {
            var oSetUps = this.getView().getModel('oDppSetUps'),
                i;

            if (oEvent.mParameters.checked) {
                for (i = 0; i < oSetUps.getData().results.length; i = i + 1) {
                    oSetUps.setProperty('/results/' + i + '/OpenItems/bSelected', true);
                }
            } else {
                for (i = 0; i < oSetUps.getData().results.length; i = i + 1) {
                    oSetUps.setProperty('/results/' + i + '/OpenItems/bSelected', false);
                }
            }
        };

        Controller.prototype._onOneItemCheck = function (oEvent) {
            if (!oEvent.mParameters.checked) {
                this.getView().getModel('oDppSetUps').setProperty('/results/bSelectedAll', false);
            }
        };

        Controller.prototype._onDppSetUpOk = function () {
            var oSetUps = this.getView().getModel('oDppSetUps'),
                i,
                oSetUpsPost = this.getView().getModel('oDppStepOnePost'),
                aSelectedInd = [];

            oSetUpsPost.setProperty('/InstlmntNo', oSetUps.getProperty('/results/0/InstlmntNo'));
            for (i = 0; i < oSetUps.getData().results.length; i = i + 1) {
                if (oSetUps.getProperty('/results/' + i + '/OpenItems/bSelected')) {
                    aSelectedInd.push({Ind: oSetUps.getProperty('/results/' + i + '/OpenItems/ItemNumber')});
                }
            }
            oSetUpsPost.setProperty('/SelectedIndices', aSelectedInd);
            this.getView().getModel('oDppStepOneSelectedData').setProperty('/SelectedData', oSetUpsPost.getProperty('/SelectedIndices'));

            this._retrDPPConf();    //Initiating step 2
        };


        /****************************************************************************************************************/
        //OData Call
        /****************************************************************************************************************/
        Controller.prototype._isDppElgble = function () {
            var oODataSvc = this.getView().getModel('oDataSvc'),
                oParameters,
                sPath;

            sPath = '/DPPElgbles(ContractAccountNumber=\'' + this._caNum + '\',DPPReason=\'\')';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oDppEligible').setData(oData);

                        if (oData.EligibleYes) {
                            this._selectScrn('StepOne');
                        } else {
                            this._selectScrn('DPPDenied');
                        }
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oODataSvc) {
                oODataSvc.read(sPath, oParameters);
            }
        };

        Controller.prototype._retrDppDeniedReason = function () {
            var oODataSvc = this.getView().getModel('oDataSvc'),
                oParameters,
                sPath,
                i;

            sPath = '/DPPElgbles(ContractAccountNumber=\'' + this._caNum + '\',DPPReason=\'\')/DPPDenieds';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        for (i = 0; i < oData.results.length; i++) {
                            oData.results[i].DPPDenyed.iIndex = i + 1;
                        }
                        this.getView().getModel('oDppDeniedReason').setData(oData);
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oODataSvc) {
                oODataSvc.read(sPath, oParameters);
            }
        };

        Controller.prototype._retrDppReason = function () {
            var oODataSvc = this.getView().getModel('oDataSvc'),
                oParameters,
                sPath;

            sPath = '/DPPReasons';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oDppReasons').setData(oData.results);
                        this.getView().getModel('oDppReasons').setProperty('/selectedKey', '3400');
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oODataSvc) {
                oODataSvc.read(sPath, oParameters);
            }
        };

        Controller.prototype._retrDppSetUp = function () {
            var oODataSvc = this.getView().getModel('oDataSvc'),
                oParameters,
                sPath,
                i;

            //Model created for later posting
            this.getView().getModel('oDppStepOnePost').setData({});


            sPath = '/DPPElgbles(ContractAccountNumber=\'' + this._caNum + '\',DPPReason=\'\')/DPPSetUps';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        for (i = 0; i < oData.results.length; i = i + 1) {
                            //oData.results[i].iIndex = i + 1;
                            oData.results[i].bSelected = false;
                        }
                        this.getView().getModel('oDppSetUps').setData(oData);
                        this.getView().getModel('oDppSetUps').setProperty('/results/bSelectedAll', false);
                        this.getView().getModel('oDppStepOnePost').setProperty('/InstlmntNo', this.getView().getModel('oDppSetUps').getProperty('/results/0/InstlmntNo'));
                        this.getView().getModel('oDppStepOnePost').setProperty('/ZeroDwPay', false);
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oODataSvc) {
                oODataSvc.read(sPath, oParameters);
            }
        };

        Controller.prototype._retrDppConf = function () {

        };

        return Controller;
    }
);
