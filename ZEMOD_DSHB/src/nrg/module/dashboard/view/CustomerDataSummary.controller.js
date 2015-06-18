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

        Controller.prototype.onInit = function () {


            this.getView().setModel(this.getOwnerComponent().getModel('comp-dashboard'), 'oODataSvc');
            //Model to keep information to show
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oSmryBpInf');

            this._initRetrBpInf();

        };

        Controller.prototype._initRetrBpInf = function () {
            var sPath, aSplitHash, iSplitHashL;

            aSplitHash = (this._retrUrlHash()).split('/');
            iSplitHashL = aSplitHash.length;
            sPath = 'Buag(\'' + aSplitHash[iSplitHashL - 1] + '\')';

            this._retrBpInf(sPath);
        };

        Controller.prototype._retrUrlHash = function () {
            //Get the hash to retrieve bp #
            var oHashChanger = new HashChanger(),
                sUrlHash = oHashChanger.getHash();

            return sUrlHash;
        };

        Controller.prototype._retrBpInf = function (sPath) {
            var oModel = this.getView().getModel('oSearchBpODataModel'),
                oParameters;

            oParameters = {
                success : function (oData) {
                    if (oData.results) {
                        this.getView().getModel('oSmryBpInf').setData(oData.results);
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
