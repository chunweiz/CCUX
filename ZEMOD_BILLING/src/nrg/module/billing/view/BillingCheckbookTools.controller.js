/*globals sap*/
/*globals ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'sap/ui/core/Fragment',
        'sap/ui/model/json/JSONModel',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'nrg/module/billing/view/ABPPopup'
    ],

    function (CoreController, Fragment, JSONModel, Filter, FilterOperator, ABPPopup) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.billing.view.BillingCheckbookTools');

        Controller.prototype.onInit = function () {

        };

        Controller.prototype.onBeforeRendering = function () {

        };

        Controller.prototype.onAfterRendering = function ()
		{

        };

        Controller.prototype._onAvgBillBtnClicked = function () {
            if (!this.ABPPopupCustomControl) {
                this.ABPPopupCustomControl = new ABPPopup();
                this.ABPPopupCustomControl.attachEvent("NNPCompleted", function () {}, this);
                this.getView().addDependent(this.ABPPopupCustomControl);
            }
            this.ABPPopupCustomControl.prepareABP();
        };

        return Controller;
    }
);
