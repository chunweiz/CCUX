/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/util/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator'
    ],

    function (CoreController, Filter, FilterOperator) {
        'use strict';

        var Controller = CoreController.extend('nrg.view.dashboard.CallerNoIDSearch');

        Controller.prototype.onInit = function () {

            /*Models in the controller*/

            //get OData Model from component level first
            this.getView().setModel(this.getOwnerComponent().getModel('comp-dashboard'), 'oSearchBpODataModel');
            //JSON model for search result
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oBpSearchResult');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oSearchFilters');

            this._initSearchFilterModel();
        };

        Controller.prototype._initSearchFilterModel = function () {
            var oFilters = {
                sCaNum : null,
                sSsn : null,
                sDl : null,
                sOrgName : null,
                sBpNum : null,
                sFiName : null,
                sEsid : null,
                sLaName : null
            };

            this.getView().getModel('oSearchFilters').setProperty('/searchTextFields', oFilters);
        };

        Controller.prototype.onTextFieldChange = function (oControlEvent) {
            //Create for future use
        };

        Controller.prototype.onSearch = function () {
            this._searchBP('/BpSearchs', this._createSearchParameters());
        };

        Controller.prototype._createSearchFilterObject = function () {
            var aFilters = [],
                oFilterTemplate = new Filter(),
                oFilterModel = this.getView().getModel('oSearchFilters');

            if (oFilterModel.getProperty('/searchTextFields/sCaNum')) {
                oFilterTemplate.sPath = 'PartnerID';
                oFilterTemplate.sOperator = FilterOperator.EQ;
                oFilterTemplate.oValue1 = oFilterModel.getProperty('/searchTextFields/sCaNum');
                aFilters.push(oFilterTemplate);
            }
            if (oFilterModel.getProperty('/searchTextFields/sSsn')) {
                oFilterTemplate.sPath = 'SSN';
                oFilterTemplate.sOperator = FilterOperator.EQ;
                oFilterTemplate.oValue1 = oFilterModel.getProperty('/searchTextFields/sSsn');
                aFilters.push(oFilterTemplate);
            }
            if (oFilterModel.getProperty('/searchTextFields/sDl')) {
                oFilterTemplate.sPath = 'DL';
                oFilterTemplate.sOperator = FilterOperator.EQ;
                oFilterTemplate.oValue1 = oFilterModel.getProperty('/searchTextFields/sDl');
                aFilters.push(oFilterTemplate);
            }
            if (oFilterModel.getProperty('/searchTextFields/sOrgName')) {
                oFilterTemplate.sPath = 'OrgName';
                oFilterTemplate.sOperator = FilterOperator.EQ;
                oFilterTemplate.oValue1 = oFilterModel.getProperty('/searchTextFields/sOrgName');
                aFilters.push(oFilterTemplate);
            }
            if (oFilterModel.getProperty('/searchTextFields/sBpNum')) {
                oFilterTemplate.sPath = 'BuagID';
                oFilterTemplate.sOperator = FilterOperator.EQ;
                oFilterTemplate.oValue1 = oFilterModel.getProperty('/searchTextFields/sBpNum');
                aFilters.push(oFilterTemplate);
            }
            if (oFilterModel.getProperty('/searchTextFields/sFiName')) {
                oFilterTemplate.sPath = 'FirstName';
                oFilterTemplate.sOperator = FilterOperator.EQ;
                oFilterTemplate.oValue1 = oFilterModel.getProperty('/searchTextFields/sFiName');
                aFilters.push(oFilterTemplate);
            }
            if (oFilterModel.getProperty('/searchTextFields/sEsid')) {
                oFilterTemplate.sPath = 'ESID';
                oFilterTemplate.sOperator = FilterOperator.EQ;
                oFilterTemplate.oValue1 = oFilterModel.getProperty('/searchTextFields/sEsid');
                aFilters.push(oFilterTemplate);
            }
            if (oFilterModel.getProperty('/searchTextFields/sLaName')) {
                oFilterTemplate.sPath = 'LastName';
                oFilterTemplate.sOperator = FilterOperator.EQ;
                oFilterTemplate.oValue1 = oFilterModel.getProperty('/searchTextFields/sLaName');
                aFilters.push(oFilterTemplate);
            }


            return aFilters;
        };

        Controller.prototype._createSearchParameters = function () {
            //var oFilter, aFilter, oParameters,
              //  oFilterModel = this.getView().getModel('oSearchFilters');

            var aFilters = this._createSearchFilterObject(),
                oParameters;



            /*This need to be re-written
            oFilter = new Filter("PartnerID", FilterOperator.EQ, "1121");
            aFilter = [];
            aFilter.push(oFilter);*/

            oParameters = {
                filters : aFilters,
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
