/*globals sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'jquery.sap.global',
        "sap/ui/model/json/JSONModel"
    ],

    function (CoreController, Filter, FilterOperator, jQuery, JSONModel) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.billing.view.Elig');

        Controller.prototype.onInit = function () {

        };
        
        Controller.prototype.onBeforeRendering = function () {

        };

        Controller.prototype.onAfterRendering = function () {
            // Get the OwenerComponent from the mother controller
            this._OwnerComponent = this.getView().getParent().getParent().getParent().getController().getOwnerComponent();

            // Get the ABP popup control
            this._ABPPopupControl = this.getView().getParent();

            // Set up global variables
            this._aYearList = [];
            this._aGraphClors = ['blue', 'gray', 'yellow'];

            // Set up models
            this.getView().setModel(this._OwnerComponent.getModel('comp-billing-avgplan'), 'oDataAvgSvc');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oEligibility');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oUsageGraph');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oAmountBtn');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oAmountHistory');

            // Retrieve routing parameters
            var oRouteInfo = this._OwnerComponent.getCcuxRouteManager().getCurrentRouteInfo();

            this._bpNum = oRouteInfo.parameters.bpNum;
            this._caNum = oRouteInfo.parameters.caNum;
            this._coNum = oRouteInfo.parameters.coNum;

            this._initialCheck();
        };

        /*------------------------------------------------ Retrieve Methods -------------------------------------------------*/

        

        /*-------------------------------------------------- Initial Check --------------------------------------------------*/

        Controller.prototype._initialCheck = function () {
            
        };

        /*------------------------------------------------- Button Actions --------------------------------------------------*/

        

        Controller.prototype._pad = function (d) {
            return (d < 10) ? '0' + d.toString() : d.toString();
        };

        Controller.prototype.onPopupClose = function (oEvent) {
            this.getView().getParent().close();
        };

        return Controller;
    }
);
