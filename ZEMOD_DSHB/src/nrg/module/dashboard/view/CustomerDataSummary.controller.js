/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/core/routing/HashChanger'
    ],

    function (CoreController, HashChanger) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.dashboard.view.CustomerDataSummary');


        Controller.prototype._formatBadge = function (cIndicator) {
            /*if( cIndicator === 'x' || cIndicator === 'X'){
                return true;
            } else{
                return false;
            }*/

            /*Temp Code for Testing for mock server data*/
            if (cIndicator) {
                return true;
            } else {
                return false;
            }
        };

        Controller.prototype.onInit = function () {


            this.getView().setModel(this.getOwnerComponent().getModel('comp-dashboard'), 'oODataSvc');

            //Model to keep information to show
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oSmryBpInf');

            //Model to leep segmentation information
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oSmryBpSegInf');


            this._initRetrBpInf();
            this._initRetrBpSegInf();

        };

        Controller.prototype._initRetrBpInf = function () {
            var sPath, aSplitHash, iSplitHashL;

            aSplitHash = (this._retrUrlHash()).split('/');
            iSplitHashL = aSplitHash.length;
            sPath = '/BpSearchs' + '(\'' + aSplitHash[iSplitHashL - 1] + '\')/Partner';

            this._retrBpInf(sPath);
        };

        Controller.prototype._initRetrBpSegInf = function () {
            var sPath, aSplitHash, iSplitHashL;

            aSplitHash = (this._retrUrlHash()).split('/');
            iSplitHashL = aSplitHash.length;
            sPath = '/Partners' + '(\'' + aSplitHash[iSplitHashL - 1] + '\')/BpSegs';

            this._retrBpSegInf(sPath);
        };

        Controller.prototype._retrUrlHash = function () {
            //Get the hash to retrieve bp #
            var oHashChanger = new HashChanger(),
                sUrlHash = oHashChanger.getHash();

            return sUrlHash;
        };

        Controller.prototype._retrBpInf = function (sPath) {
            var oModel = this.getView().getModel('oODataSvc'),
                oParameters;

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oSmryBpInf').setData(oData);
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        Controller.prototype._retrBpSegInf = function (sPath) {
            var oModel = this.getView().getModel('oODataSvc'),
                oParameters;

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oSmryBpSegInf').setData(oData.results);
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        return Controller;
    }
);
