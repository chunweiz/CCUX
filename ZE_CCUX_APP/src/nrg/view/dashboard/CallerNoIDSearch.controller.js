/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/util/view/BaseController',
        'sap.ui.model.Filter',
        'sap.ui.model.FilterOperator'
    ],

    function (CoreController, Filter, FilterOperator) {
        'use strict';

        var Controller = CoreController.extend('nrg.view.dashboard.CallerNoIDSearch');

        Controller.prototype.onInit = function () {
            var oSearchBpODataModel,
                oParameters,
                oFilter,
                aFilter;



            /*Models in the controller*/

            //get OData Model from component level first
            this.getView().setModel(this.getOwnerComponent().getModel('comp-dashboard'), 'oSearchBpODataModel');
            //JSON model for search result
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oBpSearchResult');


        };

        Controller.prototype.onSearch = function () {
            this._searchBP('/BpSearchs', this._createSearchParameters());
        };

        Controller.prototype._createSearchParameters = function () {
            var oFilter, aFilter, oParameters;


            /*This need to be re-written*/
            oFilter = new Filter("PartnerID", FilterOperator.EQ, "1121");
            aFilter = [];
            aFilter.push(oFilter);

            oParameters = {
                filters : aFilter,
                success : function (oData) {
                    if (oData.results) {
                        this.getView().getModel('oBpSearchResult').setData(oData.results);
                    }
                }.bind(this),
                error: function (oError) {
                    this.getView().getModel('oBpSearchResult').setData(null);
                }.bind(this)
            };

            return oParameters;
        };


        Controller.prototype._searchBP = function (sPath, oParameters) {
            var oModel = this.getView().getModel('oSearchBpODataModel');
            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        //Controller.prototype.

        return Controller;
    }
);
