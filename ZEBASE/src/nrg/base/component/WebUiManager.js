/*global sap, window*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/base/Object',
        'sap/ui/base/EventProvider'
    ],

    function (jQuery, BaseObject, EventProvider) {
        'use strict';

        var Manager = EventProvider.extend('nrg.base.component.WebUiManager', {
            constructor: function (oComponent) {
                EventProvider.apply(this);
                this._oComponent = oComponent;
            },

            metadata: {
                publicMethods: [
                    'start',
                    'notifyWebUi'
                ]
            }
        });

        Manager.prototype.start = function () {
            this._addDomEventListener();
        };

        Manager.prototype.notifyWebUi = function (sEvent, oPayload, fnCallback, oListener) {
            var sMessage, oData;

            if (window.parent === window) {
                jQuery.sap.log.error('[WebUiManager.notifyWebUi()]', 'Unable to post message because this component is not embedded in any parent window');
                return this;
            }

            if (!sEvent) {
                jQuery.sap.log.error('[WebUiManager.notifyWebUi()]', 'Event name is not provided');
                return this;
            }

            oData = {};
            oData.event = sEvent;
            oData.payload = oPayload;

            if (fnCallback) {
                oData.sid = this._getUniqueId();
                this.attachEventOnce([ oData.event, oData.sid ].join('-'), fnCallback, oListener);
            }

            sMessage = JSON.stringify(oData);

            jQuery.sap.log.info('[WebUiManager.notifyWebUi()]', sMessage);
            window.parent.postMessage(sMessage, this._getDomain());

            return this;
        };

        Manager.prototype._fromWebUi = function (oEvent) {
            var oData;

            if (oEvent.origin !== this._getDomain()) {
                return;
            }

            oData = JSON.parse(oEvent.data);
            if (!oData || !oData.event) {
                return;
            }

            jQuery.sap.log.info('[WebUiManager._fromWebUi()]', oEvent.data);

            if (oData.sid) {
                this.fireEvent([ oData.event, oData.sid ].join('-'), oData.payload);
            } else {
                this.fireEvent(oData.event, oData.payload);
            }
        };

        Manager.prototype._getDomain = function () {
            return window.location.protocol + '//' + window.location.host;
        };

        Manager.prototype._addDomEventListener = function () {
            if (window.addEventListener) {
                window.addEventListener('message', jQuery.proxy(this._fromWebUi, this), false);
            } else {
                window.attachEvent('onmessage', jQuery.proxy(this._fromWebUi, this));
            }
        };

        Manager.prototype._getUniqueId = function () {
            var sId = +new Date();

            return sId.toString();
        };

        return Manager;
    }
);
