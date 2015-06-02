/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/util/view/BaseController',
        'jquery.sap.global'
    ],

    function (CoreController, JQuery) {
        'use strict';

        var Controller = CoreController.extend('nrg.view.dashboard.CallerNoIDSearch');

        Controller.prototype.onInit = function () {
            //var oResultModel = new sap.ui.model.json.JSONModel('bpSearchResult'),
            var oModel,
                oFilter;
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'bpSearchResult');

            oModel = this.getOwnerComponent().getModel('comp-dashboard');

            if (oModel) {
                oFilter = new sap.ui.model.Filter("PartnerID", sap.ui.model.FilterOperator.EQ, "1121");
                oModel.read('/BpSearchs', [oFilter, '$format=json'], {
                    fnSuccess: JQuery.proxy(function (oData) {
                        if (oData) {
                            this.getView().getModel('bpSearchResult').setData(oData);
                        }
                    }, this),

                    fnError: JQuery.proxy(function (oError) {
                        //alert('error');
                    }, this)
                });
            }
        };

        return Controller;
    }
);
