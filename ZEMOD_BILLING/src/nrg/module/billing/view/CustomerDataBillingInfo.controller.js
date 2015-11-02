/*globals sap*/
/*global ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel',
        'nrg/module/quickpay/view/QuickPayControl',
        'nrg/base/type/Price',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator'
    ],

    function (jQuery, Controller, JSONModel, QuickPayControl, Type_Price, Filter, FilterOperator) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.billing.view.CustomerDataBillingInfo');

        CustomController.prototype.onInit = function () {

        };
        CustomController.prototype.onAfterRendering = function () {
             this.getOwnerComponent().getCcuxApp().setLayout('FullWidthTool');
        };
        CustomController.prototype.onBeforeRendering = function () {

            this.getOwnerComponent().getCcuxApp().setTitle('BILLING INFO');

            this.getView().setModel(this.getOwnerComponent().getModel('comp-billing'), 'oDataSvc');
            this.getView().setModel(this.getOwnerComponent().getModel('comp-billing-invoice'), 'oDataInvoiceSvc');

            //Models for BillingInvoices
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oBillingInvoices');

            //Models for Invoice Details
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oPmtSummary');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oPmtPayments');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oPmtItems');

            // Models for Invoice Select Popup
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oInvoiceSelectInfo');

            //Starting invoices retriviging
            this._initRoutingInfo();
            this._initRetrBillInvoices();
            this._initBillingMsgs();
        };

       /**
		 * Iniitalize the msgs in the Billing Info Page
		 *
		 * @function
		 *
		 * @private
		 */

        CustomController.prototype._initBillingMsgs = function () {
            var aFilterIds,
                aFilterValues,
                aFilters,
                oBindingInfo1,
                oBindingInfo2,
                oBillingMsgTag = this.getView().byId("idnrgBillingMsgs"),
                oBillingMsgTagTemplate = this.getView().byId("idnrgBillingMsgsTemp"),
                oDunningMsgTag = this.getView().byId("idnrgBilDunMsgs"),
                oDunningMsgTagTemplate = this.getView().byId("idnrgBilDunMsgsTemp"),
                sPath = "/AlertsSet",
                fnTableDataRecdHandler = function (oEvent) {
                };
            aFilterIds = ["BP", "CA", "Identifier"];
            aFilterValues = [this._bpNum, this._caNum, "BILLING"];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            oBindingInfo1 = {
                model : "comp-billing",
                path : sPath,
                template : oBillingMsgTagTemplate,
                filters : aFilters,
                events: {dataReceived : fnTableDataRecdHandler}
            };
            oBillingMsgTag.bindAggregation("content", oBindingInfo1);
            aFilterIds = ["BP", "CA", "Identifier"];
            aFilterValues = [this._bpNum, this._caNum, "DUNNING"];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            oBindingInfo2 = {
                model : "comp-billing",
                path : sPath,
                template : oDunningMsgTagTemplate,
                filters : aFilters,
                events: {dataReceived : fnTableDataRecdHandler}
            };
            oDunningMsgTag.bindAggregation("content", oBindingInfo2);
        };
       /**
		 * Assign the filter objects based on the input selection
		 *
		 * @function
		 * @param {Array} aFilterIds to be used as sPath for Filters
         * @param {Array} aFilterValues for each sPath
		 * @private
		 */
        Controller.prototype._createSearchFilterObject = function (aFilterIds, aFilterValues) {
            var aFilters = [],
                iCount;

            for (iCount = 0; iCount < aFilterIds.length; iCount = iCount + 1) {
                aFilters.push(new Filter(aFilterIds[iCount], FilterOperator.EQ, aFilterValues[iCount], ""));
            }
            return aFilters;
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

        /*------------------------------------------------ UI Element Actions -----------------------------------------------*/

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

        /*---------------------------------------------- Invoice Selection Popup --------------------------------------------*/

        CustomController.prototype._onInvoiceNumClicked = function () {
            var bRetrieveComplete = false;

            // Display the loading indicator
            this.getOwnerComponent().getCcuxApp().setOccupied(true);

            if (!this._oInvSelectPopup) {
                this._oInvSelectPopup = ute.ui.main.Popup.create({
                    content: sap.ui.xmlfragment(this.getView().sId, "nrg.module.billing.view.InvSelectPopup", this),
                    title: 'INVOICE SELECTION'
                });
                this._oInvSelectPopup.addStyleClass('nrgBilling-invSelectPopup');
                this.getView().addDependent(this._oInvSelectPopup);

                this.getView().byId('id_nrgBilling-invSel-stDate').attachBrowserEvent('select', this._handleDateRanggeChange, this);
                //jQuery.sap.byId('id_nrgBilling-invSel-stDate').bind("sapfocusleave", jQuery.proxy(this.handleDateChange, this));
                //jQuery.sap.byId(this.getView().byId('InvSelectPopup--nrgBilling-invSel-stDate')).bind("onsapfocusleave", jQuery.proxy(this.handleDateChange, this));
            }

            this._retrieveInvoiceInfo(this._caNum, function () {bRetrieveComplete = true;});
            this._oInvSelectPopup.open();

            // Check the completion of retrieving data
            var checkRetrComplete = setInterval (function () {
                if (bRetrieveComplete) {
                    // Dismiss the loading indicator
                    this.getOwnerComponent().getCcuxApp().setOccupied(false);
                    clearInterval(checkRetrComplete);
                }
            }.bind(this), 100);
        };

        CustomController.prototype._retrieveInvoiceInfo = function (sCaNumber, fnCallback) {
            var sPath = '/InvoiceS',
                aFilters = [];
                aFilters.push(new Filter({ path: 'ContAccount', operator: FilterOperator.EQ, value1: sCaNumber}));

            var oModel = this.getView().getModel('oDataInvoiceSvc'),
                oInvSelModel = this.getView().getModel('oInvoiceSelectInfo'),
                aInvoiceData = [],
                oParameters;

            oParameters = {
                filters: aFilters,
                success : function (oData) {
                    if (oData.results) { 
                        
                        oInvSelModel.setData(oData.results);
                        
                        // Generate the table
                        var tableContainer = this.getView().byId('nrgBilling-invSelPopup-tableBody');

                        // Remove previous content
                        var rowNumer = tableContainer.getContent().length;
                        for (var j = 0; j < rowNumer; j++) tableContainer.removeContent(0);
                            
                        // Process the new data                        
                        for (var i = 0; i < oInvSelModel.oData.length; i++) {
                            // Add self-defined attribute
                            oInvSelModel.oData[i].View = false;
                            // Create table row element
                            var rowElement = new ute.ui.commons.Tag({elem: 'div'}).addStyleClass('nrgBilling-invSelPopup-tableRow');
                            if ((i + 1) % 2 === 0) rowElement.addStyleClass('nrgBilling-invSelPopup-tableRow-even');
                            // Insert row element childs
                            rowElement.addContent(new ute.ui.commons.Tag({elem: 'div', text: oInvSelModel.oData[i].Date}).addStyleClass('nrgBilling-invSelPopup-tableRow-item').addStyleClass('date'));
                            rowElement.addContent(new ute.ui.commons.Tag({elem: 'div', text: oInvSelModel.oData[i].PrintDoc}).addStyleClass('nrgBilling-invSelPopup-tableRow-item').addStyleClass('number'));
                            rowElement.addContent(new ute.ui.commons.Tag({elem: 'div', text: oInvSelModel.oData[i].DataType}).addStyleClass('nrgBilling-invSelPopup-tableRow-item').addStyleClass('description'));
                            rowElement.addContent(new ute.ui.main.Checkbox({checked: oInvSelModel.oData[i].View}).addStyleClass('nrgBilling-invSelPopup-tableRow-item').addStyleClass('view'));
                            // Insert the row element to table
                            tableContainer.addContent(rowElement);
                        }

                        // Execute the callback function
                        if (fnCallback) fnCallback();

                    } else {
                        
                    }
                }.bind(this),
                error: function (oError) {
                
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        CustomController.prototype._handleDateRanggeChange = function (oEvent) {
            var tt = this.getView().byId('id_nrgBilling-invSel-stDate');
            return;
        };

        CustomController.prototype._onSelectAll = function (oEvent) {
            var oTable = this.getView().byId('nrgBilling-invSelPopup-tableBody');

            for (var i = 0; i < oTable.getContent().length; i++) {                
                var oCheckbox = oTable.getContent()[i].getContent()[3];
                oCheckbox.setChecked(oEvent.getParameters().checked);
            }
        };

        CustomController.prototype._onOpenBtnClick = function (oEvent) {
            var oTable = this.getView().byId('nrgBilling-invSelPopup-tableBody'),
                oInvSelModel = this.getView().getModel('oInvoiceSelectInfo');

            for (var i = 0; i < oTable.getContent().length; i++) {                
                var oCheckbox = oTable.getContent()[i].getContent()[3];
                if (oCheckbox.getChecked()) {
                    this._openNewWindowDelayed(oInvSelModel.oData[i].URL);
                }
            }
        };

        CustomController.prototype._openNewWindowDelayed = function (sUrl) {
            var openNewWindow = setTimeout(function() {
                window.open(sUrl, '_blank');
            }, 1000);
        };





























        /**
		 * Handler for Dunning Lock Press
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onMessages = function (oEvent) {
            var sPath,
                oBindingInfo,
                oDunningLocksTable,
                oDunningLocksTemplate,
                fnRecievedHandler,
                that = this;
            this.getOwnerComponent().getCcuxApp().setOccupied(true);
            if (!this._oDialogFragment) {
                this._oDialogFragment = sap.ui.xmlfragment("DunnlingLocks", "nrg.module.billing.view.DunningPopup", this);
            }
            if (this._oDunningDialog === undefined) {
                this._oDunningDialog = new ute.ui.main.Popup.create({
                    title: 'Dunning',
                    content: this._oDialogFragment
                });
            }
            sPath = oEvent.getSource().getBindingContext("comp-billing").getPath() + "/DunningLocksSet";
            oDunningLocksTable = sap.ui.core.Fragment.byId("DunnlingLocks", "idnrgBillDn-Table");
            oDunningLocksTemplate = sap.ui.core.Fragment.byId("DunnlingLocks", "idnrgBillDn-Row");
            fnRecievedHandler = function () {
                that.getOwnerComponent().getCcuxApp().setOccupied(false);
            };
            oBindingInfo = {
                model : "comp-billing",
                path : sPath,
                template : oDunningLocksTemplate,
                events: {dataReceived : fnRecievedHandler}
            };
            this.getView().addDependent(this._oDunningDialog);
            //to get access to the global model
            this._oDunningDialog.addStyleClass("nrgCamHis-dialog");
            oDunningLocksTable.bindRows(oBindingInfo);
            this._oDunningDialog.open();
        };
        return CustomController;
    }
);
