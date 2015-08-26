/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/mvc/Controller'
    ],

    function (jQuery, Controller) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.billing.view.HighBill');

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
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Frank', lastName: 'Huang' },
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

            // Set data model for invoices

            var oModelInvoice = new sap.ui.model.json.JSONModel(
                [
                    { Period: '08/28/2014 - 09/28/2014', InvoiceNum: '0000000001', Index: '0' },
                    { Period: '09/28/2014 - 10/28/2014', InvoiceNum: '0000000002', Index: '1' },
                    { Period: '10/28/2014 - 11/28/2014', InvoiceNum: '0000000003', Index: '2' },
                    { Period: '11/28/2014 - 12/28/2014', InvoiceNum: '0000000004', Index: '3' },
                    { Period: '12/28/2014 - 01/28/2015', InvoiceNum: '0000000005', Index: '4' },
                    { Period: '01/28/2015 - 02/28/2015', InvoiceNum: '0000000006', Index: '5' }
                ]
            );

            this.getView().setModel(oModelInvoice, 'oAllInvoices');
            this.getView().getModel('oAllInvoices').setProperty('/selectedKey', 0);
            this.getView().getModel('oAllInvoices').setProperty('/selectedInvoiceNum', this.getView().getModel('oAllInvoices').oData[0].InvoiceNum);



        };

        CustomController.prototype.onBeforeRendering = function () {
            this.getOwnerComponent().getCcuxApp().setTitle('HIGH BILL');
        };

        CustomController.prototype.onAfterRendering = function () {

        };

        CustomController.prototype.onExit = function () {

        };

        CustomController.prototype._onInvoiceSelect = function (oEvent) {
            var selectedIndex = parseInt(oEvent.getParameters().selectedKey);
            this.getView().getModel('oAllInvoices').setProperty('/selectedInvoiceNum', this.getView().getModel('oAllInvoices').oData[selectedIndex].InvoiceNum);
        };


        return CustomController;
    }
);
