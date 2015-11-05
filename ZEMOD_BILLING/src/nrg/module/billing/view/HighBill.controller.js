/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'nrg/base/view/BaseController'
    ],

    function (jQuery, Controller) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.billing.view.HighBill');

        CustomController.prototype.onInit = function () {
            var o18n = this.getOwnerComponent().getModel('comp-i18n-billing'), // Set data model for invoices
                oModelInvoice = new sap.ui.model.json.JSONModel(
                    [
                        {
                            Period: '08/28/2014 - 09/28/2014',
                            InvoiceNum: '0000000001',
                            BillCharge: "$320.45",
                            Index: '0',
                            CusDriven: [
                                { Change: 'increase', Amount: '33%', Type: 'Usage Increase', Description: 'Compared to Previous Billing Cycle (07/25/2014 - 08/28/2014)' },
                                { Change: 'increase', Amount: '22%', Type: 'Usage Increase', Description: 'Compared to Same Month in 2013 Billing Cycle (08/26/2013 - 09/28/2013)' },
                                { Change: 'decrease', Amount: '4.25¢', Type: 'Energy Change', Description: 'Based on MTM Rate in Previous Billing Cycle (07/25/2014 - 08/28/2014)' },
                                { Change: 'increase', Amount: '30%', Type: 'Usage Increase', Description: 'Saturday 09/26/2014 Highest Usage During Week (09/21/2014 - 09/28/2014)' }
                            ]
                        },
                        {
                            Period: '09/28/2014 - 10/28/2014',
                            InvoiceNum: '0000000002',
                            BillCharge: "$120.25",
                            Index: '1',
                            CusDriven: [
                                { Change: 'increase', Amount: '33%', Type: 'Usage Increase', Description: 'Compared to Previous Billing Cycle (07/25/2014 - 08/28/2014)' },
                                { Change: 'increase', Amount: '22%', Type: 'Usage Increase', Description: 'Compared to Same Month in 2013 Billing Cycle (08/26/2013 - 09/28/2013)' },
                                { Change: 'decrease', Amount: '4.25¢', Type: 'Energy Change', Description: 'Based on MTM Rate in Previous Billing Cycle (07/25/2014 - 08/28/2014)' },
                                { Change: 'increase', Amount: '30%', Type: 'Usage Increase', Description: 'Saturday 09/26/2014 Highest Usage During Week (09/21/2014 - 09/28/2014)' },
                                { Change: 'decrease', Amount: '45%', Type: 'Usage Decrease', Description: 'Compared to Same Month in 2013 Billing Cycle (08/26/2013 - 09/28/2013)' },
                                { Change: 'increase', Amount: '33%', Type: 'Usage Increase', Description: 'Compared to Previous Billing Cycle (07/25/2014 - 08/28/2014)' },
                                { Change: 'increase', Amount: '22%', Type: 'Usage Increase', Description: 'Compared to Same Month in 2013 Billing Cycle (08/26/2013 - 09/28/2013)' }
                            ]
                        },
                        {
                            Period: '10/28/2014 - 11/28/2014',
                            InvoiceNum: '0000000003',
                            BillCharge: "$920.45",
                            Index: '2',
                            CusDriven: [
                                { Change: 'increase', Amount: '33%', Type: 'Usage Increase', Description: 'Compared to Previous Billing Cycle (07/25/2014 - 08/28/2014)' },
                                { Change: 'increase', Amount: '22%', Type: 'Usage Increase', Description: 'Compared to Same Month in 2013 Billing Cycle (08/26/2013 - 09/28/2013)' }
                            ]
                        },
                        {
                            Period: '11/28/2014 - 12/28/2014',
                            InvoiceNum: '0000000004',
                            BillCharge: "$1112.37",
                            Index: '3',
                            CusDriven: [
                                { Change: 'decrease', Amount: '4.25¢', Type: 'Energy Change', Description: 'Based on MTM Rate in Previous Billing Cycle (07/25/2014 - 08/28/2014)' },
                                { Change: 'increase', Amount: '30%', Type: 'Usage Increase', Description: 'Saturday 09/26/2014 Highest Usage During Week (09/21/2014 - 09/28/2014)' },
                                { Change: 'decrease', Amount: '45%', Type: 'Usage Decrease', Description: 'Compared to Same Month in 2013 Billing Cycle (08/26/2013 - 09/28/2013)' },
                                { Change: 'increase', Amount: '33%', Type: 'Usage Increase', Description: 'Compared to Previous Billing Cycle (07/25/2014 - 08/28/2014)' },
                                { Change: 'increase', Amount: '22%', Type: 'Usage Increase', Description: 'Compared to Same Month in 2013 Billing Cycle (08/26/2013 - 09/28/2013)' }
                            ]
                        },
                        {
                            Period: '12/28/2014 - 01/28/2015',
                            InvoiceNum: '0000000005',
                            BillCharge: "$325.15",
                            Index: '4',
                            CusDriven: [
                                { Change: 'increase', Amount: '33%', Type: 'Usage Increase', Description: 'Compared to Previous Billing Cycle (07/25/2014 - 08/28/2014)' },
                                { Change: 'increase', Amount: '22%', Type: 'Usage Increase', Description: 'Compared to Same Month in 2013 Billing Cycle (08/26/2013 - 09/28/2013)' }
                            ]
                        },
                        {
                            Period: '01/28/2015 - 02/28/2015',
                            InvoiceNum: '0000000006',
                            BillCharge: "$108.32",
                            Index: '5',
                            CusDriven: [
                                { Change: 'decrease', Amount: '4.25¢', Type: 'Energy Change', Description: 'Based on MTM Rate in Previous Billing Cycle (07/25/2014 - 08/28/2014)' },
                                { Change: 'increase', Amount: '30%', Type: 'Usage Increase', Description: 'Saturday 09/26/2014 Highest Usage During Week (09/21/2014 - 09/28/2014)' },
                                { Change: 'decrease', Amount: '45%', Type: 'Usage Decrease', Description: 'Compared to Same Month in 2013 Billing Cycle (08/26/2013 - 09/28/2013)' },
                                { Change: 'increase', Amount: '33%', Type: 'Usage Increase', Description: 'Compared to Previous Billing Cycle (07/25/2014 - 08/28/2014)' },
                                { Change: 'increase', Amount: '22%', Type: 'Usage Increase', Description: 'Compared to Same Month in 2013 Billing Cycle (08/26/2013 - 09/28/2013)' },
                                { Change: 'decrease', Amount: '4.25¢', Type: 'Energy Change', Description: 'Based on MTM Rate in Previous Billing Cycle (07/25/2014 - 08/28/2014)' },
                                { Change: 'increase', Amount: '30%', Type: 'Usage Increase', Description: 'Saturday 09/26/2014 Highest Usage During Week (09/21/2014 - 09/28/2014)' },
                                { Change: 'decrease', Amount: '45%', Type: 'Usage Decrease', Description: 'Compared to Same Month in 2013 Billing Cycle (08/26/2013 - 09/28/2013)' },
                                { Change: 'increase', Amount: '33%', Type: 'Usage Increase', Description: 'Compared to Previous Billing Cycle (07/25/2014 - 08/28/2014)' },
                                { Change: 'increase', Amount: '22%', Type: 'Usage Increase', Description: 'Compared to Same Month in 2013 Billing Cycle (08/26/2013 - 09/28/2013)' }
                            ]
                        }
                    ]
                );

            this.getView().setModel(oModelInvoice, 'oAllInvoices');
            this.getView().getModel('oAllInvoices').setProperty('/selectedKey', 0);
            this.getView().getModel('oAllInvoices').setProperty('/selectedInvoiceNum', this.getView().getModel('oAllInvoices').oData[0].InvoiceNum);
            this.getView().getModel('oAllInvoices').setProperty('/selectedBillCharge', this.getView().getModel('oAllInvoices').oData[0].BillCharge);
            // oData model for Customer Driven Content
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oCusDriven');
            this.getView().getModel('oCusDriven').setData(this.getView().getModel('oAllInvoices').oData[0].CusDriven);
        };

        CustomController.prototype.onBeforeRendering = function () {
            this.getOwnerComponent().getCcuxApp().setTitle('HIGH BILL');
            this.initRouterParameter();
        };

        CustomController.prototype.onAfterRendering = function () {

        };

        CustomController.prototype.onExit = function () {

        };

        CustomController.prototype.initRouterParameter = function () {
            var oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo();

            this._bpNum = oRouteInfo.parameters.bpNum;
            this._caNum = oRouteInfo.parameters.caNum;
            this._coNum = oRouteInfo.parameters.coNum;
        };

        CustomController.prototype._onInvoiceSelect = function (oEvent) {
            var selectedIndex = parseInt(oEvent.getParameters().selectedKey, 10);
            this.getView().getModel('oAllInvoices').setProperty('/selectedInvoiceNum', this.getView().getModel('oAllInvoices').oData[selectedIndex].InvoiceNum);
            this.getView().getModel('oAllInvoices').setProperty('/selectedBillCharge', this.getView().getModel('oAllInvoices').oData[selectedIndex].BillCharge);
            // Set model for Customer Driven Content
            this.getView().getModel('oCusDriven').setData(this.getView().getModel('oAllInvoices').oData[selectedIndex].CusDriven);
        };

        CustomController.prototype._onBackToDashboard = function () {
            var oRouter = this.getOwnerComponent().getRouter();

            if (this._coNum) {
                oRouter.navTo('dashboard.VerificationWithCaCo', {bpNum: this._bpNum, caNum: this._caNum, coNum: this._coNum});
            } else {
                oRouter.navTo('dashboard.VerificationWithCa', {bpNum: this._bpNum, caNum: this._caNum});
            }
        };

        CustomController.prototype._getArrowIcon = function (value) {
            var map = { "increase" : "sap-icon://up", "decrease" : "sap-icon://down" };
            return (value && map[value]) ? map[value] : "None";
        };


		//function to navigate to the Rate history page
		CustomController.prototype._onRatehistory = function () {
			/*var oRouter = this.getOwnerComponent().getRouter();*/

			if (this._coNum) {
				this.navTo('campaignhistory', {bpNum: this._bpNum, caNum: this._caNum, coNum: this._coNum});
			}
		};

		//function to navigate to the Usage history page
		CustomController.prototype._onUsagehistory = function () {
			var _coNum = "0006970391",
			    _typeV = "QD";
			   /* oRouter = this.getOwnerComponent().getRouter();*/

			if (this._coNum) {
				this.navTo('usage', {bpNum: this._bpNum, caNum: this._caNum, coNum: this._coNum, typeV: "QD"});
			}
		};


        return CustomController;
    }
);
