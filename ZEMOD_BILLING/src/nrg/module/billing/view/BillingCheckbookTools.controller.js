/*globals sap*/
/*globals ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller'
    ],

    function (CoreController) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.billing.view.BillingCheckbookTools');

        Controller.prototype.onInit = function () {
        };

        Controller.prototype.onBeforeRendering = function () {
        };

        Controller.prototype._onAvgBillBtnClicked = function () {
            if (!this._oAvgBillPopup) {
                this._oAvgBillPopup = ute.ui.main.Popup.create({
                    content: sap.ui.xmlfragment(this.getView().sId, "nrg.module.billing.view.AverageBillingPlan", this),
                    title: 'AVERAGE BILLING PLAN'
                });
                this.getView().addDependent(this._oAvgBillPopup);
            }

            this._oAvgBillPopup.open();
            return;
        };

        return Controller;
    }
);
