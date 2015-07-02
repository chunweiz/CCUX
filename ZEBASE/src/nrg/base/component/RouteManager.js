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
            var oEventBus = sap.ui.getCore().getEventBus();
            oEventBus.subscribe(WebUiManager.EventBus.Subscribe.Channel, 'NAVIGATE', this._onWebUiEvent, this);
        };

        Manager.prototype._unsubscribeWebUi = function () {
            var oEventBus = sap.ui.getCore().getEventBus();
            oEventBus.unsubscribe(WebUiManager.EventBus.Subscribe.Channel, 'NAVIGATE', this._onWebUiEvent, this);
        };

        Manager.prototype._onWebUiEvent = function (sChannelId, sEventId, oData) {
            var oRouter, sRouteName, oRouteParams;

            if (!oData || !oData.ROUTE) {
                return;
            }

            sRouteName = oData.ROUTE;
            oRouteParams = oData.PARAMS || null;

            oRouter = this._oComponent.getRouter();
            oRouter.navTo(sRouteName, oRouteParams, false);
        };

        Manager.prototype._registerRouteCallback = function () {
            var oRoute, sRouteName;

            oRoute = this._oComponent.getMetadata().getRoutes();
            for (sRouteName in oRoute) {
                if (oRoute.hasOwnProperty(sRouteName)) {
                    oRoute[sRouteName].callback = this._onRouteCallback.bind(this);
                }
            }
        };

        Manager.prototype._onRouteCallback = function (route, args, config, targetControl, view) {
            jQuery.sap.log.info('Navigating to route ' + route);
        };

        Manager.prototype.destroy = function () {
            this._unsubscribeWebUi();
            BaseObject.prototype.destroy.apply(this, arguments);
        };

        return Manager;
    }
);
