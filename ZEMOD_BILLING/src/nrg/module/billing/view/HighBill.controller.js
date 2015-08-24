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
        };

        CustomController.prototype.onBeforeRendering = function () {
            this.getOwnerComponent().getCcuxApp().setTitle('HIGH BILL');
        };

        CustomController.prototype.onAfterRendering = function () {

        };

        CustomController.prototype.onExit = function () {

        };

        return CustomController;
    }
);
