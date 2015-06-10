/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/UIComponent',
        'nrg/base/component/ResourceBundleManager',
        'nrg/base/component/StylesheetManager',
        'nrg/base/component/IconManager'
    ],

    function (jQuery, Component, ResourceBundleManager, StylesheetManager, IconManager) {
        'use strict';

        var CustomComponent = Component.extend('nrg.component.ic.Component', {
            metadata: {
                manifest: 'json'
            }
        });

        CustomComponent.prototype.init = function () {
            Component.prototype.init.apply(this);

            this._initStylesheets();
            this._initResourceBundles();
            this._initIcons();
            this._initRouter();
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
