/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/UIComponent',
        'nrg/base/component/ResourceBundleManager',
        'nrg/base/component/StylesheetManager',
        'nrg/base/component/IconManager',
        'nrg/base/component/MockDataManager',
        'nrg/base/component/RealDataManager',
        'nrg/base/component/WebUiManager'
    ],

    function (jQuery, Component, ResourceBundleManager, StylesheetManager, IconManager, MockDataManager, RealDataManager, WebUiManager) {
        'use strict';

        var CustomComponent = Component.extend('nrg.component.ic.Component', {
            metadata: {
                manifest: 'json'
            }
        });

        CustomComponent.prototype.init = function () {
            Component.prototype.init.apply(this);

            this._initWebUiConnection();
            this._initStylesheets();
            this._initResourceBundles();
            this._initIcons();
            this._initRealData();
            this._initMockData();
            this._initRouter();
        };

        CustomComponent.prototype.destroy = function () {
            this._oMockDataManager.stopMockServers();

            if (this._oWebUiManager) {
                this._oWebUiManager.destroy();
                this._oWebUiManager = null;
            }

            if (this._oResourceBundleManager) {
                this._oResourceBundleManager.destroy();
                this._oResourceBundleManager = null;
            }

            if (this._oStylesheetManager) {
                this._oStylesheetManager.destroy();
                this._oStylesheetManager = null;
            }

            if (this._oIconManager) {
                this._oIconManager.destroy();
                this._oIconManager = null;
            }

            if (this._oMockDataManager) {
                this._oMockDataManager.destroy();
                this._oMockDataManager = null;
            }

            if (this._oRealDataManager) {
                this._oRealDataManager.destroy();
                this._oRealDataManager = null;
            }

            Component.prototype.destory.apply(this, arguments);
        };

        CustomComponent.prototype.getWebUiManager = function () {
            return this._oWebUiManager;
        };

        CustomComponent.prototype._initWebUiConnection = function () {
            this._oWebUiManager = new WebUiManager(this);
            this._oWebUiManager.start();
        };

        CustomComponent.prototype._initResourceBundles = function () {
            this._oResourceBundleManager = new ResourceBundleManager(this);
            this._oResourceBundleManager.addResourceModels();
        };

        CustomComponent.prototype._initStylesheets = function () {
            this._oStylesheetManager = new StylesheetManager(this);
            this._oStylesheetManager.addStylesheets();
        };

        CustomComponent.prototype._initIcons = function () {
            this._oIconManager = new IconManager(this);
            this._oIconManager.addIcons();
        };

        CustomComponent.prototype._initMockData = function () {
            this._oMockDataManager = new MockDataManager(this);
            this._oMockDataManager.startMockServers();
            this._oMockDataManager.addMockODataModels();
        };

        CustomComponent.prototype._initRealData = function () {
            this._oRealDataManager = new RealDataManager(this);
            this._oRealDataManager.addODataModels();
        };

        CustomComponent.prototype._initRouter = function () {
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

        CustomComponent.prototype._routeCallback = function (route, args, config, targetControl, view) {

        };

        return CustomComponent;
    }
);
