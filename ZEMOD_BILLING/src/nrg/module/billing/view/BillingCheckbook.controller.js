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
            var o18n = this.getOwnerComponent().getModel('comp-i18n-billing');

            var oModel = new sap.ui.model.json.JSONModel({
                employees: [
                    { firstName: 'Roger', lastName: 'Cheng' },
                    { firstName: 'Yumi', lastName: 'Yao' },
                    { firstName: 'Yumi', lastName: 'Yao' },
                    { firstName: 'Yumi', lastName: 'Yao' },
                    { firstName: 'Yumi', lastName: 'Yao' },
                    { firstName: 'Taylor', lastName: 'Hsu' }
                ]
            });

            var oModelContent = new sap.ui.model.json.JSONModel({
                employers: [
                    { firstName: 'Kacy', lastName: 'Liao' },
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Joseph', lastName: 'Lin' }
                ]
            });

            var oModelToolTip = new sap.ui.model.json.JSONModel({
                employers: [
                    { firstName: 'Kacy', lastName: 'Liao' },
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Joseph', lastName: 'Lin' }
                ]
            });

            this.getView().setModel(oModel, 'bp');
            this.getView().setModel(oModelContent, 'emp');
            this.getView().setModel(oModelToolTip, 'tip');
        };

        CustomController.prototype.onBeforeRendering = function () {
            this.getOwnerComponent().getCcuxApp().setTitle('BILLING');

            var o18n = this.getOwnerComponent().getModel('comp-i18n-billing');

            this.getView().setModel(this.getOwnerComponent().getModel('comp-billing'), 'oDataSvc');

            //Model to keep checkbook header
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oChkbkHdr');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oPaymentHdr');

            //Model to keep CheckBook detail data
            /*this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oPayments');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oPaymentItems');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oPaymentSumrys');*/


            //Start of data retriving
            this._initRouitingInfo();
            this._initChkbookHdr();
            this._initPaymentHdr();
        };

        CustomController.prototype.onAfterRendering = function () {
        };

        CustomController.prototype.onExit = function () {
        };


        /*****************************************************************************************************************************************************/
        //Formatter Functions
        CustomController.prototype._formatDate = function (oDate) {
            var sFormattedDate;

            sFormattedDate = (oDate.getMonth() + 1).toString() + '/' + oDate.getDate().toString() + '/' + oDate.getFullYear().toString().substring(2, 4);
            return sFormattedDate;
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
                        this.getView().getModel('oPaymentHdr').setProperty(sBindingPath + '/Payment', oData);
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

        CustomController.prototype._initRouitingInfo = function () {
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
                i;

            oParameters = {
                success : function (oData) {
                    if (oData) {

                        for (i = 0; i < oData.results.length; i = i + 1) {
                            if (i !== oData.results.length - 1) {
                                oData.results[i].bExpand = false;
                            } else {
                                oData.results[i].bExpand = true;
                            }
                        }
                        this.getView().getModel('oPaymentHdr').setData(oData);
                        i = i - 1;  //At this moment i is the lengh of oData, need the index of the last element
                        this._retrPayments(oData.results[i].InvoiceNum, '/results/' + i);
                        this._retrPaymentSumrys(oData.results[i].InvoiceNum, '/results/' + i);
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
