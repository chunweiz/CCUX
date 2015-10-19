sap.ui.define(
    [
        'jquery.sap.global',
        'nrg/base/view/BaseController',
        'nrg/base/type/Price'
    ],

    function (jQuery, Controller, Type_Price) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.billing.view.PrePayCheckbook');

        CustomController.prototype.onInit = function () {
            this.getOwnerComponent().getCcuxApp().setTitle('BILLING');
        };

        CustomController.prototype.onBeforeRendering = function () {
            this.getView().setModel(this.getOwnerComponent().getModel('comp-billing'), 'oDataSvc');

            //Model to keep checkbook header
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oPpChkbkHdr');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oPpPaymentHdr');

        };

        return CustomController;
    }
);
