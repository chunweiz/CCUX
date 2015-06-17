/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/base/Object',
        'sap/ui/model/odata/v2/ODataModel'
    ],

    function (jQuery, Object, ODataModel) {
        'use strict';

        var Manager = Object.extend('nrg.base.component.RealDataManager', {
            constructor: function (oComponent) {
                Object.apply(this);

                this._oComponent = oComponent;
            },

            metadata: {
                publicMethods: [
                    'addODataModels'
                ]
            }
        });

        Manager.prototype.addODataModels = function () {
            var oConfig, oModule, sModule, oData, oDataReal;

            oConfig = this._oComponent.getMetadata().getConfig() || {};
            oModule = oConfig.module || {};

            for (sModule in oModule) {
                if (oModule.hasOwnProperty(sModule)) {
                    oData = oModule[sModule].odata || {};
                    oDataReal = oData.real || {};

                    if (oModule[sModule].odata) {
                        this._addModuleODataModels(oDataReal);
                    }
                }
            }
        };

        Manager.prototype._addModuleODataModels = function (oDataReal) {
            var sDataReal, oModel;

            for (sDataReal in oDataReal) {
                if (oDataReal.hasOwnProperty(sDataReal)) {
                    oModel = new ODataModel(oDataReal[sDataReal], true);
                    this._oComponent.setModel(oModel, sDataReal);
                }
            }
        };

        return Manager;
    }
);
