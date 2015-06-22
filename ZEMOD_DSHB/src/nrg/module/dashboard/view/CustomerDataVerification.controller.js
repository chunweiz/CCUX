/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/core/routing/HashChanger'
    ],

    function (CoreController, Filter, FilterOperator, HashChanger) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.dashboard.view.CustomerDataVerification');

        Controller.prototype.onInit = function () {
            this.getView().setModel(this.getOwnerComponent().getModel('comp-dashboard'), 'oODataSvc');

            //Model to hold BP info
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDtaVrfyBP');

            //Model to hold Buags (avoid too long of bindings
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDtaVrfyBuags');

            //Model to hold Contract
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDtaVrfyContracts');


            this._initDtaVrfRetr();

            //Get the hash to retrieve bp #
            /*var oHashChanger = new HashChanger(),
                sUrlHash = oHashChanger.getHash();*/

            /*var eventBus = sap.ui.getCore().getEventBus();

            eventBus.publish("channel1", "event1",
                {
                    listItem : columnListItem
                }
            );*/
        };

        Controller.prototype._initDtaVrfRetr = function () {
            var sPath, aSplitHash, iSplitHashL;

            aSplitHash = (this._retrUrlHash()).split('/');
            iSplitHashL = aSplitHash.length;
            sPath = '/Partners' + '(\'' + aSplitHash[iSplitHashL - 1] + '\')' + '?$expand=Buags,Contracts';

        };

        Controller.prototype._retrDataVrf = function (sPath) {
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
    }
);
