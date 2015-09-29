/*globals sap*/
/*global ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel',
        'nrg/module/quickpay/view/QuickPayControl',
        'nrg/base/type/Price'
    ],

    function (jQuery, Controller, JSONModel, QuickPayControl, Type_Price) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.billing.view.CustomerDataBillingInfo');

        CustomController.prototype.onInit = function () {
        };

        CustomController.prototype.onBeforeRendering = function () {
            this.getOwnerComponent().getCcuxApp().setTitle('BILLING INFO');

            this.getView().setModel(this.getOwnerComponent().getModel('comp-billing'), 'oDataSvc');

            //Models for BillingInvoices
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oBillingInvoices');

            //Models for Invoice Details
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oPmtSummary');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oPmtPayments');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oPmtItems');

            //Starting invoices retriviging
            this._initRoutingInfo();
            this._initRetrBillInvoices();
        };

        CustomController.prototype.onAfterRendering = function () {
        };

        CustomController.prototype.onExit = function () {
        };

        CustomController.prototype._initRoutingInfo = function () {
            var oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo();

            this._bpNum = oRouteInfo.parameters.bpNum;
            this._caNum = oRouteInfo.parameters.caNum;
            this._coNum = oRouteInfo.parameters.coNum;
        };


        CustomController.prototype._initRetrBillInvoices = function () {
            var oChbkOData = this.getView().getModel('oDataSvc'),
                sPath,
                oParameters;

            sPath = '/BillInvoices(\'' + this._caNum + '\')';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oBillingInvoices').setData(oData);
                        this._curInvNum = oData.InvoiceNum;
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

        CustomController.prototype._initRetrInvoiceDetail = function (sInvNum) {
            this._retrInvSumry(sInvNum);
            this._retrInvPmts(sInvNum);
            this._retrInvItems(sInvNum);
        };

        CustomController.prototype._retrInvSumry = function (sInvNum) {
            var oChbkOData = this.getView().getModel('oDataSvc'),
                sPath,
                oParameters;

            sPath = '/PaymentHdrs(\'' + sInvNum + '\')/PaymentSumry';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oPmtSummary').setData(oData.results[0]);
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

        CustomController.prototype._retrInvPmts = function (sInvNum) {
            var oChbkOData = this.getView().getModel('oDataSvc'),
                sPath,
                oParameters;

            sPath = '/PaymentHdrs(\'' + sInvNum + '\')/Payments';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oPmtPayments').setData(oData);
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

        CustomController.prototype._retrInvItems = function (sInvNum) {
            var oChbkOData = this.getView().getModel('oDataSvc'),
                sPath,
                oParameters;

            sPath = '/PaymentHdrs(\'' + sInvNum + '\')/PaymentItems';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oPmtItems').setData(oData);
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

        /*************************************************************************************************************************/
        //Formatter Functions
        CustomController.prototype._formatDate = function (oDate) {
            var sFormattedDate;

            if (!oDate) {
                return null;
            } else {
                sFormattedDate = (oDate.getMonth() + 1).toString() + '/' + oDate.getDate().toString() + '/' + oDate.getFullYear().toString();
                return sFormattedDate;
            }
        };
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
        /*************************************************************************************************************************/

        /*************************************************************************************************************************/
        //Handlers
        /*************************************************************************************************************************/
        CustomController.prototype._onInvoiceAmntClicked = function (oEvent) {
            var i18nModel =  this.getOwnerComponent().getModel('comp-i18n-billing'),
                popupTitle = i18nModel.getProperty("nrgBilling-paymentsPopup-ACCOUNT_SUMMARY");

            if (!this._oInvoicePopup) {
                this._oInvoicePopup = sap.ui.xmlfragment("PaymentPopup", "nrg.module.billing.view.InvoicePopup", this);
                this._oInvoicePopup = ute.ui.main.Popup.create({
                    content: this._oInvoicePopup,
                    title: popupTitle
                });

                this._oInvoicePopup.setShowCloseButton(true);
                this.getView().addDependent(this._oInvoicePopup);
            }

            this._oInvoicePopup.open();

            if (this._curInvNum) {
                this._initRetrInvoiceDetail(this._curInvNum);
            }
        };

        CustomController.prototype._onPaymentsClicked = function (oEvent) {
            var i18nModel =  this.getOwnerComponent().getModel('comp-i18n-billing'),
                popupTitle = i18nModel.getProperty("nrgBilling-paymentsPopup-PAYMENTS");

            if (!this._oPaymentPopup) {
                this._oPaymentPopup = sap.ui.xmlfragment("PaymentPopup", "nrg.module.billing.view.PaymentsPopup", this);
                this._oPaymentsPopup = ute.ui.main.Popup.create({
                    content: this._oPaymentPopup,
                    title: popupTitle
                });

                this._oPaymentsPopup.setShowCloseButton(true);
                this.getView().addDependent(this._oPaymentsPopup);
            }

            this._oPaymentsPopup.open();
        };

        CustomController.prototype.onPayNow = function (oEvent) {
            var QuickControl = new QuickPayControl();

            this._sContract = this._coNum;
            this._sBP = this._bpNum;
            this._sCA = this._caNum;
            this.getView().addDependent(QuickControl);
            QuickControl.openQuickPay(this._sContract, this._sBP, this._sCA);
        };

        CustomController.prototype._onChkbookLnkClicked = function () {
            var oRouter = this.getOwnerComponent().getRouter();

            if (this._coNum) {
                oRouter.navTo('billing.CheckBook', {bpNum: this._bpNum, caNum: this._caNum, coNum: this._coNum});
            } else {
                oRouter.navTo('billing.CheckBookNoCo', {bpNum: this._bpNum, caNum: this._caNum});
            }
        };

        CustomController.prototype._onHighbillLnkClicked = function () {
            var oRouter = this.getOwnerComponent().getRouter();

            if (this._coNum) {
                oRouter.navTo('billing.HighBill', {bpNum: this._bpNum, caNum: this._caNum, coNum: this._coNum});
            } else {
                oRouter.navTo('billing.HighBillNoCo', {bpNum: this._bpNum, caNum: this._caNum});
            }
        };

        CustomController.prototype._onInvoiceNumClicked = function () {
            if (!this._oInvSelectPopup) {
                this._oInvSelectPopup = sap.ui.xmlfragment("InvSelectPopup", "nrg.module.billing.view.InvSelectPopup", this);
                this._oInvSelectPopup = ute.ui.main.Popup.create({
                    content: this._oInvSelectPopup,
                    title: "INVOICE SELECTION"
                });

                this.getView().addDependent(this._oInvSelectPopup);
            }

            this._oInvSelectPopup.addStyleClass('nrgBilling-invSelPopupTop');
            this._oInvSelectPopup.open();
        };

        CustomController.prototype.test = function (oEvent) {
            var tt0 = oEvent;
        };
        /*************************************************************************************************************************/




        return CustomController;
    }
);
