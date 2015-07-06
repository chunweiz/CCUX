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
            oEventBus.subscribe(WebUiManager.EventBus.Subscribe.Channel, 'navigate', this._onWebUiEvent, this);
        };

        Manager.prototype._unsubscribeWebUi = function () {
            var oEventBus = sap.ui.getCore().getEventBus();
            oEventBus.unsubscribe(WebUiManager.EventBus.Subscribe.Channel, 'navigate', this._onWebUiEvent, this);
        };

        Manager.prototype._onWebUiEvent = function (sChannelId, sEventId, oData) {
            var oRouter, sRouteName, oRouteParams;

            if (!oData || !oData.route) {
                return;
            }

            sRouteName = oData.route;
            oRouteParams = oData.params || null;

            oRouter = this._oComponent.getRouter();
            oRouter.navTo(sRouteName, oRouteParams, false);
        };

        Manager.prototype._registerRouteCallback = function () {
            var oRouter = this._oComponent.getRouter();
            oRouter.attachRouteMatched(this._onRouteMatched, this);
        };

        Manager.prototype._onRouteMatched = function (oEvent) {
            var oRoute = oEvent.getParameters();

            //TODO: Intercept routing
        };

        Manager.prototype.destroy = function () {
            this._unsubscribeWebUi();
            BaseObject.prototype.destroy.apply(this, arguments);
        };

        return Manager;
    }
);
