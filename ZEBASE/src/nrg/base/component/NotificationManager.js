/*global sap*/

sap.ui.define(
    [
        'sap/ui/base/Object',
        'sap/ui/core/message/ControlMessageProcessor',
        'sap/ui/core/message/Message'
    ],

    function (BaseObject, ControlMessageProcessor, Message) {
        'use strict';

        var Manager = BaseObject.extend('nrg.base.component.NotificationManager', {
            constructor: function (oComponent) {
                BaseObject.apply(this);

                this._oComponent = oComponent;
            },

            metadata: {
                publicMethods: [
                    'getHeaderMessageProcessor',
                    'addHeaderMessage'
                ]
            }
        });

        Manager.prototype.getHeaderMessageProcessor = function () {
            if (!this._oHeaderMessageProcessor) {
                this._oHeaderMessageProcessor = new ControlMessageProcessor();
            }

            return this._oHeaderMessageProcessor;
        };

        Manager.prototype.addHeaderMessage = function () {

        };

        return Manager;
    }
);
