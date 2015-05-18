/*globals sap, jQuery*/
/*jslint nomen: true*/

sap.ui.define(
    [
        'sap/ui/core/UIComponent',
        'nrg/util/Icon',
        'sap/ui/core/util/MockServer',
        'sap/ui/model/odata/v2/ODataModel',
        'sap/ui/core/Popup'
    ],

    function (Component, IconUtil, MockServer, ODataModel, Popup) {
        'use strict';

        var NRGComponent = Component.extend('nrg.component.ic.Component', {
            metadata: {
                manifest: 'json'
            }
        });

        NRGComponent.prototype.init = function () {
            Component.prototype.init.apply(this);
            this._initIcons();
            this._initPopup();

            if (this.getComponentData().config.mock) {
                this._initMockServers();
            }

            this._initModels();
            this._initRouter();
        };

        NRGComponent.prototype.destroy = function () {
            this._destroyMockServers();

            Component.prototype.destory.apply(this, arguments);
        };

        NRGComponent.prototype._initIcons = function () {
            IconUtil.load();
        };

        NRGComponent.prototype._initPopup = function () {
            // Set the initial Z-index to 100.
            // Internally, UI5 is doing an increment of 10 for each call.
            // TODO: in 1.30, it is possible to call method setInitialZIndex instead of looping.

            var iIdx;

            for (iIdx = 0; iIdx < 10; iIdx = iIdx + 1) {
                Popup.getNextZIndex();
            }
        };

        NRGComponent.prototype._initMockServers = function () {
            var mConfig, mMock, sKey, oMockServer, sRootPath, sRootUri;

            this._aMockServerRegistry = [];
            mConfig = this.getMetadata().getConfig();
            mMock = mConfig.mock || {};
            sRootPath = jQuery.sap.getModulePath('nrg');

            for (sKey in mMock) {
                if (mMock.hasOwnProperty(sKey)) {
                    //Create root URI
                    sRootUri = [sRootPath, mMock[sKey].mockDataBaseUrl].join('/');

                    //Create an instance of mock server based on module
                    oMockServer = new MockServer({
                        rootUri: sRootUri
                    });

                    //Configure mock server simulation
                    oMockServer.simulate(sRootUri + 'metadata.xml', {
                        sMockdataBaseUrl: sRootUri,
                        bGenerateMissingMockData: mMock[sKey].generateMissingMockData
                    });

                    //Start mock server
                    oMockServer.start();

                    //Add mock server to registry
                    this._aMockServerRegistry.push({
                        sKey: sKey,
                        oMockServer: oMockServer
                    });
                }
            }
        };

        NRGComponent.prototype._destroyMockServers = function () {
            //Stop all the mock servers
            this._aMockServerRegistry.forEach(function (oMockServer) {
                oMockServer.stop();
            });
        };

        NRGComponent.prototype._initModels = function () {
            var mConfig, oRootPath, oModel;

            mConfig = this.getMetadata().getConfig();
            oRootPath = jQuery.sap.getModulePath('nrg');

            //Set resource bundle
            oModel = new sap.ui.model.resource.ResourceModel({
                bundleUrl: [oRootPath, mConfig.resourceBundle].join('/')
            });
            this.setModel(oModel, 'comp-i18n');

            if (this._aMockServerRegistry) {
                this._aMockServerRegistry.forEach(function (oEntry) {
                    oModel = new ODataModel(oEntry.oMockServer.getRootUri(), true);
                    this.setModel(oModel, 'comp-' + oEntry.sKey);
                }.bind(this));
            }
        };

        NRGComponent.prototype._initRouter = function () {
            var oRoutes = this.getMetadata().getRoutes(),
                oRouter = this.getRouter(),
                sName;

            //Add a callback to each routes
            for (sName in oRoutes) {
                if (oRoutes.hasOwnProperty(sName)) {
                    oRoutes[sName].callback = this._routeCallback;
                }
            }

            oRouter.initialize();
        };

        NRGComponent.prototype._routeCallback = function (route, args, config, targetControl, view) {

        };

        return NRGComponent;
    },

    false
);
