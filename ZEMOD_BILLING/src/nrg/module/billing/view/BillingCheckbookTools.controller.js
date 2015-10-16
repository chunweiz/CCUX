/*globals sap*/
/*globals ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'sap/ui/core/Fragment',
        'sap/ui/model/json/JSONModel'
    ],

    function (CoreController, Fragment, JSONModel) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.billing.view.BillingCheckbookTools');

        Controller.prototype.onInit = function ()
        {
            this.getView().setModel(this.getOwnerComponent().getModel('comp-billing'), 'oDataAvgSvc');
        };

        Controller.prototype.onAfterRendering = function ()
		{
			var graphModel = new sap.ui.model.json.JSONModel({
                data: [
                    { usageDate: '07/01/2013', usage: 1456 },
                    { usageDate: '06/01/2013', usage: 1210 },
                    { usageDate: '05/01/2013', usage: 1144 },
                    { usageDate: '04/01/2013', usage: 1357 },
                    { usageDate: '03/01/2013', usage: 1543 },
                    { usageDate: '02/01/2013', usage: 1654 },
                    { usageDate: '01/01/2013', usage: 1356 },
                    { usageDate: '12/01/2014', usage: 1158 },
                    { usageDate: '11/01/2014', usage: 1582 },
                    { usageDate: '10/01/2014', usage: 1055 },
                    { usageDate: '09/01/2014', usage: 1286 },
                    { usageDate: '08/01/2014', usage: 1574 },
                    { usageDate: '07/01/2014', usage: 1258 },
                    { usageDate: '06/01/2014', usage: 1345 },
                    { usageDate: '05/01/2014', usage: 1526 },
                    { usageDate: '04/01/2014', usage: 1712 },
                    { usageDate: '03/01/2014', usage: 1462 },
                    { usageDate: '02/01/2014', usage: 1155 },
                    { usageDate: '01/01/2014', usage: 1018 },
                    { usageDate: '12/01/2015', usage: 1332 },
                    { usageDate: '11/01/2015', usage: 1450 },
                    { usageDate: '10/01/2015', usage: 1280 },
                    { usageDate: '09/01/2015', usage: 1390 },
                    { usageDate: '08/01/2015', usage: 1420 },
                    { usageDate: '07/01/2015', usage: 1380 },
                    { usageDate: '06/01/2015', usage: 1400 },
                    { usageDate: '05/01/2015', usage: 1300 }
                ]
            });

            var btnModel = new sap.ui.model.json.JSONModel({
                amount: "$60.00"
            });

            var historyModel = new sap.ui.model.json.JSONModel(
                [
                    {
                        Month: '08/28/14',
                        Usage: '1450',
                        UsageCharge: '$80.00',
                        Avg: '$60.00',
                        Adj: '$10.00',
                        Deferred: '$20.00'
                    },
                    {
                        Month: '07/28/14',
                        Usage: '1250',
                        UsageCharge: '$90.00',
                        Avg: '$65.00',
                        Adj: '$15.00',
                        Deferred: '$45.00'
                    },
                    {
                        Month: '06/28/14',
                        Usage: '1246',
                        UsageCharge: '$50.00',
                        Avg: '$70.00',
                        Adj: '$20.00',
                        Deferred: '$25.00'
                    },
                    {
                        Month: '05/28/14',
                        Usage: '1150',
                        UsageCharge: '$50.00',
                        Avg: '$70.00',
                        Adj: '$20.00',
                        Deferred: '$25.00'
                    },
                    {
                        Month: '04/28/14',
                        Usage: '1264',
                        UsageCharge: '$90.00',
                        Avg: '$65.00',
                        Adj: '$25.00',
                        Deferred: '$45.00'
                    },
                    {
                        Month: '03/28/14',
                        Usage: '1350',
                        UsageCharge: '$80.00',
                        Avg: '$60.00',
                        Adj: '$20.00',
                        Deferred: '$20.00'
                    },
                    {
                        Month: '02/28/14',
                        Usage: '1035',
                        UsageCharge: '$90.00',
                        Avg: '$60.00',
                        Adj: '$30.00',
                        Deferred: '$15.00'
                    },
                    {
                        Month: '01/28/14',
                        Usage: '1440',
                        UsageCharge: '$55.00',
                        Avg: '$65.00',
                        Adj: '$10.00',
                        Deferred: '$10.00'
                    }
                ]
            );

            this.getView().setModel(graphModel, 'oUsageGraph');
            this.getView().setModel(btnModel, 'oAmountBtn');
            this.getView().setModel(historyModel, 'oAmountHistory');
        };

        Controller.prototype._onAvgBillBtnClicked = function () {
            if (!this._oAvgBillPopup) {
                this._oAvgBillPopup = ute.ui.main.Popup.create({
                    content: sap.ui.xmlfragment(this.getView().sId, "nrg.module.billing.view.AverageBillingPlan", this),
                    title: 'AVERAGE BILLING PLAN'
                });
                this._oAvgBillPopup.addStyleClass('nrgBilling-avgBillingPopup');
                this.getView().addDependent(this._oAvgBillPopup);
				this._oAvgBillPopup.bindElement('/data');
				this.byId("chart").setDataModel(this.getView().getModel('oUsageGraph'));
            }

            this._oAvgBillPopup.open();

            var oAvgOData = this.getView().getModel('oDataAvgSvc');
            return;
        };

        Controller.prototype.onSelected = function (oEvent) {
            var oCheckbox = oEvent.getSource(),
                sYear = oCheckbox.getId().replace(this.getView().getId() + '--', ''),
                bHide = oCheckbox.getChecked(),
                oChart = this.getView().byId('chart');

            if (oChart) {
                oChart.hideUsage(sYear, !bHide);
            }
        };

        return Controller;
    }
);
