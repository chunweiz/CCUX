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
            var oParent = window.parent;

            if (!oParent || oParent === window) {
                jQuery.sap.log.warn('This component is not embedded in any window');
                return this;
            }



            return this;
        };

        Manager.prototype._fromWebUi = function (oEvent) {

        };

        return Manager;
    }
);
