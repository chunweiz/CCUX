/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/util/view/BaseController'
    ],

    function (CoreController, JQuery) {
        'use strict';

        var Controller = CoreController.extend('nrg.view.dashboard.CallerNoIDSearch');

        Controller.prototype.onInit = function () {
            //var oResultModel = new sap.ui.model.json.JSONModel('bpSearchResult'),
            var oModel,
                oParameters,
                oFilter,
                aFilter;
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'bpSearchResult');

            oModel = this.getOwnerComponent().getModel('comp-dashboard');

            if (oModel) {
                oFilter = new sap.ui.model.Filter("PartnerID", sap.ui.model.FilterOperator.EQ, "1121");
                aFilter = [];
                aFilter.push(oFilter);
                oParameters = {
                    filters : aFilter,
                    success : function (oData) {
                        if (oData.results) {
                            this.getView().getModel('bpSearchResult').setData(oData.results);
                        }
                    }.bind(this),
                    error: function (oError) {
                        this.getView().getModel('bpSearchResult').setData(null);
                    }
                };
                oModel.read('/BpSearchs', oParameters);
            }
        };

        return Controller;
    }
);
