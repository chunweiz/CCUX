/*globals sap*/
/*globals ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator'
    ],

    function (CoreController, Filter, FilterOperator) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.dashboard.view.Tools');

        /**********************************************************************************************************************/
        //On Start
        /**********************************************************************************************************************/
        Controller.prototype.onInit = function () {
        };

        Controller.prototype.onBeforeRendering = function () {
            var oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo();

            this._bpNum = oRouteInfo.parameters.bpNum;
            this._caNum = oRouteInfo.parameters.caNum;
            this._coNum = oRouteInfo.parameters.coNum;

            this.getView().setModel(this.getOwnerComponent().getModel('comp-dashboard-svcodr'), 'oODataSvc');

            //Model to keep Reconnect info and status
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oReconnectInfo');


        };

        /**********************************************************************************************************************/
        //Formatter
        /**********************************************************************************************************************/
        Controller.prototype._formatRightRdBtnSelected = function (cIndicator) {
            if (cIndicator === 'X' || cIndicator === 'x') {
                return true;
            }
            else {
                return false;
            }
        };

        Controller.prototype._formatLeftRdBtnSelected = function (cIndicator) {
            if (cIndicator === 'X' || cIndicator === 'x') {
                return false;
            }
            else {
                return true;
            }
        };



        /**********************************************************************************************************************/
        //Handlers
        /**********************************************************************************************************************/
        Controller.prototype._onReconnectionClick = function () {
            if (!this._oReconnectPopup) {
                this._oReconnectPopup = ute.ui.main.Popup.create({
				    content: sap.ui.xmlfragment(this.getView().sId, "nrg.module.dashboard.view.Reconnect", this),
					title: 'RECONNETION'
				});
                this._oReconnectPopup.addStyleClass('nrgDashboard-reconnectionPopup');
				this.getView().addDependent(this._oReconnectPopup);
            }
            this._oReconnectPopup.open();
            this._retrReconnectInfo();

        };

        Controller.prototype._onReconnectClicked = function () {

        };

        Controller.prototype._onReconnectCancelClicked = function () {
            this._oReconnectPopup.close();
        };


        /**********************************************************************************************************************/
        //Request Functions
        /**********************************************************************************************************************/
        Controller.prototype._retrReconnectInfo = function () {
            var sPath,
                aFilters = [],
                oParameters,
                oModel = this.getView().getModel('oODataSvc');


            aFilters.push(new Filter({ path: 'PartnerID', operator: FilterOperator.EQ, value1: this._bpNum}));
            aFilters.push(new Filter({ path: 'BuagID', operator: FilterOperator.EQ, value1: this._caNum}));

            sPath = '/Reconnects';

            oParameters = {
                filters: aFilters,
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oReconnectInfo').setData(oData);
                    }
                }.bind(this),
                error: function (oError) {
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        return Controller;
    }
);
