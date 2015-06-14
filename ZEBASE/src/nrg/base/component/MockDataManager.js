/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/base/Object',
        'sap/ui/core/util/MockServer',
        'sap/ui/model/odata/v2/ODataModel'
    ],

    function (jQuery, Object, MockServer, ODataModel) {
        'use strict';

        var Manager = Object.extend('nrg.base.component.MockDataManager', {
            constructor: function (oComponent) {
                Object.apply(this);

                this._oComponent = oComponent;
            },

            metadata: {
                publicMethods: [
                    'startMockServers',
                    'stopMockServers',
                    'addMockODataModels'
                ]
            }
        });

        Manager.prototype.startMockServers = function () {
            var oModule, sModule, sMock, oMock, sMockPath, oMockServer;

            this._aMockServers = [];
            if (jQuery.sap.getUriParameters().get('nrg-mock') !== 'true') {
                return;
            }

            oModule = this._getModuleMetadata();

            for (sModule in oModule) {
                if (oModule.hasOwnProperty(sModule)) {
                    for (sMock in oModule[sModule].odata.mock) {
                        if (oModule[sModule].odata.mock.hasOwnProperty(sMock)) {
                            oMock = oModule[sModule].odata.mock;
                            sMockPath = this._getModuleMockDataPath(sModule, oMock[sMock].mockDataBaseUrl);
                            oMockServer = this._startModuleMockServer(sMock, oMock, sMockPath);

                            this._aMockServers.push({
                                sMock: sMock,
                                oMockServer: oMockServer
                            });
                        }
                    }
                }
            }
        };

        Manager.prototype.stopMockServers = function () {
            this._aMockServers.forEach(function (oMockServer) {
                oMockServer.stop();
            });
        };

        Manager.prototype.addMockODataModels = function () {
            this._aMockServers.forEach(function (oEntry) {
                var oModel;

                oModel = new ODataModel(oEntry.oMockServer.getRootUri(), true);
                this._oComponent.setModel(oModel, oEntry.sMock);

            }.bind(this));
        };

        Manager.prototype._getModuleMetadata = function () {
            var oConfig, oModule, sModule;

            oConfig = this._oComponent.getMetadata().getConfig() || {};
            oModule = oConfig.module || {};

            for (sModule in oModule) {
                if (oModule.hasOwnProperty(sModule)) {
                    oModule[sModule].odata = oModule[sModule].odata || {};
                    oModule[sModule].odata.mock = oModule[sModule].odata.mock || {};
                }
            }

            return oModule;
        };

        Manager.prototype._getModuleMockDataPath = function (sModule, sMockDataBaseUrl) {
            var sModulePath;

            sModulePath = jQuery.sap.getModulePath(sModule);

            return [ sModulePath, sMockDataBaseUrl ].join('/');
        };

        Manager.prototype._startModuleMockServer = function (sMock, oMock, sMockPath) {
            var oMockServer;

            oMockServer = new MockServer({
                rootUri: sMockPath
            });

            oMockServer.simulate(sMockPath + 'metadata.xml', {
                sMockdataBaseUrl: sMockPath,
                bGenerateMissingMockData: oMock[sMock].generateMissingMockData
            });

            oMockServer.start();

            return oMockServer;
        };

        return Manager;
    }
);
