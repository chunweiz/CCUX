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

            var oModelStartInvoice = new sap.ui.model.json.JSONModel(
                [
                    { Date: '09/28/2014', Index: '0' },
                    { Date: '10/28/2014', Index: '1' },
                    { Date: '11/28/2014', Index: '2' },
                    { Date: '12/28/2014', Index: '3' },
                    { Date: '01/28/2015', Index: '4' },
                    { Date: '02/28/2016', Index: '5' }
                ]
            );

            var oModelEndInvoice = new sap.ui.model.json.JSONModel(
                [
                    { Date: '09/28/2014', Index: '0' },
                    { Date: '10/28/2014', Index: '1' },
                    { Date: '11/28/2014', Index: '2' },
                    { Date: '12/28/2014', Index: '3' },
                    { Date: '01/28/2015', Index: '4' },
                    { Date: '02/28/2016', Index: '5' }
                ]
            );
            this.getView().setModel(oModelStartInvoice, 'oStartInvoice');
            this.getView().setModel(oModelEndInvoice, 'oEndInvoice');
            this.getView().getModel('oStartInvoice').setProperty('/selectedKey', 0);
            this.getView().getModel('oEndInvoice').setProperty('/selectedKey', 0);



        };

        CustomController.prototype.onBeforeRendering = function () {
            this.getOwnerComponent().getCcuxApp().setTitle('HIGH BILL');
        };

        CustomController.prototype.onAfterRendering = function () {

        };

        CustomController.prototype.onExit = function () {

        };

        CustomController.prototype._onStartInvoiceSelect = function () {

        };


        return CustomController;
    }
);
