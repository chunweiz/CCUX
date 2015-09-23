// temporarily added by Jerry

/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'nrg/base/view/BaseController',
        'nrg/base/type/Price'
    ],

    function (jQuery, Controller, Type_Price) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.billing.view.BillingCheckbook');

        CustomController.prototype.onInit = function () {
        };

        CustomController.prototype.onBeforeRendering = function () {
            this.getOwnerComponent().getCcuxApp().setTitle('BILLING');

            //var o18n = this.getOwnerComponent().getModel('comp-i18n-billing');

            this.getView().setModel(this.getOwnerComponent().getModel('comp-billing'), 'oDataSvc');

            //Model to keep checkbook header
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oChkbkHdr');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oPaymentHdr');

            //Model to keep CheckBook detail data
            /*this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oPayments');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oPaymentItems');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oPaymentSumrys');*/


            //Start of data retriving
            this._initRoutingInfo();
            this._initChkbookHdr();
            this._initPaymentHdr();
        };

        CustomController.prototype.onAfterRendering = function () {
        };

        CustomController.prototype.onExit = function () {
        };


        /*****************************************************************************************************************************************************/
        //Formatter Functions
        CustomController.prototype._formatBoolCurChrg = function (sIndicator) {
            if (sIndicator === 'X' || sIndicator === 'x') {
                return true;
            } else {
                return false;
            }
        };
        CustomController.prototype._formatBoolCurChrg_Rev = function (sIndicator) {
            if (sIndicator === 'X' || sIndicator === 'x') {
                return false;
            } else {
                return true;
            }
        };


        CustomController.prototype._formatTwoClotBoolean = function (sSecondCallout) {
            if (sSecondCallout) {
                return true;
            } else {
                return false;
            }
        };

        CustomController.prototype._formatBppBoolean = function (sCallout) {
            if (sCallout === 'BBP') {
                return true;
            } else {
                return false;
            }
        };

        CustomController.prototype._formatNotBppBoolean = function (sCallout) {
            if (sCallout === 'BBP') {
                return false;
            } else {
                return true;
            }
        };

        CustomController.prototype._formatDate = function (oDate) {
            var sFormattedDate;

            if (!oDate) {
                return null;
            } else {
                sFormattedDate = (oDate.getMonth() + 1).toString() + '/' + oDate.getDate().toString() + '/' + oDate.getFullYear().toString().substring(2, 4);
                return sFormattedDate;
            }
        };

        CustomController.prototype._getCurDate = function () {
            var sCurDate,
                oCurDate = new Date();

            sCurDate = (oCurDate.getMonth() + 1).toString() + '/' + oCurDate.getDate().toString() + '/' + oCurDate.getFullYear().toString().substring(2, 4);

            return sCurDate;
        };

        CustomController.prototype._getPreSixMonthDate = function () {
            var sPreSixDate,
                oPreSixDate = new Date();

            oPreSixDate.setMonth(oPreSixDate.getMonth() - 6);
            sPreSixDate = (oPreSixDate.getMonth() + 1).toString() + '/' + oPreSixDate.getDate().toString() + '/' + oPreSixDate.getFullYear().toString().substring(2, 4);

            return sPreSixDate;
        };

        CustomController.prototype._formatLfRtZroVal = function (iLfRtVal) {
            if (iLfRtVal === '0.00' || iLfRtVal === '0') {
                return ' ';
            } else {
                return iLfRtVal;
            }
        };

        /*****************************************************************************************************************************************************/
        /*****************************************************************************************************************************************************/
        //Handlers
        CustomController.prototype._onPaymentHdrClicked = function (oEvent) {
            var sBindingPath,
                oPmtHdr = this.getView().getModel('oPaymentHdr');

            sBindingPath = oEvent.oSource.oBindingContexts.oPaymentHdr.getPath();
            if (oPmtHdr.getProperty(sBindingPath + '/bExpand')) {   //If the status is expand need to feed the data inside the expand area
                this._retrPayments(oPmtHdr.getProperty(sBindingPath).InvoiceNum, sBindingPath);
                this._retrPaymentItmes(oPmtHdr.getProperty(sBindingPath).InvoiceNum, sBindingPath);
                this._retrPaymentSumrys(oPmtHdr.getProperty(sBindingPath).InvoiceNum, sBindingPath);
            }
        };
        /*****************************************************************************************************************************************************/

        CustomController.prototype._retrPayments = function (sInvNum, sBindingPath) {
            var oChbkOData = this.getView().getModel('oDataSvc'),
                sPath,
                oParameters;

            sPath = '/PaymentHdrs(\'' + sInvNum + '\')/Payments';
                //'/PaymentHdrs' + '(InvoiceNum=\'' + sInvNum + '\',Paidamt=\'0.0000\')';
                //'/PaymentHdrs(\'' + sInvNum + '\')/Payments';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oPaymentHdr').setProperty(sBindingPath + '/Payments', oData);
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oChbkOData) {
                oChbkOData.read(sPath, oParameters);
            }

        };
        CustomController.prototype._retrPaymentItmes = function (sInvNum, sBindingPath) {
            var oChbkOData = this.getView().getModel('oDataSvc'),
                sPath,
                oParameters,
                oScrlCtaner = this.getView().byId('nrgChkbookScrollContainer');

            sPath = '/PaymentHdrs(\'' + sInvNum + '\')/PaymentItems';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oPaymentHdr').setProperty(sBindingPath + '/PaymentItems', oData);
                    }
                    //oScrlCtaner.scrollTop = oScrlCtaner.scrollHeight;
                    oScrlCtaner.scrollTo(0, 686, 100);
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oChbkOData) {
                oChbkOData.read(sPath, oParameters);
            }

        };
        CustomController.prototype._retrPaymentSumrys = function (sInvNum, sBindingPath) {
            var oChbkOData = this.getView().getModel('oDataSvc'),
                sPath,
                oParameters;

            sPath = '/PaymentHdrs(\'' + sInvNum + '\')/PaymentSumry';

            oParameters = {
                success : function (oData) {
                    if (oData.results) {
                        this.getView().getModel('oPaymentHdr').setProperty(sBindingPath + '/PaymentSumry', oData.results[0]);
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oChbkOData) {
                oChbkOData.read(sPath, oParameters);
            }
        };

        CustomController.prototype._initRoutingInfo = function () {
            var oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo();

            this._bpNum = oRouteInfo.parameters.bpNum;
            this._caNum = oRouteInfo.parameters.caNum;
            this._coNum = oRouteInfo.parameters.coNum;
        };

        CustomController.prototype._initChkbookHdr = function () {
            var sPath;

            sPath = '/ChkBookHdrs' + '(ContractAccountID=\'' + this._caNum + '\',InvoiceNum=\'008005303668\')';
                    //'/ChkBookHdrs' + '(ContractAccountID=\'' + this._caNum + '\',InvoiceNum=\'\')';

            this._retrChkbookHdr(sPath);
        };

        CustomController.prototype._initPaymentHdr = function () {
            var sPath;

            sPath = '/ConfBuags' + '(\'' + this._caNum + '\')/PaymentHdrs';

            this._retrPaymentHdr(sPath);
        };

        CustomController.prototype._retrChkbookHdr = function (sPath) {
            var oChbkOData = this.getView().getModel('oDataSvc'),
                oParameters;

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oChkbkHdr').setData(oData);
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oChbkOData) {
                oChbkOData.read(sPath, oParameters);
            }
        };

        CustomController.prototype._retrPaymentHdr = function (sPath) {
            var oChbkOData = this.getView().getModel('oDataSvc'),
                oParameters,
                i,
                j,
                oCurDate = new Date();

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        for (i = 0; i < oData.results.length; i = i + 1) {
                            oData.results[i].oCallOut = {};
                            if (oData.results[i].CallOut) {
                                oData.results[i].oCallOut = JSON.parse(oData.results[i].CallOut);
                                for (j = 0; j < oData.results[i].oCallOut.CallOuts.length; j = j + 1) {
                                    if (oData.results[i].oCallOut.CallOuts[j].CallOut === 'BBP') {
                                        oData.results[i].oCallOut.CallOuts[j].BBPAmt = oData.results[i].BBPAmt;
                                        oData.results[i].oCallOut.CallOuts[j].BBPAmtAddr = oData.results[i].BBPAmtAddr;
                                        oData.results[i].oCallOut.CallOuts[j].BBPBal = oData.results[i].BBPBal;
                                        oData.results[i].oCallOut.CallOuts[j].BBPBalAddr = oData.results[i].BBPBalAddr;
                                        oData.results[i].oCallOut.CallOuts[j].BBPDefBal = oData.results[i].BBPDefBal;
                                        oData.results[i].oCallOut.CallOuts[j].BBPDefBalTxt = oData.results[i].BBPDefBalTxt;
                                    }
                                }
                                if (oData.results[i].oCallOut.CallOuts.length === 1) {
                                    oData.results[i].sCallOut = oData.results[i].oCallOut.CallOuts[0].CallOut;
                                } else if (oData.results[i].oCallOut.CallOuts.length === 2) {
                                    oData.results[i].sCallOut = oData.results[i].oCallOut.CallOuts[0].CallOut;
                                    oData.results[i].sCallOut2 = oData.results[i].oCallOut.CallOuts[1].CallOut;
                                } else {
                                    oData.results[i].sCallOut = oData.results[i].oCallOut.CallOuts.length + '+';
                                    this.getView().byId('ChkbookHdrClOt').setVisible(true);
                                }
                            }
                            if (i !== oData.results.length - 1) {
                                oData.results[i].bExpand = false;
                            } else {
                                oData.results[i].bExpand = true;
                            }
                            oData.results[i].bRegul = true;
                            oData.results[i].bAlert = false;
                        }

                        i = i - 1;  //At this moment i is the lengh of oData, need the index of the last element

                        //Check over due invoices
                        if (oData.results[i].DueDate < oCurDate) {
                            oData.results[i].bAlert = true;
                            oData.results[i].bRegul = false;
                        }

                        this.getView().getModel('oPaymentHdr').setData(oData);
                        this._retrPayments(oData.results[i].InvoiceNum, '/results/' + i);
                        this._retrPaymentSumrys(oData.results[i].InvoiceNum, '/results/' + i);
                        this._retrPaymentItmes(oData.results[i].InvoiceNum, '/results/' + i);
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oChbkOData) {
                oChbkOData.read(sPath, oParameters);
            }
        };

        return CustomController;
    }
);
