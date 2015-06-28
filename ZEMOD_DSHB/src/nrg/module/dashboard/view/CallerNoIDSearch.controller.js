/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'sap/ui/core/routing/HashChanger'
    ],

    function (CoreController, Filter, FilterOperator, HashChanger) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.dashboard.view.CallerNoIDSearch');

        Controller.prototype.onInit = function () {
            //var test = new HashChanger();
            //var testagian= test.getHash();

            /*Models in the controller*/

            //get OData Model from component level first
            this.getView().setModel(this.getOwnerComponent().getModel('comp-dashboard'), 'oSearchBpODataModel');
            //JSON model for search result
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oBpSearchResult');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oBpSearchCount');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oSearchFilters');

            this._initSearchFilterModel();
            this._initSearchResultModel();
        };

        Controller.prototype._initSearchResultModel = function () {
            //Set search result number = 0 first.
            this.getView().getModel('oBpSearchCount').setProperty('/searchCount', 0);
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
                sLaName : null,
                sPhnNum : null,
                sHousNum : null,
                sStreetNum: null,
                sUnitNum: null,
                sCityNum: null,
                sStateNum: null,
                sZipNum: null
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
            //var test = this.getView().byId('idSearchBp');


            var aFilters = [],
                oFilterTemplate = new Filter(),
                oFilterModel = this.getView().getModel('oSearchFilters');


            if (oFilterModel.getProperty('/searchTextFields/sHousNum')) {
                oFilterTemplate.sPath = 'HouseNumber';
                oFilterTemplate.sOperator = FilterOperator.EQ;
                oFilterTemplate.oValue1 = oFilterModel.getProperty('/searchTextFields/sHousNum');
                aFilters.push(oFilterTemplate);
            }
            if (oFilterModel.getProperty('/searchTextFields/sStreetNum')) {
                oFilterTemplate.sPath = 'Street';
                oFilterTemplate.sOperator = FilterOperator.EQ;
                oFilterTemplate.oValue1 = oFilterModel.getProperty('/searchTextFields/sStreetNum');
                aFilters.push(oFilterTemplate);
            }
            if (oFilterModel.getProperty('/searchTextFields/sUnitNum')) {
                oFilterTemplate.sPath = 'UnitNumber';
                oFilterTemplate.sOperator = FilterOperator.EQ;
                oFilterTemplate.oValue1 = oFilterModel.getProperty('/searchTextFields/sUnitNum');
                aFilters.push(oFilterTemplate);
            }
            if (oFilterModel.getProperty('/searchTextFields/sCityNum')) {
                oFilterTemplate.sPath = 'City';
                oFilterTemplate.sOperator = FilterOperator.EQ;
                oFilterTemplate.oValue1 = oFilterModel.getProperty('/searchTextFields/sCityNum');
                aFilters.push(oFilterTemplate);
            }
            if (oFilterModel.getProperty('/searchTextFields/sStateNum')) {
                oFilterTemplate.sPath = 'State';
                oFilterTemplate.sOperator = FilterOperator.EQ;
                oFilterTemplate.oValue1 = oFilterModel.getProperty('/searchTextFields/sStateNum');
                aFilters.push(oFilterTemplate);
            }
            if (oFilterModel.getProperty('/searchTextFields/sZipNum')) {
                oFilterTemplate.sPath = 'ZipCode';
                oFilterTemplate.sOperator = FilterOperator.EQ;
                oFilterTemplate.oValue1 = oFilterModel.getProperty('/searchTextFields/sZipNum');
                aFilters.push(oFilterTemplate);
            }
            if (oFilterModel.getProperty('/searchTextFields/sPhnNum')) {
                oFilterTemplate.sPath = 'DayPhone';
                oFilterTemplate.sOperator = FilterOperator.EQ;
                oFilterTemplate.oValue1 = oFilterModel.getProperty('/searchTextFields/sPhnNum');
                aFilters.push(oFilterTemplate);
            }
            if (oFilterModel.getProperty('/searchTextFields/sCaNum')) {
                oFilterTemplate.sPath = 'BuagID';
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
                oFilterTemplate.sPath = 'PartnerID';
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
                oParameters,
                i;



            /*This need to be re-written
            oFilter = new Filter("PartnerID", FilterOperator.EQ, "1121");
            aFilter = [];
            aFilter.push(oFilter);*/

            oParameters = {
                filters : aFilters,
                success : function (oData) {
                    if (oData.results) {
                        for (i = 0; i < oData.results.length; i = i + 1) {
                            oData.results[i].iId = i + 1;
                            oData.results[i].Select = "Select";
                        }
                        this.getView().getModel('oBpSearchResult').setData(oData.results);
                        this.getView().getModel('oBpSearchCount').setProperty('/searchCount', oData.results.length);
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

        Controller.prototype._onBpSelect = function (oEvent) {
            var sSelectedId = oEvent.getParameters().id,
                aSelectedId = sSelectedId.split('-'),
                iSelectedId = aSelectedId[2],
                sSelectedBpNum = this.getView().getModel('oBpSearchResult').oData[iSelectedId].PartnerID,
                oRouter = this.getOwnerComponent().getRouter();

            oRouter.navTo('dashboard.Bp', {bpNum: sSelectedBpNum});

            return;
        };

        return Controller;
    }
);
