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
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDppSetUps');


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
                oScrnControl.setProperty('/EXTGrant', true);
            }

            //oScrnControl.setProperty('/StepOne', true);
        };

        Controller.prototype._selectScrn = function (sSelectedScrn) {
            var oScrnControl = this.getView().getModel('oDppScrnControl');

            oScrnControl.setProperty('/' + sSelectedScrn, true);
        };

        /****************************************************************************************************************/
        //Formatter
        /****************************************************************************************************************/
        Controller.prototype._postiveFormatter = function (cIndicator) {
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
            oScrnControl.setProperty('/StepOne', true);
            oScrnControl.setProperty('/DPPDenied', false);

            this._retrDppSetUp();
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
                            this._retrDppDeniedReason();
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
                sPath;

            sPath = '/DPPElgbles(ContractAccountNumber=\'' + this._caNum + '\',DPPReason=\'\')/DPPDenieds';

            oParameters = {
                success : function (oData) {
                    if (oData) {
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

        Controller.prototype._retrDppSetUp = function () {
            var oODataSvc = this.getView().getModel('oDataSvc'),
                oParameters,
                sPath,
                i;

            sPath = '/DPPElgbles(ContractAccountNumber=\'' + this._caNum + '\',DPPReason=\'\')/DPPSetUps';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        for (i = 0; i < oData.results.length; i = i + 1) {
                            oData.results[i].iIndex = i + 1;
                        }
                        this.getView().getModel('oDppSetUps').setData(oData);
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

        return Controller;
    }
);
