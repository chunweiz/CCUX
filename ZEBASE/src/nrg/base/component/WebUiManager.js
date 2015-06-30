/*global sap, window*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/base/Object'
    ],

    function (jQuery, Object) {
        'use strict';

        var Manager = Object.extend('nrg.base.component.WebUiManager', {
            constructor: function (oComponent) {
                Object.apply(this);
                this._oComponent = oComponent;
            },

            metadata: {
                publicMethods: [
                    'start',
                    'postMessage'
                ]
            }
        });

        Manager.prototype.start = function () {
            if (window.addEventListener) {
                window.addEventListener('message', jQuery.proxy(this._fromWebUi, this), false);
            } else {
                window.attachEvent('onmessage', jQuery.proxy(this._fromWebUi, this));
            }
        };

        Manager.prototype.postMessage = function (sEvent, oData) {
            var oParent, sMessage;

            oParent = window.parent;
            if (!oParent || oParent === window) {
                jQuery.sap.log.warn('Unable to post message because this component is not embedded in any parent window');
                return this;
            }

            sMessage = JSON.stringify({
                event: sEvent,
                payload: oData
            });

            oParent.postMessage(sMessage, this._getDomain());

            return this;
        };

        Manager.prototype._fromWebUi = function (oEvent) {

        };

        Manager.prototype._getDomain = function () {
            return window.location.protocol + '//' + window.location.host;
        };

        return Manager;
    }
);
