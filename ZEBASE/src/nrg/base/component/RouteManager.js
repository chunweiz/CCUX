/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/base/Object',
        'nrg/base/component/WebUiManager'
    ],

    function (jQuery, BaseObject, WebUiManager) {
        'use strict';

        var Manager = BaseObject.extend('nrg.base.component.RouteManager', {
            constructor: function (oComponent) {
                BaseObject.apply(this);
                this._oComponent = oComponent;
            },

            metadata: {
                publicMethods: [
                    'init'
                ]
            }
        });

        Manager.prototype.init = function () {
            this._registerRouteCallback();
            this._oComponent.getRouter().initialize();
            this._subscribeWebUi();
        };

        Manager.prototype._subscribeWebUi = function () {
            var oWebUiManager = this._oComponent.getCcuxWebUiManager();
            oWebUiManager.attachEvent('navigate', this._onWebUiNavigate, this);
        };

        Manager.prototype._unsubscribeWebUi = function () {
            var oWebUiManager = this._oComponent.getCcuxWebUiManager();
            oWebUiManager.detachEvent('navigate', this._onWebUiNavigate, this);
        };

        Manager.prototype._onWebUiNavigate = function (oEvent) {
            var oData, oRouter, sRouteName, oRouteParams;

            oData = oEvent.getParameters();
            if (!oData || !oData.route) {
                return;
            }

            sRouteName = oData.route;
            oRouteParams = oData.params || null;

            oRouter = this._oComponent.getRouter();
            jQuery.sap.log.info('[RouteManager._onWebUiNavigate()]', 'Navigating to ' + sRouteName);
            oRouter.navTo(sRouteName, oRouteParams, false);
        };

        Manager.prototype._registerRouteCallback = function () {
            var oRouter = this._oComponent.getRouter();
            oRouter.attachRouteMatched(this._onRouteMatched, this);
        };

        Manager.prototype._onRouteMatched = function (oEvent) {
            var oRoute, oApp, oWebUiManager;

            oRoute = oEvent.getParameters();

            oApp = this._oComponent.getCcuxApp();
            if (oApp) {
                oApp.reset();
            }

            oWebUiManager = this._oComponent.getCcuxWebUiManager();
            if (oWebUiManager) {
                oWebUiManager.notifyWebUi('resetTimeOut');
            }
        };

        Manager.prototype.destroy = function () {
            this._unsubscribeWebUi();
            BaseObject.prototype.destroy.apply(this, arguments);
        };

        return Manager;
    }
);
