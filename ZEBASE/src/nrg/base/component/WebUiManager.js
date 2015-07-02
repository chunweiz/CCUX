/*global sap, window*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/base/Object'
    ],

    function (jQuery, BaseObject) {
        'use strict';

        var Manager = BaseObject.extend('nrg.base.component.WebUiManager', {
            constructor: function (oComponent) {
                BaseObject.apply(this);
                this._oComponent = oComponent;
            },

            metadata: {
                publicMethods: [
                    'start'
                ]
            }
        });

        /*
        ** Event bus channels
        */
        Manager.EventBus = {
            Publish: {
                Channel: 'nrg.webui.publish'
            },

            Subscribe: {
                Channel: 'nrg.webui.subscribe'
            }
        };

        Manager.prototype.start = function () {
            this._readEventMetadata();
            this._addDomEventListener();
            this._registerEventBus();
        };

        Manager.prototype._readEventMetadata = function () {
            var oConfig, oWebUi, sEventName;

            oConfig = this._oComponent.getMetadata().getConfig() || {};
            oWebUi = oConfig.webUi || {};
            oWebUi.events = oWebUi.events || {};
            oWebUi.events.publish = oWebUi.events.publish || {};
            oWebUi.events.subscribe = oWebUi.events.subscribe || {};

            this._aPublishEvent = [];
            for (sEventName in oWebUi.events.publish) {
                if (oWebUi.events.publish.hasOwnProperty(sEventName)) {
                    this._aPublishEvent.push(sEventName);
                }
            }

            this._aSubscribeEvent = [];
            for (sEventName in oWebUi.events.subscribe) {
                if (oWebUi.events.subscribe.hasOwnProperty(sEventName)) {
                    this._aSubscribeEvent.push(sEventName);
                }
            }
        };

        Manager.prototype._addDomEventListener = function () {
            if (window.addEventListener) {
                window.addEventListener('message', jQuery.proxy(this._fromWebUi, this), false);
            } else {
                window.attachEvent('onmessage', jQuery.proxy(this._fromWebUi, this));
            }
        };

        Manager.prototype._registerEventBus = function () {
            var oEventBus = sap.ui.getCore().getEventBus();

            this._aPublishEvent.forEach(function (sEvent) {
                oEventBus.subscribe(Manager.EventBus.Publish.Channel, sEvent, this._onEventBusSubscribed, this);
            }.bind(this));
        };

        Manager.prototype._deregisterEventBus = function () {
            var oEventBus = sap.ui.getCore().getEventBus();

            this._aPublishEvent.forEach(function (sEvent) {
                oEventBus.unsubscribe(Manager.EventBus.Publish.Channel, sEvent, this._onEventBusSubscribed, this);
            }.bind(this));
        };

        Manager.prototype._onEventBusSubscribed = function (sChannel, sEvent, oData) {
            this._notifyWebUi(sEvent, oData);
        };

        Manager.prototype._notifyWebUi = function (sEvent, oPayload) {
            var sMessage;

            if (window.parent === window) {
                jQuery.sap.log.warning('Unable to post message because this component is not embedded in any parent window');
                return this;
            }

            sMessage = JSON.stringify({
                event: sEvent,
                payload: oPayload
            });

            jQuery.sap.log.info('[WebUiManager]: _notifyWebUi - message: ' + sMessage);

            window.parent.postMessage(sMessage, this._getDomain());

            return this;
        };

        Manager.prototype._fromWebUi = function (oEvent) {
            var oData, oEventBus;

            jQuery.sap.log.info('[WebUiManager]: _fromWebUi - message: ' + oEvent.data);

            if (oEvent.origin !== this._getDomain()) {
                return;
            }

            oData = JSON.parse(event.data);
            if (!oData || !oData.event || this._aSubscribeEvent.indexOf(oData.event) === -1) {
                return;
            }

            oEventBus = sap.ui.getCore().getEventBus();
            oEventBus.publish(Manager.EventBus.Subscribe.Channel, oData.event, oData.payload);
        };

        Manager.prototype._getDomain = function () {
            return window.location.protocol + '//' + window.location.host;
        };

        Manager.prototype.destroy = function () {
            this._deregisterEventBus();
            BaseObject.prototype.destroy.apply(this, arguments);
        };

        return Manager;
    }
);
